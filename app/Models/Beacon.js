'use strict'

const Model = use('Model')

class Beacon extends Model {

    static get table() {
        return 'beacons'
    }

    static get primaryKey() {
        return 'beacon_mac'
    }

    static get incrementing() {
        return false
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    static get dates() {
        return super.dates.concat(['beacon_last_scan'])
    }

    // static calculateAccuracy(txPower = -59, rssi) {

    //     var to_retun = {
    //         prox: 'UNKNOW',
    //         prox_mts: 0,
    //         prox_fts: 0
    //     }

    //     if (rssi === 0) {
    //         return to_retun; // if we cannot determine accuracy.
    //     }

    //     var ratio = rssi * 1 / txPower;
    //     if (ratio < 1.0) {
    //         to_retun.prox_fts = Math.pow(ratio, 10);
    //     } else {
    //         to_retun.prox_fts = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
    //     }
    //     to_retun.prox_mts = to_retun.prox_fts * 0.3048;
    //     to_retun.prox = this.mtsToProx(to_retun.prox_mts);

    //     return to_retun;
    // }

    // static getRange(txCalibratedPower = -59, rssi) {

    //     var to_retun = {
    //         prox: 'UNKNOW',
    //         prox_mts: 0,
    //         prox_fts: 0
    //     }

    //     var ratio_db = txCalibratedPower - rssi;
    //     var ratio_linear = Math.pow(10, ratio_db / 10);

    //     to_retun.prox_fts = Math.sqrt(ratio_linear);
    //     to_retun.prox_mts = to_retun.prox_fts * 0.3048;
    //     to_retun.prox = this.mtsToProx(to_retun.prox_mts);

    //     return to_retun;
    // }

    // static mtsToProx(prox_mts) {

    //     var to_return = 'Z';

    //     if (prox_mts >= 3) {
    //         to_return = 'C';
    //     } else {
    //         to_return = (prox_mts >= 1) ? 'B' : 'A';
    //     }

    //     return to_return;
    // }
}

module.exports = Beacon