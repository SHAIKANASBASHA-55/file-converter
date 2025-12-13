window.convert = function () {
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
      if (!res.ok) throw new Error("API error");
      return activeTool === "split-pdf" ? res.json() : res.blob();
    })
    .then(out => {
      if (out instanceof Blob) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(out);
        a.download = "output";
        a.click();
      }
      status.innerText = "✅ Done!";
    })
    .catch(() => {
      status.innerText = "❌ Failed";
    });
};
