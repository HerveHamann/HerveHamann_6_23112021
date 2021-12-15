const modal = document.getElementById("contact_modal");
const modalOutro = document.getElementById("header");
const closeCross = document.getElementById("close-cross");

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  modal.style.display = "none";
  modalOutro.focus();
}
closeCross.addEventListener("click", () => {
  closeModal();
});

modal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
closeCross.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    closeModal();
  }
});

const submit = document.getElementById("contact_modal");
const inputs = document.querySelectorAll(".text-control");

let first;
let last;
let email;
let yourMessage;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector(`#${tag}`);
  const span = document.querySelector(`#${tag} +span`);
  if (!valid) {
    container.classList.add("error");
    span.classList.add("error-message");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const firstChecker = (value) => {
  if (value.length > 0 && value.length < 2) {
    errorDisplay(
      "first",
      "Veuillez entrer 2 caractères ou plus pour le prénom."
    );
    first = null;
  } else if (
    !value.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
  ) {
    errorDisplay("first", "Le prénom doit contenir des lettres uniquement.");
    first = null;
  } else {
    errorDisplay("first", "", true);
    first = value;
  }
};

const lastChecker = (value) => {
  if (value.length > 0 && value.length < 2) {
    errorDisplay("last", "Veuillez entrer 2 caractères ou plus pour le nom.");
    last = null;
  } else if (
    !value.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
  ) {
    errorDisplay("last", "Le nom doit contenir des lettres uniquement.");
    last = null;
  } else {
    errorDisplay("last", "", true);
    last = value;
  }
};

const emailChecker = (value) => {
  if (
    !value.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    errorDisplay("email", "Le Mail n'est pas valide.");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const yourMessageChecker = (value) => {
  if (value.length > 0 && value.length < 2) {
    errorDisplay(
      "message",
      "Veuillez entrer 2 caractères ou plus pour votre message."
    );
    yourMessage = null;
  } else if (
    !value.match(
      /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð !?,.'-]+$/u
    )
  ) {
    errorDisplay(
      "message",
      "Le message ne doit pas contenir de caractères spéciaux."
    );
    yourMessage = null;
  } else {
    errorDisplay("message", "", true);
    yourMessage = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        firstChecker(e.target.value);
        break;
      case "last":
        lastChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "message":
        yourMessageChecker(e.target.value);
        break;
      default:
    }
  });
});

submit.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!first) {
    errorDisplay("first", "Veuillez completer ce champ.");
  }
  if (!last) {
    errorDisplay("last", "Veuillez completer ce champ.");
  }
  if (!email) {
    errorDisplay("email", "Veuillez completer ce champ.");
  }
  if (!yourMessage) {
    errorDisplay("message", "Veuillez completer ce champ.");
  }

  if (first && last && email && yourMessage) {
    const dataUser = {
      first,
      last,
      email,
      yourMessage,
    };
    // eslint-disable-next-line no-console
    console.log(dataUser);
    first = null;
    last = null;
    email = null;
    yourMessage = null;
    inputs.forEach((input) => {
      // Exception ici, car on veut justement reset input (donc "reassign du vide")
      // eslint-disable-next-line no-param-reassign
      input.value = "";
    });
    closeModal();
  }
});
