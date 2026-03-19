const mongoose=require('mongoose')
const connection=async()=>{
    try{
await mongoose.connect('mongodb+srv://preranabendale1_db_user:prerana123@cluster0.r2z9pvm.mongodb.net/UserDB')
console.log("MongoDB Connected")

    }
    catch(err){

        console.log("DB Connection Failed", err)

    }

}

connection()

module.exports= connection