document.addEventListener("dragover", e => {
  e.preventDefault();
  document.querySelector(".dropzone").classList.add("active");
});

document.addEventListener("dragleave", () => {
  document.querySelector(".dropzone").classList.remove("active");
});
