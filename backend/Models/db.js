const  mongooes =require('mongoose');

const mongo_url =process.env.DB_URL;

mongooes.connect(mongo_url)
.then(()=>{
    console.log("Mongodb Connected...")
}).catch((err)=>{
    console.log("Mongodb Connection error" , err)
})