'use strict'

const Model = use('Model')

class Beaconlog extends Model {

    static get table() {
        return 'beaconslogs'
    }

    static get primaryKey() {
        return 'beaconlog_id'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    static get dates() {
        return super.dates.concat(['beaconlog_date'])
    }

}

module.exports = Beaconlog