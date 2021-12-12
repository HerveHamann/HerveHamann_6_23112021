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
  // Ouverture de la modale
  const modal = document.getElementById("contact_modal");
  const modalIntro = document.getElementById("contact me");
  const contactButton = document.getElementById("contact_button");

  contactButton.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";
    modalIntro.focus();
  });
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
  // Création et affichage des images
  mediaBoxes.sort((a, b) => b.likes - a.likes);
  mediaBoxes.forEach((mediaBoxe) => {
    const mediaBox = mediaFactory(mediaBoxe);
    const mediaCardDOM = mediaBox.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });

  // ouvrir la lightbox et faire apparaitre le media correspondant
  const lightBoxLink = document.querySelectorAll(".media");
  const lightBoxMediaContenair = document.querySelector("#lightbox-container");

  const lightBoxTitle = document.querySelector("#lightbox-container-title");

  const prevArrow = document.getElementById("lightbox-prev");
  const nextArrow = document.getElementById("lightbox-next");

  prevArrow.addEventListener("click", () => {});
  nextArrow.addEventListener("click", () => {});

  // const NextMedia = (element) => {
  //   const lightBoxNextMedia = element.parentElement.nextSibling.firstChild.src;
  //   const newlightBoxLink = element.parentElement.nextSibling.firstChild;
  //   console.log(lightBoxNextMedia);
  //   console.log(newlightBoxLink);
  //   const img = document.createElement("img");
  //   img.setAttribute("src", lightBoxNextMedia);
  //   img.setAttribute("id", "image-lightbox");
  //   lightBoxMediaContenair.innerHTML = "";
  //   lightBoxMediaContenair.appendChild(img);
  // };

  //   NextMedia(element);
  nextArrow.addEventListener("click", () => {
    let imageLightbox = document.querySelector(".lightbox-container >img");
    console.log(imageLightbox);
    console.log(parseInt(imageLightbox.dataset.id, 10));
    const result = mediaBoxes.find(
      (element) => element.id === parseInt(imageLightbox.dataset.id, 10)
    );
    console.log(result);
    console.log(mediaBoxes.indexOf(result));

    const i = mediaBoxes.indexOf(result);
    const nextImage = mediaBoxes[i + 1];
    console.log(nextImage.image);

    const a = nextImage.image;
    const picture = `./assets/images/${a}`;
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.dataset.id = mediaBoxes[i + 1].id;
    lightBoxMediaContenair.innerHTML = "";
    lightBoxMediaContenair.appendChild(img);
    imageLightbox = document.querySelector(".lightbox-container >img");
    console.log(imageLightbox);
  });

  const FeedLightBox = (element) => {
    const lightBoxLinkTitle = element.nextSibling.firstChild;
    lightBoxTitle.textContent = lightBoxLinkTitle.textContent;

    const lightBox = document.getElementById("lightbox");
    const mediaLightBoxLink = element.src;

    if (mediaLightBoxLink.includes(".jpg")) {
      const img = document.createElement("img");
      img.setAttribute("src", mediaLightBoxLink);
      img.dataset.id = element.dataset.id;
      lightBoxMediaContenair.appendChild(img);
    }

    if (mediaLightBoxLink.includes(".mp4")) {
      const video = document.createElement("video");
      video.setAttribute("src", mediaLightBoxLink);
      video.setAttribute("controls", "");
      lightBoxMediaContenair.appendChild(video);
    }
    lightBox.setAttribute("aria-hidden", "false");
    lightBox.style.visibility = "visible";
    lightBox.focus();
  };

  lightBoxLink.forEach((element) => {
    element.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        FeedLightBox(element);
      }
    });
    element.addEventListener("click", () => {
      FeedLightBox(element);
    });
  });

  // nombre de coeur total
  let totalLikes = 0;
  mediaBoxes.map((element) => {
    totalLikes += element.likes;
    return totalLikes;
  });

  // Ajout du total et du coeur à la barre fixe
  const fixedBar = document.querySelector(".fixed-bar");
  const totalLikesBarr = document.createElement("p");
  totalLikesBarr.textContent = `${totalLikes}`;
  totalLikesBarr.setAttribute("class", "total-likes");
  totalLikesBarr.setAttribute("aria-label", `${totalLikes} likes`);
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
        const elementLikes = element;
        elementLikes.style.color = "#db8876";
      } else {
        let number = parseInt(likeCount.textContent, 10);
        likeCount.textContent = `${(number -= 1)}`;
        totalLikesBarr.textContent = `${(totalLikes -= 1)}`;
        const elementLikes = element;
        elementLikes.style.color = "#901c1c";
      }
    });
    element.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const likeCount = element.previousSibling;
        const classes = likeCount.classList;
        const result = classes.toggle("hearts");
        if (result) {
          let number = parseInt(likeCount.textContent, 10);
          likeCount.textContent = `${(number += 1)}`;
          totalLikesBarr.textContent = `${(totalLikes += 1)}`;
          const elementLikes = element;
          elementLikes.style.color = "#db8876";
        } else {
          let number = parseInt(likeCount.textContent, 10);
          likeCount.textContent = `${(number -= 1)}`;
          totalLikesBarr.textContent = `${(totalLikes -= 1)}`;
          const elementLikes = element;
          elementLikes.style.color = "#901c1c";
        }
      }
    });
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

// Fonction de tri

const selected = document.getElementById("selected-choice");
const popularity = document.getElementById("choice-popularity");
const date = document.getElementById("choice-date");
const title = document.getElementById("choice-title");

const selectedChoiceHidden = () => {
  if (selected.innerHTML === popularity.innerHTML) {
    popularity.classList.remove("dropdown-menu-li");
    popularity.innerHTML = "";
  } else {
    popularity.innerHTML = "Popularité";
    popularity.classList.add("dropdown-menu-li");
  }
  if (selected.innerHTML === date.innerHTML) {
    date.classList.remove("dropdown-menu-li");
    date.innerHTML = "";
  } else {
    date.innerHTML = "Date";
    date.classList.add("dropdown-menu-li");
  }
  if (selected.innerHTML === title.innerHTML) {
    title.classList.remove("dropdown-menu-li");
    title.innerHTML = "";
  } else {
    title.innerHTML = "Titre";
    title.classList.add("dropdown-menu-li");
  }
};

selectedChoiceHidden();

popularity.addEventListener("click", async () => {
  selected.innerHTML = "Popularité";
  selectedChoiceHidden();
  async function sortByLike() {
    let media = [];

    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => {
        media = data.media;
      });

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
    mediaBoxes.sort((a, b) => b.likes - a.likes);
    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  sortByLike();
});

date.addEventListener("click", async () => {
  selected.innerHTML = "Date";
  selectedChoiceHidden();

  async function sortByDate() {
    let media = [];

    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => {
        media = data.media;
      });

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

    mediaBoxes.sort((a, b) => new Date(b.date) - new Date(a.date));
    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  sortByDate();
});

title.addEventListener("click", async () => {
  selected.innerHTML = "Titre";
  selectedChoiceHidden();

  async function sortByTitle() {
    let media = [];

    await fetch("./data/photographers.json")
      .then((res) => res.json())
      .then((data) => {
        media = data.media;
      });

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

    function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
    mediaBoxes.sort(compare);

    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  sortByTitle();
});
