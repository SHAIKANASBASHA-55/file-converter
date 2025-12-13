const BASE = "https://file-converter-y6u2.onrender.com";
let currentTool = "";

function selectTool(tool){
  currentTool = tool;
  document.getElementById("panel").classList.remove("hidden");
  document.getElementById("toolTitle").innerText =
    tool.replace("-", " ").toUpperCase();
}

function convert(){
  const input = document.getElementById("fileInput");
  const status = document.getElementById("status");

  if(!input.files.length){
    status.innerText = "❌ Select file(s)";
    return;
  }

  status.innerText = "⏳ Processing...";

  const data = new FormData();

  if(currentTool === "merge-pdf"){
    [...input.files].forEach(f => data.append("files", f));
  } else {
    data.append("file", input.files[0]);
  }

  fetch(`${BASE}/${currentTool}`, {
    method:"POST",
    body:data
  })
  .then(res => {
    if(!res.ok) throw "error";
    return currentTool === "split-pdf" ? res.json() : res.blob();
  })
  .then(out => {
    if(currentTool === "split-pdf"){
      alert("Split done. Files created on server.");
      status.innerText = "✅ Done!";
      return;
    }

    const url = URL.createObjectURL(out);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output";
    a.click();
    status.innerText = "✅ Done!";
  })
  .catch(()=>{
    status.innerText = "❌ Failed";
  });
}
