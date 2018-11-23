# Zcash Node Setup

## Installation

Download the attached files, verify checksum of the archive and extract

```bash
shasum -a 256 -c zcash-macos-v2.0.1a.tar.bz2.hash
tar -xvf zcash-macos-v2.0.1a.tar.bz2
```

## How to use

When launching Zcash on MacOS for the first time, certain initialization steps should be completed.
Please run the commands below once for the first time

```
cd zcash-macos-v2.0.1a/usr/local/bin
./zcash-fetch-params
./zcash-init
./zcashd
```

You can just run Zcash by launching the daemon afterwards:

```
./zcashd
```

You can refer to NODE_COMMANDS for basic usage