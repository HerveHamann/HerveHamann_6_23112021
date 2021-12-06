import mediaFactory from "../factories/photographerMedia.js";
import profileFactory from "../factories/photographerProfile.js";

async function getPhotographers() {
  let photographers = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      photographers = data.photographers;
    });
  return {
    photographers,
  };
}

async function getMedias() {
  let media = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => {
      media = data.media;
    });

  return {
    media,
  };
}

async function displayData(photographers) {
  const photographersHeader = document.querySelector(".photograph-header");
  // Récupération de l'id dansl'URL
  const PageQueryString = window.location.search;
  const urlParams = new URLSearchParams(PageQueryString);
  const idPage = urlParams.get("id");
  // Transformation id = string en id =number pour faire la comparaison
  const idPageParse = JSON.parse(idPage);

  // Récupération du tableau correspondant à l'id
  const profile = photographers.find((element) => element.id === idPageParse);

  const photographersProfile = profileFactory(profile);
  const userCardDOM = photographersProfile.getUserCardDOM();
  photographersHeader.appendChild(userCardDOM);
}

async function displayMedia(media) {
  const mediaSection = document.querySelector(".photograph-media");

  const PageQueryString = window.location.search;
  const urlParams = new URLSearchParams(PageQueryString);
  const idPage = urlParams.get("id");
  // Transformation id = string en id =number pour faire la comparaison
  const idPageParse = JSON.parse(idPage);

  // Récupération des tableaux correspondant à l'id
  const mediaBoxes = media.filter(
    (element) => element.photographerId === idPageParse
  );

  mediaBoxes.forEach((mediaBoxe) => {
    const mediaBox = mediaFactory(mediaBoxe);
    const mediaCardDOM = mediaBox.getMediaCardDOM();

    mediaSection.appendChild(mediaCardDOM);
  });

  const likesNumber = document.querySelectorAll(".legend-likes");

  const likes1 = parseInt(likesNumber[0].innerHTML, 10);
  const likes2 = parseInt(likesNumber[1].innerHTML, 10);
  const likes3 = parseInt(likesNumber[2].innerHTML, 10);
  const likes4 = parseInt(likesNumber[3].innerHTML, 10);
  const likes5 = parseInt(likesNumber[4].innerHTML, 10);
  const likes6 = parseInt(likesNumber[5].innerHTML, 10);
  const likes7 = parseInt(likesNumber[6].innerHTML, 10);
  const likes8 = parseInt(likesNumber[7].innerHTML, 10);
  const likes9 = parseInt(likesNumber[8].innerHTML, 10);
  const likes10 = parseInt(likesNumber[9].innerHTML, 10);

  let totalLikes =
    likes1 +
    likes2 +
    likes3 +
    likes4 +
    likes5 +
    likes6 +
    likes7 +
    likes8 +
    likes9 +
    likes10;

  // Ajout du total et du coeur à la barre fixe
  const fixedBar = document.querySelector(".fixed-bar");
  const totalLikesBarr = document.createElement("p");
  totalLikesBarr.textContent = `${totalLikes}`;
  totalLikesBarr.setAttribute("class", "total-likes");
  fixedBar.appendChild(totalLikesBarr);
  fixedBar.setAttribute("tabindex", 0);
  const heart = document.createElement("p");
  heart.innerHTML = `<i class="fas fa-heart"></i>`;
  fixedBar.appendChild(heart);

  // Ajout de la fonctionnalité + likes
  const hearts = document.querySelectorAll(".legend-heart");

  hearts.forEach((element) => {
    element.addEventListener("click", () => {
      const likeCount = element.previousSibling;
      const classes = likeCount.classList;
      const result = classes.toggle("hearts");
      if (result) {
        let number = parseInt(likeCount.textContent, 10);
        likeCount.textContent = `${(number += 1)}`;
        totalLikesBarr.textContent = `${(totalLikes += 1)}`;
      } else {
        let number = parseInt(likeCount.textContent, 10);
        likeCount.textContent = `${(number -= 1)}`;
        totalLikesBarr.textContent = `${(totalLikes -= 1)}`;
      }
    });
  });

  // Voir map() , voir sort()
  const popularity = document.getElementById("choice-popularity");
  popularity.addEventListener("click", () => {
    async function switchMedia() {
      mediaBoxes.sort((a, b) => a.likes - b.likes);

      mediaBoxes.forEach((mediaboxe) => {
        console.log(mediaboxe.likes);
      });
    }
    switchMedia();
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);

  const { media } = await getMedias();
  displayMedia(media);
}

init();
