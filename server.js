
// const cluster = require('cluster')
// const os = require('os')

// const numCpu = os.cpus().length

// if(cluster.isMaster){
//     // Create a worker for each CPU
//     for (let i = 0; i < numCpu; i++) {
//         cluster.fork();
//     }
//     cluster.on('online', function (worker) {
//         console.log('Worker ' + worker.process.pid + ' is online.');
//     });
//     cluster.on('exit', function (worker, code, signal) {
//         console.log('worker ' + worker.process.pid + ' died.');
//         cluster.fork()
//     });
// }else{







const express = require('express')
const cors = require('cors')
const path = require('path')
const color = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
// const GaolsRouter = require('./routes/GoalsRoutes')
const {errorHandler} = require('./middleWare/ErrorMiddleWare')
const connectDB = require('./DB/DB')
const DummyDataModel = require('./models/DummyDataModel')




const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
const { ObjectId } = require('mongodb');

function generateRideData() {
  const vehicleTypes = ["electric", "diesel", "petrol", "hybrid"];
  const rideData = [];
  const vehicleIds = Array.from({ length: 500 }, (_, index) => (index + 1).toString());

  const getRandomVehicleId = () => {
    return vehicleIds[Math.floor(Math.random() * vehicleIds.length)];
  };

  const getRandomVehicleMileage = (vehicleType) => {
    // Define more realistic mileage ranges for different vehicle types
    const mileageRanges = {
      electric: [100, 400], // Kilometers per charge
      diesel: [10, 15],    // Kilometers per liter
      petrol: [10, 15],    // Kilometers per liter
      hybrid: [12, 20],    // Kilometers per liter
    };

    const minMileage = mileageRanges[vehicleType][0];
    const maxMileage = mileageRanges[vehicleType][1];

    return parseFloat((Math.random() * (maxMileage - minMileage) + minMileage).toFixed(2));
  };

  for (let i = 0; i < 5000; i++) {
    const createdAt = new Date(
      2020 + Math.floor(Math.random() * 4), // Year between 2020 and 2023
      Math.floor(Math.random() * 12), // Month (0-11)
      Math.floor(Math.random() * 31) + 1, // Day (1-31)
      Math.floor(Math.random() * 24), // Hour (0-23)
      Math.floor(Math.random() * 60) // Minute (0-59)
    ).toISOString();

    const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];

    const millage = Math.random() < 0.2 ? null : getRandomVehicleMileage(vehicleType);

    const ride = {
      _id: new ObjectId(), // Generate a new MongoDB Object ID
      vehicle_id: getRandomVehicleId(),
      vehicle_millage: millage, // Generate realistic mileage or null
      vehicle_type: vehicleType,
      ride_distance: Math.floor(Math.random() * 100),
      ride_time: Math.floor(Math.random() * 120),
      createdAt: createdAt,
    };

    rideData.push(ride);
  }

  return rideData;
}

// Generate the array of ride data
const rideDataArray = generateRideData();
console.log(rideDataArray);


app.get('/api/save', async(req,res)=>{
    rideDataArray.forEach(async(item,i)=>{
        console.log(item,"item")
    await DummyDataModel.create(item)
    console.log(i)
    }
    )
    res.status(200).json("done")

})
// let flag = true
// DATA.map((item)=>{
//     if( item.location===undefined ){
//         flag = false
//         return flag
//     }
// })
// console.log(flag)

// console.log(DATA)
let i = 0
app.get('/api/data', async(req,res)=>{
    console.log('requested data via api')

    const data=await DummyDataModel.find()

    res.status(200).json({success:true,data:data})
    console.log("completed response")
    // res.send('helloa')

})

app.get('/', (req,res)=>res.send('hellooooo'))


app.use(errorHandler)


const start = async()=>{
    await connectDB()
    app.listen(port , ()=>console.log(`server running on port ${port}`))
}

start()
// }



