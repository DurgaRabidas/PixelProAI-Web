const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const brightnessSlider = document.getElementById("brightness");
const contrastSlider = document.getElementById("contrast");

let img = new Image();

let brightness = 100;
let contrast = 100;
let rotation = 0;
let scale = 1;
let flipX = 1;
let filterMode = "none";

function drawImage() {

    if (!img.src) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.rotate(rotation * Math.PI / 180);

    ctx.scale(scale * flipX, scale);

    ctx.filter =
        `brightness(${brightness}%)
         contrast(${contrast}%)
         ${filterMode}`;

    const ratio = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
    );

    const w = img.width * ratio;
    const h = img.height * ratio;

    ctx.drawImage(
        img,
        -w / 2,
        -h / 2,
        w,
        h
    );

    ctx.restore();
}

upload.addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        img.onload = function () {

            canvas.width = canvas.parentElement.clientWidth - 40;
            canvas.height = canvas.parentElement.clientHeight - 40;

            drawImage();

        };

        img.src = event.target.result;

    };

    reader.readAsDataURL(file);

});
document.getElementById("rotateBtn").addEventListener("click", function () {
    rotation += 90;
    drawImage();
});

document.getElementById("flipBtn").addEventListener("click", function () {
    flipX *= -1;
    drawImage();
});

document.getElementById("zoomInBtn").addEventListener("click", function () {
    scale += 0.1;
    drawImage();
});

document.getElementById("zoomOutBtn").addEventListener("click", function () {
    if (scale > 0.2) {
        scale -= 0.1;
        drawImage();
    }
});
brightnessSlider.addEventListener("input", function () {
    brightness = Number(this.value);
    drawImage();
});

contrastSlider.addEventListener("input", function () {
    contrast = Number(this.value);
    drawImage();
});

document.getElementById("filterBtn").addEventListener("click", function () {
    if (filterMode === "none") {
        filterMode = "grayscale(100%)";
    } else {
        filterMode = "none";
    }

    drawImage();
});
document.getElementById("downloadBtn").addEventListener("click", function () {

    if (!img.src) {
        alert("Please upload an image first.");
        return;
    }

    const link = document.createElement("a");
    link.download = "PixelProAI-Edited.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

});
