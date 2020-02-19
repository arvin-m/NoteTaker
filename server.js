const express=require("express");
const path = require("path");
const app =express();
const PORT=process.env.PORT || 7030;

app.listen(PORT,()=>{
    console.log(` ----->>>>>>> Server Listening on port ${PORT} ! `)
})

const notesArr=[];

// add the middleware I need to handle POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// create a route for note.index file
app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/notes.html") )
})
// create a route for index.html file
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html") )
})