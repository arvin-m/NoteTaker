const express=require("express");
const fs = require("fs");
const path = require("path");
const app =express();
const db= require("./db/db.json");
const PORT=process.env.PORT || 7050;

// const notesArr=[{
//     id:"1",
//     title:"arvin",
//     note:"heloo every one"

// }];

// add the middleware I need to handle POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));







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
    
    // console.log(newNote);
    
   fs.readFile(path.join(__dirname,"/db/db.json"),"utf8",(err, data) => {
    const oldDB =JSON.parse(data);
    // console.log("this is old DB",oldDB);
    newNote.id=Math.floor((Math.random() * 100000) + 1);
    // newNote.id=oldDB.length+1;
    const newDB =oldDB.concat([newNote]);
    // console.log(newDB);
    fs.writeFile(path.join(__dirname,"/db/db.json"),JSON.stringify(newDB),(err)=>{
        console.log(err);
        res.json(newDB);
    });
}) 
         
});

// create a route to DELETE data
app.delete("/api/notes/:id",(req,res)=>{
    const noteBeDelete =req.params.id;
    // console.log(noteBeDelete);
    
    fs.readFile(path.join(__dirname,"/db/db.json"),"utf8",(err, data)=>{
        if (err) res.json(err);
        const oldDB=JSON.parse(data);
        let newDB;
        // console.log(oldDB);
        //  delet by specific id
        newDB = oldDB.filter(note => note.id != noteBeDelete);
        // newDB = oldDB.filter(note => {
        //     if (note.id === noteBeDelete) {
        //         return false;
        //     } else {
        //         return true;
        //     }
        // });
        // console.log(newDB);

        fs.writeFile(path.join(__dirname,"/db/db.json"),JSON.stringify(newDB),(err)=>{
            if (err) res.json(err);
            res.json(newDB);
        });
            


    })
});
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html") );
});

app.listen(PORT,()=>{
    console.log(` ----->>>>>>> Server Listening on port ${PORT} ! `)
})


