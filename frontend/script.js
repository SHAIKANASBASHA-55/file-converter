const API_URL = "https://file-converter-y6u2.onrender.com/test-upload";

function convert(){
    const file = document.getElementById("fileInput").files[0];
    const status = document.getElementById("status");

    if(!file){
        status.innerText = "❌ Please select a file";
        return;
    }

    status.innerText = "⏳ Converting (server waking up if asleep)...";

    const formData = new FormData();
    formData.append("file", file);

    fetch(API_URL, {
        method: "POST",
        body: formData
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Server error");
        }
        const type = res.headers.get("content-type");
        if (!type || !type.includes("application/pdf")) {
            throw new Error("Not a PDF response");
        }
        return res.blob();
    })
    .then(blob => {
        if (blob.size < 1000) {
            throw new Error("Empty PDF");
        }
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.pdf";
        a.click();
        status.innerText = "✅ Conversion successful!";
    })
    .catch(err => {
        console.error(err);
        status.innerText = "❌ Conversion failed. Check backend status.";
    });
}
