// Remplace les trois visuels de l’accueil : anime, BTS et scène K-pop.
const HOME_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=85",
    alt: "Illustration dans une ambiance anime",
    caption: "Univers anime",
  },
  {
    src: "https://www.geekjunior.fr/wp-content/uploads/2019/01/screenx.jpg",
    alt: "BTS en concert, image de l’expérience ScreenX au cinéma",
    caption: "BTS en concert",
  },
  {
    src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85",
    alt: "Scène de concert illuminée, ambiance K-pop",
    caption: "K-pop",
  },
];

document.querySelectorAll("[data-gallery]").forEach((image) => {
  const entry = HOME_GALLERY[Number(image.dataset.gallery)];
  if (!entry) return;

  image.hidden = false;
  image.src = entry.src;
  image.alt = entry.alt;
  const caption = image.closest("figure")?.querySelector("figcaption");
  if (caption) caption.textContent = entry.caption;
});
