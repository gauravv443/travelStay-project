require("dotenv").config({path:"../.env"});
const mongoose =require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
const dbUrl=process.env.ATLASDB_URL;

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
}


const initDb=async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"6a1fae8169bd0e87d20effd9",geometry:{type:"Point",coordinates:[77.1025,28.7041]}})); 
    await Listing.insertMany(initdata.data);
    console.log("data was saved");

}

initDb();