const upload = document.getElementById("upload");
const image = document.getElementById("image");

const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");

let rotation = 0;
let flipX = 1;
let brightnessValue = 100;
let contrastValue = 100;

function updateImage() {
    image.style.transform = `rotate(${rotation}deg) scaleX(${flipX})`;
    image.style.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%)`;
}

upload.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        image.src = URL.createObjectURL(file);
        image.style.display = "block";
        updateImage();
    }
});

document.querySelectorAll(".left-panel button").forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "Rotate") {
            rotation += 90;
        }

        if (button.textContent === "Flip") {
            flipX *= -1;
        }

        updateImage();
    });
});

brightness.addEventListener("input", () => {
    brightnessValue = brightness.value;
    updateImage();
});

contrast.addEventListener("input", () => {
    contrastValue = contrast.value;
    updateImage();
});
