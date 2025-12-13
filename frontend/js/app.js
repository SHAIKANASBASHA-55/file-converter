function convert() {
  const input = document.getElementById("fileInput");
  const status = document.getElementById("status");

  if (!activeTool) {
    status.innerText = "❌ Select a tool first";
    return;
  }

  if (!input.files.length) {
    status.innerText = "❌ Select file(s)";
    return;
  }

  const data = new FormData();

  if (activeTool === "merge-pdf") {
    [...input.files].forEach(f => data.append("files", f));
  } else {
    data.append("file", input.files[0]);
  }

  status.innerText = "⏳ Processing...";

  callAPI(activeTool, data)
    .then(res => {
      if (!res.ok) throw new Error();
      return activeTool === "split-pdf" ? res.json() : res.blob();
    })
    .then(result => {
      if (result instanceof Blob) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(result);
        a.download = "output";
        a.click();
      } else {
        alert("Split completed on server");
      }
      status.innerText = "✅ Done!";
    })
    .catch(() => {
      status.innerText = "❌ Failed";
    });
}
