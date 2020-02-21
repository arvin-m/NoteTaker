const express=require("express");
const fs = require("fs");
const path = require("path");
const app =express();
const db= require("./db/db.json");
const PORT=process.env.PORT || 7050;

app.listen(PORT,()=>{
    console.log(` ----->>>>>>> Server Listening on port ${PORT} ! `)
})

const notesArr=[{
    id:"1",
    title:"arvin",
    note:"heloo every one"

}];

// add the middleware I need to handle POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// create a route for note.index file
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html") );
});

app.get("/api/notes",(req,res)=>{
    // res.json(notesArr);
    fs.readFile(path.join(__dirname,"/db/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const parsedData=JSON.parse(data);
        res.json(parsedData);
    }); 
});

//create a route to add new note to the db.json 
app.post("/api/notes", (req, res) => {
    //new note object is in req.body
    const newNote = req.body;
    
    console.log(newNote);
    
   fs.readFile(path.join(__dirname,"/db/db.json"),"utf8",(err, data) => {
    const oldDB =JSON.parse(data);
    console.log("this is old DB",oldDB);
    newNote.id=oldDB.length+1;
    const newDB =oldDB.concat([newNote]);
    console.log(newDB);
    fs.writeFile(path.join(__dirname,"/db/db.json"),JSON.stringify(newDB),(err)=>{
        console.log(err);
        res.json(newDB);
    });
}) 
         
});

// create a route to DELETE data
app.delete("/api/notes/:id",(req,res)=>{
    const noteBeDelete =req.params.id;
    
    fs.readFile(path.join(__dirname,"/db/db.json"),"utf8",(err, data)=>{
        const oldDB=JSON.parse(data);
        let newDB;

    // find how to delet by specific id
        for(let i =0; i<oldDB.length; i++) {
        if(oldDB[i].id ==noteBeDelete) {
             newDB=oldDB.splice(i+1,1);
          
        }
        
    }
    fs.writeFile(path.join(__dirname,"/db/db.json"),JSON.stringify(newDB),(err)=>{
        console.log(err);
        res.json(newDB);
    });
        console.log(newDB)
        


    })
    
   
   
    

})


