const noble = require('noble');
const BeaconScanner = require('node-beacon-scanner');

const Beacon = use('App/Models/Beacon');
const Beaconlog = use('App/Models/Beaconlog');

var scanner = new BeaconScanner();

scanner.onadvertisement = async(beaconData) => {


    if (beaconData.beaconType === 'iBeacon') {

        console.log(beaconData);

        const prox = calculateAccuracy(-59, beaconData.rssi);
        if (prox.prox !== 'UNKNOW') {

            const beacon = await Beacon.find(beaconData.address);
            if (beacon) {

                beacon.beacon_mac = beaconData.address;
                beacon.beacon_uuid = beaconData.iBeacon.uuid;
                beacon.beacon_name = beaconData.localName;
                beacon.beacon_type = 'iBeacon';
                beacon.beacon_rssi = beaconData.rssi;
                beacon.beacon_prox = prox.prox;
                beacon.beacon_prox_mts = prox.prox_mts;
                beacon.beacon_prox_fts = prox.prox_fts;
                beacon.beacon_last_scan = new Date();
                beacon.beacon_payload = JSON.stringify(beaconData.iBeacon);

                beacon.save();

            } else {

                const beacon = new Beacon();
                beacon.beacon_mac = beaconData.address;
                beacon.beacon_uuid = beaconData.iBeacon.uuid;
                beacon.beacon_name = beaconData.localName;
                beacon.beacon_type = 'iBeacon';
                beacon.beacon_rssi = beaconData.rssi;
                beacon.beacon_prox = prox.prox;
                beacon.beacon_prox_mts = prox.prox_mts;
                beacon.beacon_prox_fts = prox.prox_fts;
                beacon.beacon_last_scan = new Date();
                beacon.beacon_payload = JSON.stringify(beaconData.iBeacon);

                beacon.save();

            }

            const beaconlog = new Beaconlog();
            beaconlog.beaconlog_mac = beaconData.address;
            beaconlog.beaconlog_date = new Date();
            beaconlog.beaconlog_rssi = beaconData.rssi;
            beaconlog.beaconlog_prox = prox.prox;
            beaconlog.beaconlog_prox_mts = prox.prox_mts;
            beaconlog.beaconlog_prox_fts = prox.prox_fts;
            beaconlog.beaconlog_payload = JSON.stringify(beaconData.iBeacon);
            beaconlog.save();

        }

    }

    function calculateAccuracy(txPower = -59, rssi) {

        var to_retun = {
            prox: 'UNKNOW',
            prox_mts: 0,
            prox_fts: 0
        }

        if (rssi === 0) {
            return to_retun; // if we cannot determine accuracy.
        }

        var ratio = rssi * 1 / txPower;
        if (ratio < 1.0) {
            to_retun.prox_fts = Math.pow(ratio, 10);
        } else {
            to_retun.prox_fts = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
        }
        to_retun.prox_mts = to_retun.prox_fts * 0.3048;
        to_retun.prox = mtsToProx(to_retun.prox_mts);

        return to_retun;
    }

    function getRange(txCalibratedPower = -59, rssi) {

        var to_retun = {
            prox: 'UNKNOW',
            prox_mts: 0,
            prox_fts: 0
        }

        var ratio_db = txCalibratedPower - rssi;
        var ratio_linear = Math.pow(10, ratio_db / 10);

        to_retun.prox_fts = Math.sqrt(ratio_linear);
        to_retun.prox_mts = to_retun.prox_fts * 0.3048;
        to_retun.prox = mtsToProx(to_retun.prox_mts);

        return to_retun;
    }

    function mtsToProx(prox_mts) {

        var to_return = 'Z';

        if (prox_mts >= 3) {
            to_return = 'C';
        } else {
            to_return = (prox_mts >= 1) ? 'B' : 'A';
        }

        return to_return;
    }

}

scanner.startScan().then(() => {
    console.log('Scanning has started....');
}).catch(error => {
    console.error(error);
});

setInterval(() => {
    console.log('Cada 3 segundos!!!!!!!!!!!!');
}, 3000);