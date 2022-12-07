const mongoose = require('mongoose');

const MyFlightSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    triptype:{
        type:String,
        required:true
    },
    tripclass:{
        type:String,
        required:true
    },
    totalprice:{
        type:Number,
    },
    flightname:{
        type:String,
        required: true
    },
    flightnumber:{
        type:String,
        required: true,
    },
    departure:{
        type:String,
        required: true,
    },

    departuretime:{
        type:String,
        required: true,
    },
    departureairport:{
        type:String,
    },
    departurecode:{
        type:String,
        required: true,
    },
    destination:{
        type:String,
        required: true,
    },
    destinationtime:{
        type:String,
        required: true,
    },
    destinationairport:{
        type:String,
        required: true,
    },
    destinationcode:{
        type:String,
        required: true,
    },
    rflightname:{
        type:String,
    },
    rflightnumber:{
        type:String,
    },
    rdeparture:{
        type:String,
    },
    rdeparturetime:{
        type:String,
    },
    rdeparturedate:{
        type:String,
    },
    rdepartureairport:{
        type:String,
    },
    rdeparturecode:{
        type:String,
    },
    rdestination:{
        type:String,
    },
    rdestinationtime:{
        type:String,
    },
    rdestinationairport:{
        type:String,
    },
    rdestinationcode:{
        type:String,
    },
})


module.exports = mongoose.model('Myflight',MyFlightSchema)