window.selectTool = function (tool) {
  activeTool = tool;
  document.getElementById("toolTitle").innerText =
    tool.replace(/-/g, " ").toUpperCase();
};

window.openPicker = function () {
  document.getElementById("fileInput").click();
};

const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");

dropzone.addEventListener("dragover", e => {
  e.preventDefault();
  dropzone.classList.add("active");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("active");
});

dropzone.addEventListener("drop", e => {
  e.preventDefault();
  dropzone.classList.remove("active");
  fileInput.files = e.dataTransfer.files;
});
