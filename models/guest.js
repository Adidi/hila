"use strict";
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const GuestSchema = new Schema({
        fullName : String,
        song : String
    },{
        timestamps: true
    });

const Guest = mongoose.model('Guest', GuestSchema);

module.exports = Guest;