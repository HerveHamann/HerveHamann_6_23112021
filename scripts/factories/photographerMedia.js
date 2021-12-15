export default function mediaFactory(data) {
  const { date, id, image, likes, photographerId, price, title, video } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");

    article.setAttribute("id", id);

    const div = document.createElement("div");
    div.setAttribute("class", "legend");
    if (image) {
      const picture = `./assets/images/${image}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", `${title},closeup view`);
      img.setAttribute("tabindex", 0);
      img.setAttribute("class", "media");
      img.dataset.id = id;

      article.appendChild(img);

      const titleMedia = document.createElement("p");
      titleMedia.textContent = title;
      titleMedia.setAttribute("tabindex", 0);
      titleMedia.setAttribute("class", "legend-title");
      div.appendChild(titleMedia);
    }
    if (video) {
      const movie = `assets/movies/${video}`;
      const videoContent = document.createElement("video");
      videoContent.setAttribute("src", movie);
      videoContent.setAttribute("tabindex", 0);
      videoContent.setAttribute("class", "media");
      videoContent.setAttribute(
        "aria-label",
        video.replace(/_/g, " ").replace(".mp4", " ")
      );
      videoContent.dataset.id = id;
      article.appendChild(videoContent);

      const titleMovie = document.createElement("p");
      titleMovie.setAttribute("tabindex", 0);

      titleMovie.textContent = video.replace(/_/g, " ").replace(".mp4", " ");
      titleMovie.setAttribute("class", "legend-title");
      div.appendChild(titleMovie);

      const posterTitle = video.replace(".mp4", ".jpg ");
      const poster = `assets/poster/${posterTitle}`;
      videoContent.setAttribute("poster", poster);
    }

    const likesMedia = document.createElement("p");
    likesMedia.textContent = likes;
    likesMedia.setAttribute("tabindex", 0);
    likesMedia.setAttribute("class", "legend-likes");

    const heart = document.createElement("p");
    heart.innerHTML = `<i class="fas fa-heart"></i>`;
    heart.setAttribute("class", "legend-heart");
    heart.setAttribute("tabindex", 0);
    heart.setAttribute("aria-label", ` likes`);
    article.appendChild(div);
    div.appendChild(likesMedia);
    div.appendChild(heart);

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
    video,
    getMediaCardDOM,
  };
}
