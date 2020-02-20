const fs = require("fs");
// const $ = require("jquery");

// add event listener to the save Btn
$(".new-note").on("click", function() {
 const newNote ={
   id:0, //find a way to defined the specific id for each note
   title:"",
   note:""
 };
 
 const title=$(".note-title").val();
 const note =$(".note-textarea").val();
 

//  add new note 
  $.post("/api/notes" , function(data) {
    console.log(data);
    if (data) {
      $(".save-note").show();
      title.text(newNote.title);
      note.text(newNote.note);
      
    } else {
    console.log("input cannot be empty !")
    }
  });
});