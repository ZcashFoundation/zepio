# Zcash Node Setup

The original `zcashd` daemon built by the Zcash Company, is built entirely in for Linux systems. If you're running a Linux distro, you should look [here](https://github.com/zcash/zcash) for instructions on how to install it.

For macOS users, please follow [this guide](https://github.com/kozyilmaz/zcash-apple) to build the binaries locally on your machine and then install it. After downloading the tarball and the hash, use the steps below to kickstart your node and connect it to the network.

## Installing

Download the attached files from Zcash Apple repository, verify the checksum of the archive and then extract its contents:

```bash
shasum -a 256 -c zcash-macos-v2.0.1a.tar.bz2.hash
tar -xvf zcash-macos-v2.0.1a.tar.bz2
```

## Running

When launching Zcash on macOS for the first time, certain initialization steps should be completed. Please run the commands below once for the first time

```
cd zcash-macos-v2.0.1a/usr/local/bin
./zcash-fetch-params
./zcash-init
```

You can just run Zcash by launching the daemon afterwards:

```
./zcashd
```

## Basic Commands

Along with `zcashd`, the daemon provides the `zcash-cli` utility which allows you to run RPC commands to your node, and receive the output data.

Some useful commands can be found below:

### General

> List information for a command
```bash
./zcash-cli help <command>
```

> List all shielded addresses
```bash
./zcash-cli z_listaddresses
```

> Create new shielded address
```bash
./zcash-cli z_getnewaddress
```

> Get total balance
```bash
./zcash-cli z_gettotalbalance
```

### Sending Funds
```bash
export ZADDR='zcNeXiyD3JkhKTrU38xM9C6HQGy9aP5qqVFH25qFzQGnmdwYZ2Dr53Jy7iRp64D4CzkMZdmKagN6mmtu3jVKHuZ8xZp8fw3'
export FRIEND='zcfZJW3qLHpSc7q7W1SXRGdVjgM6Q6kRwdkz1DHW5sP2EqcMHf5RCp3Frpf2qnb81j9K6upzRN4HoVxfboVwLTRaZ7bKn8b'
```

> Send from shielded address to shielded address (with memo and fee)
```bash
./zcash-cli z_sendmany "$ZADDR" "[{\"address\": \"$FRIEND\", \"amount\": 0.05, \"memo\": \"9876543210\"}]" 1 0.002
```

> Get send result
```bash
./zcash-cli z_getoperationresult [\"$OPID\"]
```

> List amounts received by shielded address
```bash
./zcash-cli z_listreceivedbyaddress "$ZADDR"
```

## Helpful Resources

* [Zcash Documentation (ReadTheDocs)](https://zcash.readthedocs.io/en/latest/rtd_pages/user_guide.html)
* [Zcash Apple Daemon](https://github.com/kozyilmaz/zcash-apple)
* [Zcash Community Forum](https://forum.zcashcommunity.com/)
* [Zcash Foundation](https://z.cash.foundation/)
* [Zcash Daemon](https://github.com/zcash/zcash)
* [Zcash Payment API Docs](https://github.com/zcash/zcash/blob/master/doc/payment-api.md)