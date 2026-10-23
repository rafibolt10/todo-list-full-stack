// let http = require("http");
require("dotenv").config();
let express = require("express");
let app = express();

// install cors library.. because different url of frontend and backend will not match .so that will not give data from backend
// so the cors is used.
let cors = require("cors");
app.use(cors());

let mongoose = require('mongoose')

// let server = http.createServer(app);
// import with variable by creating the server

app.use(express.json());

// creating the database

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB connected successfully");
}
)
.catch((err)=>{
    console.log(err);
})

// Creating schema

const todoSchema = new mongoose.Schema({
    title:String,
    description:String
});
// up-- creating the new schema in mongoose

// -------- Creating collection name
const todoModel = mongoose.model("todolist",todoSchema);



// let todoList=[];
// create item..
app.post("/createItem",async (req,res)=>{
    let {title,description} = req.body;
    try{
    const newItem = new todoModel({title,description});
    await newItem.save();
    // creating the object like data.. in document format..
res.status(201).json(newItem);
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})
// database operation engala nadakutho async await is important..

// show to do items 

app.get("/showItem",async (req,res)=>{
    try{
        let showList = await todoModel.find();
// find() vanthu database la data va find panni showList la store pannum... and operation nadukumbothu await use pannanum
        res.status(201).json(showList);
    }
    catch (error) {
res.status(201).json({message:error.message});
    }
})

//Edit / Update to do items

app.put("/editItem/:abc",async(req,res)=>{
    // ethula :abc vanthu id  get pannum..
    let id = req.params.abc;
    let {title,description} = req.body;

    try{
        let modifiedtodolist = await todoModel.findByIdAndUpdate(id,{title,description},{new:true});
        // find
        
        if(!modifiedtodolist){
            return res.status(404).json({message:"Item is not found"});
        }
        res.status(201).json(modifiedtodolist);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

// ------ Delete the Item -----

app.delete("/deleteItem/:bca",async(req,res)=>{
    let id=req.params.bca;
    try{
        await todoModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})




// app.post("/createItem",(req,res)=>{
//     let {title,description} = req.body;
//     let listItem = {
//         id:0,
//         title,
//         description
//     }
//     todoList.push(listItem);
// console.log(todoList);
// res.status(201).json(listItem);
// })

module.exports = app;