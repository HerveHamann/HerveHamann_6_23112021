import photographerFactory from "../factories/photographer.js";

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
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
