async function getPhotographers() {
  let photographers = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    // eslint-disable-next-line no-return-assign
    .then((data) => (photographers = data.photographers));

  return {
    photographers,
  };
}
getPhotographers();

async function getMedias() {
  let media = [];

  await fetch("./data/photographers.json")
    .then((res) => res.json())
    // eslint-disable-next-line no-return-assign
    .then((data) => (media = data.media));

  return {
    media,
  };
}
getMedias();

async function displayData(photographers) {
  // Récupération de l'id dansl'URL
  const photographersHeader = document.querySelector(".photograph-header");
  const PageQueryString = window.location.search;
  const urlParams = new URLSearchParams(PageQueryString);
  const idPage = urlParams.get("id");

  // Récupération du tableau correspondant à l'id
  const profile = photographers.find((element) => element.id == idPage);

  const photographersProfile = profileFactory(profile);
  const userCardDOM = photographersProfile.getUserCardDOM();
  photographersHeader.appendChild(userCardDOM);
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
