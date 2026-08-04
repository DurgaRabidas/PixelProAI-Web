const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

let brightness = 100;
let contrast = 100;
let rotation = 0;
let flipH = 1;
let flipV = 1;

upload.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(event) {
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            drawImage();
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

function drawImage() {
    ctx.save();

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(rotation*Math.PI/180);
    ctx.scale(flipH, flipV);

    ctx.drawImage(img,-img.width/2,-img.height/2);

    ctx.restore();
}
document.getElementById("brightness").addEventListener("input", function () {
    brightness = this.value;
    drawImage();
});

document.getElementById("contrast").addEventListener("input", function () {
    contrast = this.value;
    drawImage();
});

document.getElementById("rotateBtn").addEventListener("click", function () {
    rotation += 90;
    drawImage();
});

document.getElementById("flipBtn").addEventListener("click", function () {
    flipH *= -1;
    drawImage();
});
document.getElementById("downloadBtn").addEventListener("click", function () {
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
