const lightBox = document.getElementById("lightbox");
const lightBoxOutro = document.getElementById("header");
const lightBoxClose = document.getElementById("lightbox-close");
const lightBoxMediaContenair = document.querySelector("#lightbox-container");

function closeLightBox() {
  lightBox.setAttribute("aria-hidden", "true");
  lightBox.style.visibility = "hidden";
  lightBoxMediaContenair.innerHTML = "";

  lightBoxOutro.focus();
}

lightBoxClose.addEventListener("click", () => {
  closeLightBox();
});

lightBox.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightBox();
  }
});

lightBoxClose.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    lightBoxMediaContenair.focus();
  }
});
