const mongoose = require('mongoose')

const DummyDataSchema = mongoose.Schema({

    vehicle_id:{
        type:String,
        required:[true, 'Please add vehicle_id'],
    },
    vehicle_millage:{
        type:Number,
    },
    vehicle_type:{
        type:String,
        required: [true, 'Please add a vehicle_type']
    },
    ride_distance:{
        type:Number,
        required: [true, 'Please add a ride_distance value']
    },
    ride_time:{
        type:Number,
        required: [true, 'Please add a ride_time']
    },
    createdAt:{
        type:String,
        required: [true, 'Please add a createdAt']
    },


}
)


module.exports = mongoose.model('DummyDataModel', DummyDataSchema)

