const express =require('express')
const app=express()

const PORT=3000
const HOST='127.0.0.1'
const bcrypt=require('bcryptjs')

app.use(express.static('public/'))
app.use(express.urlencoded({extended:true}))

const connection=require('./config/db')
const userSchema=require('./model/userSchema')

app.get('/',(req,res)=>{
    res.render('login.ejs')
})

app.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})

app.post('/signup',async(req,res)=>{
    try{
        const {username,useremail,password,phone}=req.body

        
        const hashpassword=await bcrypt.hash(password,10)
        // res.send(hashpassword)
        const result=new userSchema({username,useremail,password:hashpassword,phone})
        await result.save()

        console.log("User Register")

        return res.send(`<script> 
            alert("profile created..");
            window.location.href='/'
            </script>`)
        
    }
    catch(err){
        console.log("Internal server error",err)
    }
})

app.post('/login',async(req,res)=>{
    try{
        //user data
        const{username,password}=req.body
        //  res.send(`
        //     username=${username}
        //     password=${password}`
        //  )
 const  isUserExists= await userSchema.findOne({username:username})
//  res.send(isUserExists)


if(!isUserExists)
    {
       res.send(`<script>alert("user not found"); window.location.href='/'</script>`)
     }

     //******************************************************* */

     const isPasswordMatch =await bcrypt.compare(password,isUserExists.password)
     console.log(isPasswordMatch)

     if(!isPasswordMatch)
     {
        return res.send(`<script>alert('Invalid password'); window.location.href='/'</script>`)
     }

     if(!isUserExists && !isPasswordMatch){
     res.send("<h1>login successfully...</h1>")
     }
     

     console.log("login Successfully")

    }
    catch(err){
        console.log("Internal server error",err)
    }
})
app.listen(PORT ,HOST,()=>{
    console.log(`server is running up..http://${HOST}:${PORT}`)
})