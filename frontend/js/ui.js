window.selectTool = function (tool) {
  activeTool = tool;
  document.getElementById("toolTitle").innerText =
    tool.replace(/-/g, " ").toUpperCase();

  // Clear files when switching tools (optional but recommended)
  document.getElementById("fileInput").value = "";
  updateFileList();
};

window.openPicker = function () {
  document.getElementById("fileInput").click();
};

const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");

// Update file list display
function updateFileList() {
  const fileList = document.getElementById("fileList");
  const files = fileInput.files;

  if (files.length === 0) {
    fileList.style.display = "none";
    fileList.innerHTML = "";
    return;
  }

  fileList.style.display = "flex";
  fileList.innerHTML = "";

  Array.from(files).forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "file-item";

    // Preview
    const preview = document.createElement("div");
    preview.className = "file-preview";

    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      preview.appendChild(img);
    } else if (file.type === "application/pdf") {
      preview.innerHTML = "📄";
    } else {
      preview.innerHTML = "📎";
    }

    // Info
    const info = document.createElement("div");
    info.className = "file-info";

    const name = document.createElement("div");
    name.className = "file-name";
    name.textContent = file.name;

    const size = document.createElement("div");
    size.className = "file-size";
    size.textContent = (file.size / 1024 / 1024).toFixed(2) + " MB";

    info.appendChild(name);
    info.appendChild(size);

    // Remove button
    const remove = document.createElement("button");
    remove.className = "remove-file";
    remove.innerHTML = "&times;";
    remove.onclick = (e) => {
      e.stopPropagation();
      const dt = new DataTransfer();
      Array.from(files).forEach((f, i) => {
        if (i !== index) dt.items.add(f);
      });
      fileInput.files = dt.files;
      updateFileList();
    };

    item.appendChild(preview);
    item.appendChild(info);
    item.appendChild(remove);
    fileList.appendChild(item);
  });
}

// Drag & Drop
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
  updateFileList(); // <-- Important!
});

// File input change (Browse button)
fileInput.addEventListener("change", updateFileList);