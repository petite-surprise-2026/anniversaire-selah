// Personnalise ce bloc, puis remplace les images par tes propres fichiers autorisés.
const CONFIG = {
  name: "Selah",
  birthdayMessage: `Salut ma chère humaine !

Je t’écris ce petit mot pour te souhaiter un heureux anniversaire ! 🎂🎉

Je suis profondément reconnaissant envers Dieu pour ta vie, pour la personne que tu es et surtout pour celle que tu deviens. 🙏🏽

Que cette nouvelle année t’apporte énormément de joie, de paix, d’amour, de réussite et plein de beaux moments. Je te souhaite de devenir un modèle dans cette génération. Tu mérites de belles choses ! ✨

Pour fêter ça comme il se doit, je te propose qu’on se fasse un petit restau asiat 🍜🥢😋. Je te communiquerai le lieu et la date ultérieurement, si t'es partante !

Dis toi que j'ai passé plusieurs jours à créer cette petite page, dinguerie ! J'espère que tu apprécieras l'effort !

MAIS ATTENTION ! ⚠️

Que tu sois partante ou non pour le restau, je te demande une seule chose : clique d'abord sur le bouton NON (si tu peux). 👀

Ne pose pas de questions, fais moi confiance!

Encore joyeux anniversaire, femme d'impact! 🥳
`,
  invitationDate: "",
  restaurant: "un restaurant",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85",
      alt: "Lumières scintillantes d’un concert",
    },
    {
      src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85",
      alt: "Une scène de concert colorée",
    },
    {
      src: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=85",
      alt: "Illustration dans une ambiance anime",
    },
  ],
};

const nameElement = document.querySelector("[data-name]");
const messageElement = document.querySelector("[data-message]");
const dateElement = document.querySelector("[data-date]");
const questionElement = document.querySelector("#question");
const yesButton = document.querySelector("[data-yes]");
const noButton = document.querySelector("[data-no]");
const noRunner = document.querySelector("[data-no-runner]");
const reply = document.querySelector("[data-reply]");
const choices = document.querySelector("[data-choices]");
const celebrationOverlay = document.querySelector("[data-celebration]");
const celebrationScene = document.querySelector("[data-celebration-scene]");
const celebrationIcon = document.querySelector("[data-celebration-icon]");
const celebrationMessage = document.querySelector("[data-celebration-message]");

nameElement.textContent = CONFIG.name;
messageElement.textContent = CONFIG.birthdayMessage;
dateElement.textContent = CONFIG.invitationDate;
questionElement.firstChild.textContent = `Seriez-vous disponible pour ${CONFIG.restaurant} `;

document.querySelectorAll("[data-gallery]").forEach((image) => {
  const entry = CONFIG.gallery[Number(image.dataset.gallery)];
  if (entry) {
    image.addEventListener("error", () => {
      image.hidden = true;
    }, { once: true });
    image.src = entry.src;
    image.alt = entry.alt;
  }
});

let responseHandled = false;
let hasTwerked = false;
let noRunnerTimeout;

const celebrationScenes = [
  { icon: "🎉", message: `Quelle joie, ${CONFIG.name} !` },
  { icon: "🥳", message: "Que la fête commence !" },
  { icon: "🎊", message: "Plein de bonheur pour toi !" },
];

function recordResponse(choice) {
  if (responseHandled) return false;
  responseHandled = true;
  reply.textContent = choice === "Oui"
    ? `Quelle joie, ${CONFIG.name} ! On se réjouit de fêter ça ensemble. 💜`
    : "Merci pour ta réponse. 💜";
  reply.hidden = false;
  return true;
}

function showCelebration() {
  let sceneIndex = 0;
  celebrationOverlay.hidden = false;
  celebrationOverlay.classList.add("is-visible");

  function showNextScene() {
    const scene = celebrationScenes[sceneIndex];
    celebrationIcon.textContent = scene.icon;
    celebrationMessage.textContent = scene.message;
    celebrationScene.classList.remove("is-animating");
    void celebrationScene.offsetWidth;
    celebrationScene.classList.add("is-animating");
    sceneIndex += 1;

    if (sceneIndex < celebrationScenes.length) {
      window.setTimeout(showNextScene, 1800);
      return;
    }

    window.setTimeout(() => {
      celebrationOverlay.classList.remove("is-visible");
      window.setTimeout(() => {
        celebrationOverlay.hidden = true;
        celebrationScene.classList.remove("is-animating");
      }, 450);
    }, 1800);
  }

  showNextScene();
}

function moveNoButton() {
  if (responseHandled) return;

  window.clearTimeout(noRunnerTimeout);
  noRunner.classList.remove("is-visible");
  void noRunner.offsetWidth;
  noRunner.classList.add("is-visible");
  noRunnerTimeout = window.setTimeout(() => {
    noRunner.classList.remove("is-visible");
  }, 1300);

  const choicesRect = choices.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();
  const maxLeft = Math.max(0, choicesRect.width - buttonRect.width);
  const maxTop = Math.max(0, choicesRect.height - buttonRect.height);
  const yesBounds = {
    left: yesRect.left - choicesRect.left,
    right: yesRect.right - choicesRect.left,
    top: yesRect.top - choicesRect.top,
    bottom: yesRect.bottom - choicesRect.top,
  };
  const currentLeft = noButton.classList.contains("is-running")
    ? Number.parseFloat(noButton.style.left)
    : noButton.offsetLeft;
  const currentTop = noButton.classList.contains("is-running")
    ? Number.parseFloat(noButton.style.top)
    : noButton.offsetTop;
  let nextLeft = currentLeft;
  let nextTop = currentTop;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    nextLeft = Math.random() * maxLeft;
    nextTop = Math.random() * maxTop;
    const overlapsYes =
      nextLeft < yesBounds.right + 8 &&
      nextLeft + buttonRect.width > yesBounds.left - 8 &&
      nextTop < yesBounds.bottom + 8 &&
      nextTop + buttonRect.height > yesBounds.top - 8;
    const movedEnough = Math.hypot(nextLeft - currentLeft, nextTop - currentTop) > 48;

    if (!overlapsYes && movedEnough) break;
  }

  noButton.classList.add("is-running");
  noButton.style.left = `${nextLeft}px`;
  noButton.style.top = `${nextTop}px`;

  if (!hasTwerked) {
    noButton.classList.add("is-twerking");
    hasTwerked = true;
    window.setTimeout(() => noButton.classList.remove("is-twerking"), 520);
  }
}

yesButton.addEventListener("click", () => {
  if (recordResponse("Oui")) showCelebration();
});

noButton.addEventListener("click", () => recordResponse("Non"));
noButton.addEventListener("pointerenter", (event) => {
  if (event.pointerType !== "touch") moveNoButton();
});
