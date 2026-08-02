const upload = document.getElementById("upload");
const image = document.getElementById("image");

let rotation = 0;
let flipX = 1;

upload.addEventListener("change", function (e) {
    const file = e.target.files[0];

    if (file) {
        image.src = URL.createObjectURL(file);
        image.style.display = "block";
    }
});

document.querySelectorAll(".left-panel button").forEach(button => {
    button.addEventListener("click", () => {

        if (button.textContent === "Rotate") {
            rotation += 90;
            image.style.transform =
                `rotate(${rotation}deg) scaleX(${flipX})`;
        }

        if (button.textContent === "Flip") {
            flipX *= -1;
            image.style.transform =
                `rotate(${rotation}deg) scaleX(${flipX})`;
        }

    });
});
