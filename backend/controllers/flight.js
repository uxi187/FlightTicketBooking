const Flight = require('../models/Flight')

const allflights = async(req,res) => {
    try {
        
        const flights = await Flight.find(req.query)
        res.status(200).json({flights})
    } catch (error) {
        console.log(error)
    }
}

const createFlight = async (req,res) => {
    try {
        const flights = await Flight.create(req.body)
        res.status(200).json(flights)
    } catch (error) {
        console.log(error)
    }
}




module.exports = {allflights , createFlight}