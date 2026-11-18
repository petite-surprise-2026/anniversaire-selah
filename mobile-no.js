// Ajustements propres aux écrans tactiles : le bouton « Non » s’échappe
// dès qu’on tente de le toucher. Les interactions souris sur ordinateur
// continuent d’être gérées par script.js.
const touchNoButton = document.querySelector("[data-no]");
const birthdayMessageElement = document.querySelector("[data-message]");

if (birthdayMessageElement && typeof CONFIG !== "undefined") {
  birthdayMessageElement.textContent = CONFIG.birthdayMessage.replace(
    "Salut mon humaine !",
    "Salut l'humaine",
  );
}

if (touchNoButton && window.matchMedia("(pointer: coarse)").matches) {
  touchNoButton.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;

    // Empêche le clic tactile de valider « Non » avant que le bouton s’échappe.
    event.preventDefault();
    moveNoButton();
  }, { passive: false });
}
