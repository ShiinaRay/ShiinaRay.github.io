var apple = document.getElementById("apple");
var elysia = document.getElementById("elysia");
var silver = document.getElementById("silver");


apple.addEventListener("click",picLink);
elysia.addEventListener("click",picLink);
silver.addEventListener("click",picLink);

function picLink(){
    var allImages = document.querySelectorAll(".ShowPictures img");    
    //var allImages = document.querySelectorAll("img");  
    // 之前把所有的  img标签都选中了    
// f12  网页端  检查   出错 情况      之前的figure图片消失了   
//  class  变为 hide 了     query语句把所有的图片都隐藏了！！！
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



  

