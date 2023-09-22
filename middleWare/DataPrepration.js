// // const asyncHandler = require('express-async-handler')

// const e = require("express")



// const dataPrepration = async (data)=>{

//     let unique_users= []
//     let unique_locations=[]
//     let unique_dates = []
//     let RevenueGraph = [["Date","Total Revenue", "Average Revenue"]]
//     let NoOfRidesGraph = [["Date","No of Rides"]]
//     let LocationAndRevenue = []
//     let LocationAndRides =[]
//     let PeakDays = [["Sunday",0],["Monday",0],["Tuesday",0],["Wednesday",0,],["Thursday",0],["Friday",0],["Saturday",0]]
//     //Co2 graphs
//     let Co2Saved = [["Date","CO2 Saved"]]
//     let FuelAndTreesGraph =[["Date","Fuel Saved", "Trees Relaxed"]]
//     //ACCumilative Data
//     let ACC_data ={
//         totalCost:0,
//         totalRides:0,
//         totalDistance:0,
//         Num_of_users:0,
//         totaCo2Saved:0,
//         totalFuelSaved:0,
//         totalTreesRelaxed:0
//     }
   
//     let output = {}
// // ====================================================
//     data.map((item)=>{
//         // Acumilative ride and revenue data
//         ACC_data.totalCost+=item.cost
//         ACC_data.totalRides+=1
//         ACC_data.totalDistance+=item.distance
//         //Accumilative CO2 data
//         ACC_data.totaCo2Saved =ACC_data.totaCo2Saved + item.distance*0.013
//         ACC_data.totalFuelSaved =ACC_data.totalFuelSaved + item.distance*0.04
//         ACC_data.totalTreesRelaxed =ACC_data.totalTreesRelaxed + item.distance*0.012


//         if(!unique_users.includes(item.user)){
//         unique_users.push(item.user)
//         ACC_data.Num_of_users+=1
//         }
//         if(!unique_dates.includes(item.createdAt.slice(0,10))){
//         unique_dates.push(item.createdAt.slice(0,10))
//         }
//         if(!unique_locations.includes(item.location)){
//             unique_locations.push(item.location)
//         }
//     })
    
// // ==========================================================
//     //lopp end here

// // Dates wale graphs wala loop
// // ==========================================================
//     for(let i=0;i<=unique_dates.length-1;i++){
//         let totalCost=0
//         let totalRides=0
//         // let totalDistance=0

//         let co2_saved_ride= 0
//         let co2_saved_per_day = 0

//         let fuel_saved_ride= 0
//         let fuel_saved_per_day = 0

//         let trees_relaxed_ride= 0
//         let trees_relaxed_per_day = 0

//        data.forEach((item)=>{
//            if(item.createdAt.slice(0,10)===unique_dates[i]){
//             // date wise revenue ,distance and rides calculation
//             totalCost+=item.cost
//             // totalDistance+=item.distance
//             totalRides +=1

//             // Dates wise Co2, fuel and trees relaxed calculations
//             co2_saved_ride = item.distance * 0.013
//             co2_saved_per_day += co2_saved_ride

//             fuel_saved_ride = item.distance * 0.04
//             fuel_saved_per_day += fuel_saved_ride

            
//             trees_relaxed_ride = item.distance * 0.12
//             trees_relaxed_per_day += trees_relaxed_ride


//             switch (new Date(item.createdAt.slice(0,10)).getDay()) {
//                 case 0:
//                   PeakDays[0][1]+=1
//                   break;
//                 case 1:
//                     PeakDays[1][1]+=1
//                   break;
//                 case 2:
//                     PeakDays[2][1]+=1
//                   break;
//                 case 3:
//                     PeakDays[3][1]+=1
//                   break;
//                 case 4:
//                     PeakDays[4][1]+=1
//                   break;
//                 case 5:
//                     PeakDays[5][1]+=1
//                   break;
//                 case 6:
//                     PeakDays[6][1]+=1
//               }
            
//            }
//         })


//         RevenueGraph.push([(unique_dates[i]),totalCost, totalCost/totalRides])
//         NoOfRidesGraph.push([unique_dates[i],totalRides])
//         Co2Saved.push([unique_dates[i],co2_saved_per_day])
//         FuelAndTreesGraph.push([unique_dates[i],fuel_saved_per_day, trees_relaxed_per_day])
//     }
// // ==========================================================
//     //lopp end here
//     PeakDays= PeakDays.sort((a,b)=>{return b[1] - a[1]})
//     PeakDays[0][2]="#b00b94"
//     PeakDays[1][2]="#8f399f"
//     PeakDays[2][2]="#6e65ab"
//     PeakDays[3][2]= "#4091b6"
//     PeakDays[4][2]="#4b8eb2"
//     PeakDays[5][2]="#4693b4"
//     PeakDays[6][2]="#18D1c3"

//     PeakDays.unshift(['Day', "No of Rides", { role: "style" }]);





// // Location wale graphs wala loop
//     // ==========================================================
//     for(let i=0;i<=unique_locations.length-1;i++){
//         let totalCost=0
//         let totalRides=0
//         let totalDistance = 0

//        data.forEach((item)=>{
//            if(item.location===unique_locations[i]){
//             totalCost+=item.cost
//             totalDistance+=item.distance
//             totalRides +=1
//            }
//         })

//         LocationAndRevenue.push([unique_locations[i],totalCost])
//         LocationAndRides.push([unique_locations[i].slice(0,3),totalRides,Number(totalDistance.toFixed(2)),unique_locations[i].toUpperCase(),Number(totalCost.toFixed(2))])
//     }

//     LocationAndRevenue.sort((a,b)=>{return b[1] - a[1]})
//     LocationAndRevenue=  LocationAndRevenue.slice(0,10)
//     LocationAndRevenue.unshift(["location", "Total Revenue"])



//     LocationAndRides.sort((a,b)=>{return b[1] - a[1]})
//     LocationAndRides=  LocationAndRides.slice(0,6)
//     LocationAndRides.unshift(["ID", "No of Rides", "Total Distance","Location","Revenue"])
// // ==========================================================

//     output={RevenueGraph,NoOfRidesGraph,LocationAndRevenue,LocationAndRides,PeakDays,Co2Saved,FuelAndTreesGraph,ACC_data}



//   return output

// }
// module.exports = dataPrepration