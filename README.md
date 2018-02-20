Projekt v okviru Zimske šole FERI.

Ukazi za namestitev:

cd fabric-tools
./startFabric.sh
./createPeerAdminCard.sh

cd ..
composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName placilo-po-povzetju-network
composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile placilo-po-povzetju-network@0.0.1.bna --file networkadmin.card
composer card import --file networkadmin.card
composer network ping --card admin@placilo-po-povzetju-network

cd angular-app
npm start