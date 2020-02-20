const express=require("express");
const path = require("path");
const app =express();
const PORT=process.env.PORT || 7050;

app.listen(PORT,()=>{
    console.log(` ----->>>>>>> Server Listening on port ${PORT} ! `)
})

const notesArr=[{
    id:"1",
    tittle:"arvin",
    note:"heloo every one"

}];

// add the middleware I need to handle POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// create a route for note.index file
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html") );
})
// create a route for index.html file
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html") );
})
// create a route for load data from db.json
app.get("/api/notes",(req,res)=>{
    res.readFile(path.join(__dirname,"/db/db.json", "utf8") );
})

//create a route to add new note to the db.json
app.post("/api/notes", (req, res) => {
    //new note object is in req.body
    const newNote = req.body;
    // newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
    // console.log(newNote);
    notesArr.push(newNote);
    res.json(notesArr);
         
});

// create a route to DELETE data
app.delete("/api/notes/:id",(req,res)=>{
    const noteBeDelete =req.body.id;
    notesArr.pop(noteBeDelete); // find how to delet by specific id
    res.send(notesArr);
})


