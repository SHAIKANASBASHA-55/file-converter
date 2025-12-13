function selectTool(tool) {
  activeTool = tool;
  document.getElementById("toolTitle").innerText =
    tool.replace(/-/g, " ").toUpperCase();
}

function openPicker() {
  document.getElementById("fileInput").click();
}
