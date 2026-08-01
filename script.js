const upload = document.getElementById("upload");
const image = document.getElementById("image");

if (upload && image) {
    upload.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            image.src = URL.createObjectURL(file);
            image.style.display = "block";
        }
    });
}
