const API_URL = "https://file-converter-y6u2.onrender.com/image-to-pdf";

function convert(){
    const fileInput = document.getElementById("fileInput");
    const status = document.getElementById("status");

    if (!fileInput.files.length) {
        status.innerText = "❌ Select an image first";
        return;
    }

    status.innerText = "⏳ Converting...";

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch(API_URL, {
        method: "POST",
        body: formData
    })
    .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.blob();
    })
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.pdf";
        a.click();
        status.innerText = "✅ Done!";
    })
    .catch(err => {
        console.error(err);
        status.innerText = "❌ Conversion failed";
    });
}
