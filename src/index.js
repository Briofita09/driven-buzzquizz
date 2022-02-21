function getQuizzes() {
  axios
    .get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then(renderQuizzes)
    .catch(renderQuizzesError);
}

function renderQuizzes(response) {
  console.log({ renderQuizzes: response.data });
  let quizzesContainer = document.querySelector(".de-quizz__container");

  response.data.map(
    (quizz) =>
      (quizzesContainer.innerHTML += `
        <div 
          class='de-quizz__element'
          data-quizz='${quizz.id}'
          onclick="goToQuizz(${quizz.id})"
        >
            <img class='de-quizz__element-image' src=${quizz.image} alt=${quizz.title}/>
            <p class='de-quizz__element-title'>${quizz.title}</p>
        </div>
      `)
  );
}

function renderQuizzesError(err) {
  console.log(err);
}

getQuizzes();

function loadQuizz() {
  const quizzId = new URLSearchParams(window.location.search).get("q");

  axios
    .get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)
    .then(renderQuizz)
    .catch(renderQuizzError);
}

function renderQuizz(response) {
  console.log(response);
}

function renderQuizzError(err) {
  console.log(err);
}

window.addEventListener("loadQuizz", () => loadQuizz());
