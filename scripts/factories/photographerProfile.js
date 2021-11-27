function profileFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const div = document.querySelector(".photograph-header");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", " ");

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const pLocation = document.createElement("p");
    pLocation.textContent = `${city},${country}`;

    const pTagline = document.createElement("p");
    pTagline.textContent = `${tagline}`;

    div.appendChild(img);
    article.appendChild(h1);
    article.appendChild(pLocation);
    article.appendChild(pTagline);
    return article;
  }
  return { name, picture, city, country, tagline, price, id, getUserCardDOM };
}
