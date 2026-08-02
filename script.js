const upload = document.getElementById("upload");
const image = document.getElementById("image");

upload.addEventListener("change",function(e){

const file=e.target.files[0];

if(file){

image.src=URL.createObjectURL(file);

image.style.display="block";

}

});
