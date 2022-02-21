let routeFound = null;
const routes = [
  ["", "home", () => {}],
  ["quizz", "quizz", () => window.dispatchEvent(new Event("loadQuizz"))],
];

window.onload = () => controlRoute();

window.addEventListener("locationchange", () => {
  controlRoute();
});

window.onpopstate = () => {
  controlRoute();
};

function controlRoute() {
  routeFound = null;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  for (let route of routes) {
    if (params[route[0]] !== "true") continue;

    routeFound = route[1];
    route[2]();
    break;
  }

  disableAllPages();

  if (!routeFound) {
    goToHome();
    return;
  }

  const page = document.querySelector(`.de-page[data-page='${routeFound}']`);
  page.classList.remove("de-hide");
}

function disableAllPages() {
  document.querySelector("main").classList[routeFound === "quizz" ? "add" : "remove"]("de-main--full-width");

  const pages = document.querySelectorAll(`.de-page`);
  pages.forEach((page) => {
    page.classList.add("de-hide");
  });
}

function clearPages() {
  const quizzBanner = document.querySelector(".de-quizz-page__banner");
  quizzBanner.innerHTML = "";
  quizzBanner.style.background = "";

  const quizzQuestions = document.querySelector(".de-quizz-page__questions");
  quizzQuestions.innerHTML = "";
}

function goToHome() {
  routeFound = "home";
  window.history.pushState({}, document.title, window.location.pathname);

  disableAllPages();
  clearPages();

  const homePage = document.querySelector(`.de-page[data-page='home']`);
  homePage.classList.remove("de-hide");
}

function goToQuizz(quizzId) {
  window.history.pushState({}, document.title, `${window.location.pathname}?quizz=true&q=${quizzId}`);
  window.dispatchEvent(new Event("locationchange"));
}

function goToQuizzForm() {
  console.log('goToQuizzForm');
}
