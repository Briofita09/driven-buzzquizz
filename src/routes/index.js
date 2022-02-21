const routes = [
  ["", null, "home", () => {}],
  ["quizz", "true", "quizz", () => window.dispatchEvent(new Event("loadQuizz"))],
];

window.onload = controlRoute;

window.addEventListener("locationchange", () => {
  controlRoute();
});

window.onpopstate = () => {
  controlRoute();
};

function controlRoute() {
  let routeFound = null;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  for (let route of routes) {
    if (params[route[0]] !== route[1]) continue;

    routeFound = route[2];
    route[3]();
    break;
  }

  const pages = document.querySelectorAll(`.de-page`);
  pages.forEach((page) => {
    page.classList.add("de-hide");
  });

  if (!routeFound) {
    goToHome();
    return;
  }

  const page = document.querySelector(`.de-page[data-page='${routeFound}']`);
  page.classList.remove("de-hide");
}

function goToHome() {
  window.history.pushState({}, document.title, window.location.pathname);

  const homePage = document.querySelector(`.de-page[data-page='home']`);
  homePage.classList.remove("de-hide");
  routes[0][3]();
}

function goToQuizz(quizzId) {
  window.history.pushState({}, document.title, `${window.location.pathname}?quizz=true&q=${quizzId}`);
  window.dispatchEvent(new Event("locationchange"));
}

function goToQuizzForm() {
  let;
}
