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
  const modalIntro = document.getElementById("contact-me");
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
  // Fonction de tri

  const selected = document.getElementById("selected-choice");
  const popularity = document.getElementById("choice-popularity");
  const date = document.getElementById("choice-date");
  const title = document.getElementById("choice-title");

  // Navigation dans la list box,
  const dropdownMenu = document.querySelector("#dropdown-ul");
  const dropdownLink = document.querySelector("#dropdown-menu");
  const arrow = document.querySelector("#dropdown-arrow");

  function toggleNavbar() {
    if (
      !dropdownMenu.getAttribute("style") ||
      dropdownMenu.getAttribute("style") === "display: none;"
    ) {
      dropdownMenu.style.display = "block";
      dropdownLink.setAttribute("aria-expanded", "true");
      arrow.classList.add("arrow-move");
    } else {
      dropdownMenu.style.display = "none";
      dropdownLink.setAttribute("aria-expanded", "false");
      dropdownLink.focus();
      arrow.classList.remove("arrow-move");
    }
  }

  dropdownLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggleNavbar();
  });

  // Choix de tri caché dans la light box
  const selectedChoiceHidden = () => {
    if (selected.innerHTML === popularity.innerHTML) {
      popularity.classList.remove("dropdown-menu-li");
      popularity.innerHTML = "";
      popularity.removeAttribute("tabindex", "0");
    } else {
      popularity.innerHTML = "Popularité";
      popularity.classList.add("dropdown-menu-li");
      popularity.setAttribute("tabindex", "0");
    }
    if (selected.innerHTML === date.innerHTML) {
      date.classList.remove("dropdown-menu-li");
      date.innerHTML = "";
      date.removeAttribute("tabindex", "0");
    } else {
      date.innerHTML = "Date";
      date.classList.add("dropdown-menu-li");
      date.setAttribute("tabindex", "0");
    }
    if (selected.innerHTML === title.innerHTML) {
      title.classList.remove("dropdown-menu-li");
      title.innerHTML = "";
      title.removeAttribute("tabindex", "0");
    } else {
      title.innerHTML = "Titre";
      title.classList.add("dropdown-menu-li");
      title.setAttribute("tabindex", "0");
    }
  };

  // Popularity tri

  function sortByLike() {
    selected.innerHTML = "Popularité";
    selectedChoiceHidden();
    mediaBoxes.sort((a, b) => b.likes - a.likes);
    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }
  popularity.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sortByLike();
    }
  });

  popularity.addEventListener("click", () => {
    sortByLike();
  });
  // Date tri

  function sortByDate() {
    selected.innerHTML = "Date";
    selectedChoiceHidden();
    mediaBoxes.sort((a, b) => new Date(b.date) - new Date(a.date));
    mediaBoxes.forEach((mediaBoxe) => {
      const mediaCard = document.getElementById(mediaBoxe.id);

      mediaSection.appendChild(mediaCard);
    });
  }

  date.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sortByDate();
    }
  });
  date.addEventListener("click", () => {
    sortByDate();
  });

  // Title tri
  function sortByTitle() {
    selected.innerHTML = "Titre";

    selectedChoiceHidden();
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

  title.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sortByTitle();
    }
  });
  title.addEventListener("click", () => {
    sortByTitle();
  });

  // Création et affichage des images

  mediaBoxes.forEach((mediaBoxe) => {
    const mediaBox = mediaFactory(mediaBoxe);
    const mediaCardDOM = mediaBox.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });

  // Set up tri par like par défaut
  sortByLike();
  selectedChoiceHidden();
  // ouvrir la lightbox et faire apparaitre le media correspondant
  const lightBox = document.querySelector("#lightbox");

  const lightBoxLink = document.querySelectorAll(".media");
  const lightBoxMediaContenair = document.querySelector("#lightbox-container");

  const lightBoxTitle = document.querySelector("#lightbox-container-title");

  const prevArrow = document.getElementById("lightbox-prev");
  const nextArrow = document.getElementById("lightbox-next");

  // Création des nouveaux éléments (titres, images, vidéo) à partir du tableau lors de la
  // navigation fléchée

  // Element précédent
  const Previous = () => {
    let mediaLightBox = document.querySelector(
      ".lightbox-container"
    ).firstChild;

    const result = mediaBoxes.find(
      (element) => element.id === parseInt(mediaLightBox.dataset.id, 10)
    );

    let i = mediaBoxes.indexOf(result);

    if (i === 0) {
      i = mediaBoxes.length;
    }
    const nextMedia = mediaBoxes[i - 1];

    if (nextMedia.image) {
      const newDisplayImage = nextMedia.image;
      const picture = `./assets/images/${newDisplayImage}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", nextMedia.title);
      img.dataset.id = mediaBoxes[i - 1].id;

      lightBoxMediaContenair.innerHTML = "";
      lightBoxMediaContenair.appendChild(img);
      lightBoxTitle.textContent = nextMedia.title;
    }
    if (nextMedia.video) {
      const newDisplayVideo = nextMedia.video;
      const movie = `./assets/movies/${newDisplayVideo}`;
      const videoDisplay = document.createElement("video");
      videoDisplay.setAttribute("src", movie);
      videoDisplay.setAttribute("controls", "");
      videoDisplay.setAttribute(
        "aria-label",
        nextMedia.video.replace(/_/g, " ").replace(".mp4", " ")
      );
      videoDisplay.dataset.id = mediaBoxes[i - 1].id;

      lightBoxMediaContenair.innerHTML = "";
      lightBoxMediaContenair.appendChild(videoDisplay);
      lightBoxTitle.textContent = nextMedia.video
        .replace(/_/g, " ")
        .replace(".mp4", " ");
    }

    mediaLightBox = document.querySelector(".lightbox-container").firstChild;
  };
  // Element suivant
  const Next = () => {
    let mediaLightBox = document.querySelector(
      ".lightbox-container"
    ).firstChild;

    const result = mediaBoxes.find(
      (element) => element.id === parseInt(mediaLightBox.dataset.id, 10)
    );

    let i = mediaBoxes.indexOf(result);

    if (i === mediaBoxes.length - 1) {
      i = -1;
    }
    const nextMedia = mediaBoxes[i + 1];

    if (nextMedia.image) {
      const newDisplayImage = nextMedia.image;
      const picture = `./assets/images/${newDisplayImage}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", nextMedia.title);
      img.dataset.id = mediaBoxes[i + 1].id;

      lightBoxMediaContenair.innerHTML = "";
      lightBoxMediaContenair.appendChild(img);
      lightBoxTitle.textContent = nextMedia.title;
    }
    if (nextMedia.video) {
      const newDisplayVideo = nextMedia.video;
      const movie = `./assets/movies/${newDisplayVideo}`;
      const videoDisplay = document.createElement("video");
      videoDisplay.setAttribute("src", movie);
      videoDisplay.setAttribute("controls", "");
      videoDisplay.setAttribute(
        "aria-label",
        nextMedia.video.replace(/_/g, " ").replace(".mp4", " ")
      );
      videoDisplay.dataset.id = mediaBoxes[i + 1].id;

      lightBoxMediaContenair.innerHTML = "";
      lightBoxMediaContenair.appendChild(videoDisplay);
      lightBoxTitle.textContent = nextMedia.video
        .replace(/_/g, " ")
        .replace(".mp4", " ");
    }

    mediaLightBox = document.querySelector(".lightbox-container").firstChild;
  };
  // Evenements
  lightBox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      Next();
    }
  });

  lightBox.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      Previous();
    }
  });
  nextArrow.addEventListener("click", () => {
    Next();
  });

  prevArrow.addEventListener("click", () => {
    Previous();
  });

  // Création des éléments de la light box à partir du clic dans la galerie

  const FeedLightBox = (element) => {
    const lightBoxLinkTitle = element.nextSibling.firstChild;
    lightBoxTitle.textContent = lightBoxLinkTitle.textContent;

    const mediaLightBoxLink = element.src;
    const altTitle = element.alt;

    if (mediaLightBoxLink.includes(".jpg")) {
      const img = document.createElement("img");
      img.setAttribute("src", mediaLightBoxLink);
      img.setAttribute("alt", altTitle);
      img.dataset.id = element.dataset.id;
      lightBoxMediaContenair.appendChild(img);
    }

    if (mediaLightBoxLink.includes(".mp4")) {
      const video = document.createElement("video");
      video.setAttribute("src", mediaLightBoxLink);
      video.setAttribute("controls", "");
      video.dataset.id = element.dataset.id;
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

  const LikeFunction = (element) => {
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
  };
  // Evenement d'ajout de like
  hearts.forEach((element) => {
    element.addEventListener("click", () => {
      LikeFunction(element);
    });
    element.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        LikeFunction(element);
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
