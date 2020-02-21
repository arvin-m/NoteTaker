//  add new note 
$.get("/api/notes" , function(data) {
  console.log("all note from db",data);
  for(let i =0;i<data.length;i++){
  const title=$("<li>").text(data[i].title);
  const note=$("<li>").text(data[i].note);
  $(".notes").append(title);
  $(".notes").append(note);
  // title.addClass("far fa-trash-alt)

  }
  
  
  // const note =$(".note-textarea").val();
  if (data) {
    $(".save-note").show();
    
    
  } else {
  console.log("input cannot be empty !")
  }
});


// add event listener to the NEW NOTE Btn
$(".new-note").on("click", function() {
 const newNote ={
   id:0, //find a way to defined the specific id for each note
   title:"",
   note:""
 };
 


});

// add event listener to the save Btn
$(".save-note").on("click", function() {
  const newNote={
    title:$(".note-title").val(),
    note:$(".note-textarea").val()
  }
  //  add new note 
   $.post("/api/notes" ,newNote, function(data) {
     
     console.log(data);
     window.location.reload();
        
     if (data) {
       
       console.log(newNote)
       
     } else {
     console.log("input cannot be empty !")
     }
   });
 });