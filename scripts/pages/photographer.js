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
  console.log(media);
  const PageQueryString = window.location.search;
  const urlParams = new URLSearchParams(PageQueryString);
  const idPage = urlParams.get("id");
  // Transformation id = string en id =number pour faire la comparaison
  const idPageParse = JSON.parse(idPage);

  // Récupération des tableaux correspondant à l'id
  const mediaBoxes = media.filter(
    (element) => element.photographerId === idPageParse
  );

  console.log(mediaBoxes);

  mediaBoxes.forEach((mediaBoxe) => {
    const mediaBox = mediaFactory(mediaBoxe);
    const mediaCardDOM = mediaBox.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
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
