export default function mediaFactory(data) {
  const { date, id, image, likes, photographerId, price, title } = data;

  const picture = `assets/images/${image}`;
  function getMediaCardDOM() {
    const article = document.createElement("article");
    const div = document.createElement("div");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${title}`);
    img.setAttribute("tabindex", 0);
    img.setAttribute("class", "media");

    const titleMedia = document.createElement("p");
    titleMedia.textContent = title;
    titleMedia.setAttribute("tabindex", 0);

    const likesMedia = document.createElement("p");
    likesMedia.textContent = likes;
    likesMedia.setAttribute("tabindex", 0);

    article.appendChild(img);
    article.appendChild(div);
    div.appendChild(titleMedia);
    div.appendChild(likesMedia);
    return article;
  }
  return {
    date,
    id,
    image,
    likes,
    photographerId,
    price,
    title,
    getMediaCardDOM,
  };
}
