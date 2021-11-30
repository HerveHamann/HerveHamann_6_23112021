export default function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", `./photographer.html?id=${id}`);
    link.setAttribute("aria-label", name);

    const articleDescription = document.createElement("article");
    articleDescription.setAttribute("tabindex", "0");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", " ");

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const pLocation = document.createElement("p");
    pLocation.textContent = `${city},${country}`;

    const pTagline = document.createElement("p");
    pTagline.textContent = `${tagline}`;

    const pPrice = document.createElement("p");
    pPrice.textContent = `${price}€/jours`;

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(articleDescription);
    articleDescription.appendChild(pLocation);
    articleDescription.appendChild(pTagline);
    articleDescription.appendChild(pPrice);
    return article;
  }
  return { name, picture, city, country, tagline, price, id, getUserCardDOM };
}
