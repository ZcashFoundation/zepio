#!/bin/bash

# Setup
bold=$(tput bold)
normal=$(tput sgr0)

# Print the usage and exit
do_help() {
    echo "codesign.sh v0.1";
    echo "";
    echo "Sign release binaries with gpg keysigning"
    echo "";
    echo "Usage:"
    echo "Signing binaries:"
    echo "  Codesign a list of files"
    echo "  ${bold}codesign.sh file [file ...]${normal}"; 
    echo ""
    echo "Export Public Key:"
    echo "  Export the public key of the signing key"
    echo "  ${bold}codesign.sh --public${normal}"
    echo ""
    echo ""
    echo "Upload Public Key:"
    echo "  Upload the public key to public keyservers, so users can discover them."
    echo "  ${bold}codesign.sh --upload${normal} --key KEY_FINGERPRINT"
    exit 1; 
}

# Print the instructions for how to install dependencies
do_missing_command() {
    echo "Error: ${bold}$1${normal} was not installed"
    echo ""
    echo "One or more dependencies are missing. Please install all dependencies by running:"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "${bold}brew install gsha256sum gnupg${normal}"
    else
        echo "${bold}sudo apt install sha256sum gnupg${normal}"
    fi    
    exit 1;
}

# No input files were specified
do_missing_arguments() {
    echo "${bold}Error:${normal} No inputs files were specified"
    echo
    do_help
}

# Print error message for missing private key
do_missing_gpg_key() {
    echo "Error: Couldn't find a local private key to sign with."
    echo
    echo "The command ${bold}gpg -K${normal} didn't return any keys. Did you forget to install the private keys on this machine?"
    echo 
    echo "You can generate a new key by running ${bold}gpg --full-generate-key${normal}"
    echo "Note: If you password protect your key, you'll need to enter the password interactively while signing files."
    exit 1;
}

# Export the Public key in the ascii format
do_export_public_key() {
    # Check to see that we have a private key installed on this machine
    if [[ -z $(gpg -K) ]]; then
        do_missing_gpg_key
    fi

    gpg --armour --export
    exit 1;
}

# Upload the public key to public keyservers
do_upload_public_key() {
    # Check to see that we have a private key installed on this machine
    if [[ -z $(gpg -K) ]]; then
        do_missing_gpg_key
    fi

    # Check to see if the finger print argument was specified
    if [ -z $KEY_FINGERPRINT ]; then 
        echo "${bold}Error:${normal} no key was specified"
        echo ""
        echo "Upload keys with"
        echo "  codesign.sh --upload KEY_FINGERPRINT"
        echo
        echo "You can get the fingerprint of your keys by looking at the output of ${bold}gpg --check-sigs${normal}"
        echo "  The fingerprint is the first column in the lines begining with \"sig!\" or \"sig!3\""
        echo 
        exit 1;
    fi

    echo "Uploading Public Key to Public Servers"
    echo "This will take some time..."
    echo

    gpg --keyserver certserver.pgp.com --send-key $KEY_FINGERPRINT 
    gpg --keyserver pgp.mit.edu --send-key $KEY_FINGERPRINT 
    gpg --keyserver keyserver.ubuntu.com --send-key $KEY_FINGERPRINT 
    gpg --keyserver pool.sks-keyservers.net --send-key $KEY_FINGERPRINT 
    gpg --keyserver pgp.key-server.io --send-key $KEY_FINGERPRINT 
    gpg --keyserver keys.gnupg.net --send-key $KEY_FINGERPRINT 

    echo "All Done"
    exit 1;
}

# Accept the variables as command line arguments as well
POSITIONAL=()
while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        -h|--help)
            do_help
        ;;
        -p|--public)
            do_export_public_key
        ;;
        -u|--upload)
            KEY_FINGERPRINT="$2"
            do_upload_public_key
        ;;
        *)    # unknown option
            POSITIONAL+=("$1") # save it in an array for later
            shift # past argument
        ;;
    esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters


# Check for argument list, to make sure there are some files specified
if [ $# -eq 0 ]; then
    do_missing_arguments
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
    SHA256SUM=gsha256sum
else
    SHA256SUM=sha256sum
fi


# Check for existance of the gpg and sha256sum commands
hash $SHA256SUM 2>/dev/null || { 
    do_missing_command $SHA256SUM
    exit 1; 
}

hash gpg 2>/dev/null || { 
    do_missing_command gpg
    exit 1; 
}

hash zip 2>/dev/null || { 
    do_missing_command zip
    exit 1; 
}

# Check to see that we have a private key installed on this machine
if [[ -z $(gpg -K) ]]; then
    do_missing_gpg_key
fi

PackageContents=()

# Calculate the sha256sum for all input files
$SHA256SUM $@ > sha256sum.txt
PackageContents+=("sha256sum.txt")

# Sign all the files
for var in "$@"
do
    rm -f $var.sig
    echo "Signing" $var
    gpg --batch --output $var.sig --detach-sig $var
    PackageContents+=("$var.sig")
done

# Zip up everything into a neat package
ZipName=signatures.zip
echo "Zipping files into $ZipName"
rm -f $ZipName
zip $ZipName ${PackageContents[@]} 2>&1 >/dev/null

# Clean up intermediate files
rm ${PackageContents[@]}
exit 0
