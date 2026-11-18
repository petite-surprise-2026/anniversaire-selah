// Ajustements propres aux écrans tactiles : le bouton « Non » s’échappe
// dès qu’on tente de le toucher. Les interactions souris sur ordinateur
// continuent d’être gérées par script.js.
const touchNoButton = document.querySelector("[data-no]");
const birthdayMessageElement = document.querySelector("[data-message]");

if (birthdayMessageElement && typeof CONFIG !== "undefined") {
  birthdayMessageElement.textContent = CONFIG.birthdayMessage.replace(
    "Salut mon humaine !",
    "Salut ma chère humaine!",
  );
}

if (touchNoButton) {
  // Bloque également le clic clavier ou toute activation qui contournerait
  // le déplacement au survol/toucher.
  touchNoButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    moveNoButton();
  }, true);

  touchNoButton.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    moveNoButton();
  });
}

if (touchNoButton && window.matchMedia("(pointer: coarse)").matches) {
  touchNoButton.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;

    // Empêche le clic tactile de valider « Non » avant que le bouton s’échappe.
    event.preventDefault();
    moveNoButton();
  }, { passive: false });
}
