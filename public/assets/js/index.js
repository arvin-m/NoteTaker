//  Show the database objects 

$.get("/api/notes" , function(data) {
  console.log("all note from db",data);
  for(let i =0;i<data.length;i++){
    const listItem=$("<li>");
    listItem.addClass("list-group-item");
    $(".notes").append(listItem);
    const title=$("<span>").text(data[i].title);
    $(listItem).append(title);
    const listIcon=$("<i>");
    listIcon.addClass("far fa-trash-alt float-right text-danger");
    $(listItem).append(listIcon);
  }
  $(".save-note").hide();
   
  
  });



// add event listener to the NEW NOTE Btn
$(".new-note").on("click", function() {
//  const newNote ={
//    id:0, 
//    title:"",
//    note:""
//  };
  const noteTitle = $(".note-title");
  const noteText = $(".note-textarea");
  if (!noteTitle.val() || !noteText.val()) {
    $(".save-note").hide();
    
    
  } else {
    $(".save-note").show();

}
 

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
       
       console.log(newNote);
       return;
       
     } else {
     console.log("input cannot be empty !")
     }
   });
 });

 $(".far fa-trash-alt").click(function(){
  // $(this).parent().remove();
   
   
   console.log("item clicked");

 });

// list clecked
 $(".list-group-item").on("click",function(){
  
  console.log("item clicked");

 

})