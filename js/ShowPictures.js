var apple = document.getElementById("apple");
var elysia = document.getElementById("elysia");
var silver = document.getElementById("silver");


apple.addEventListener("click",picLink);
elysia.addEventListener("click",picLink);
silver.addEventListener("click",picLink);

function picLink(){
    var allImages = document.querySelectorAll(".ShowPictures img");
    for(var i=0; i<allImages.length; i++){
        allImages[i].className = "hide";
    }

    var picId = this.attributes["data-img"].value;
    var pic = document.getElementById(picId);
    if(pic.className === "hide"){
        pic.className = "";
    }else{
        pic.className = "hide";
    }
}



  

