@echo off

IF NOT EXIST %AppData%\Zcash (
    mkdir %AppData%\Zcash
)

IF NOT EXIST %AppData%\ZcashParams (
    mkdir %AppData%\ZcashParams
)

IF NOT EXIST %AppData%\Zcash\zcash.conf (
   (
    echo addnode=mainnet.z.cash 
    echo rpcuser=username 
    echo rpcpassword=password%random%%random%
    echo daemon=1 
    echo showmetrics=0 
    echo gen=0 
) > %AppData%\Zcash\zcash.conf
) 
