const collections = document.querySelectorAll(".gallery-category");

function getPlainText(metadata) {
  if (!metadata?.value) return "";
  const parsed = new DOMParser().parseFromString(metadata.value, "text/html");
  return parsed.body.textContent.replace(/\s+/g, " ").trim();
}

function createPhotoCard(page, imageInfo) {
  const card = document.createElement("a");
  card.className = "gallery-card";
  card.href = imageInfo.descriptionurl;
  card.target = "_blank";
  card.rel = "noopener noreferrer";

  const image = document.createElement("img");
  image.src = imageInfo.thumburl || imageInfo.url;
  image.alt = page.title.replace(/^File:/i, "");
  image.loading = "lazy";
  image.decoding = "async";

  const caption = document.createElement("figcaption");
  const artist = getPlainText(imageInfo.extmetadata?.Artist);
  const license = getPlainText(imageInfo.extmetadata?.LicenseShortName);
  const credits = [artist, license].filter(Boolean).join(" · ");
  caption.textContent = credits
    ? `${page.title.replace(/^File:/i, "")} — ${credits}`
    : `${page.title.replace(/^File:/i, "")} — Wikimedia Commons`;

  const figure = document.createElement("figure");
  figure.style.margin = "0";
  figure.append(image, caption);
  card.append(figure);
  return card;
}

async function loadCollection(collection) {
  const query = collection.dataset.query;
  const categoryFilter = collection.dataset.categoryFilter
    ? new RegExp(collection.dataset.categoryFilter, "i")
    : null;
  const status = collection.querySelector("[data-status]");
  const grid = collection.querySelector("[data-photo-grid]");
  const searchLink = collection.querySelector("[data-search-link]");
  const searchUrl = new URL("https://commons.wikimedia.org/wiki/Special:MediaSearch");
  searchUrl.searchParams.set("type", "image");
  searchUrl.searchParams.set("search", query);
  searchLink.href = searchUrl.href;

  const apiUrl = new URL("https://commons.wikimedia.org/w/api.php");
  const params = {
    action: "query",
    generator: "search",
    gsrsearch: query,
    gsrnamespace: "6",
    gsrlimit: "24",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "720",
    format: "json",
    origin: "*",
  };
  Object.entries(params).forEach(([key, value]) => apiUrl.searchParams.set(key, value));

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Wikimedia Commons a répondu avec le statut ${response.status}.`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(result.error.info || "La recherche Wikimedia Commons a échoué.");
    }

    const pages = Object.values(result.query?.pages || {})
      .sort((first, second) => first.index - second.index)
      .filter((page) => page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url)
      .filter((page) => /\.(?:jpe?g|png|gif|webp|tiff?|svg)$/i.test(page.title))
      .filter((page) => {
        const categories = page.imageinfo[0].extmetadata?.Categories?.value || "";
        return !categoryFilter || categoryFilter.test(categories);
      })
      .slice(0, 12);

    pages.forEach((page) => grid.append(createPhotoCard(page, page.imageinfo[0])));
    status.textContent = pages.length
      ? `${pages.length} image${pages.length > 1 ? "s" : ""} trouvée${pages.length > 1 ? "s" : ""} — crédits et licences sur chaque source.`
      : "Aucune photo trouvée ici pour le moment. La recherche complète reste disponible ci-dessous.";
  } catch (error) {
    status.textContent = "Les photos n’ont pas pu être chargées. Tu peux ouvrir directement la recherche Commons ci-dessous.";
    console.error(`Erreur de chargement pour « ${query} » :`, error);
  }
}

collections.forEach((collection) => loadCollection(collection));
