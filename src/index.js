function getQuizzes() {
  axios
    .get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then(renderQuizzes)
    .catch(renderQuizzesError);
}

function renderQuizzes(response) {
  let quizzesContainer = document.querySelector(".de-quizz__container");

  response.data.map(
    (quizz) =>
      (quizzesContainer.innerHTML += `
        <div 
          class='de-quizz__element'
          data-quizz='${quizz.id}'
          onclick="goToQuizz(${quizz.id})"
        >
            <img class='de-quizz__element-image' src=${quizz.image} alt="${quizz.title.replace(" ", "-")}"/>
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
  const quizzBanner = document.querySelector(".de-quizz-page__banner");

  quizzBanner.innerText = response.data.title;
  quizzBanner.style.background = `url(${response.data.image}) center no-repeat`;

  const quizzQuestions = document.querySelector(".de-quizz-page__questions");

  quizzQuestions.innerHTML = "";

  quizzBanner.scrollIntoView({
    behavior: "smooth",
  });

  response.data.questions.map((question, questionIndex) => {
    quizzQuestions.innerHTML += `
      <div class='de-quizz-question' data-question="${questionIndex}" data-answered="false">
        <p class='de-quizz-question__title' style="background: ${question.color}">${question.title}</p>
        <div class='de-quizz-answers'></div>
      </div>
    `;

    const questionAnswers = document.querySelector(
      `.de-quizz-question[data-question="${questionIndex}"] .de-quizz-answers`
    );

    question.answers.sort(() => Math.random() - 0.5).map((answer) => {
      questionAnswers.innerHTML += `
        <div class='de-quizz-answer' data-answer="${answer.isCorrectAnswer}" onclick="selectAnswer(this)">
          <img class='de-quizz-answer__image' src=${answer.image} alt="${answer.text.replace(" ", "-")}"/>
          <p class='de-quizz-answer__title'>${answer.text}</p>
        </div>
      `;
    });
  });

  initQuizz(response.data);
}

function renderQuizzError(err) {
  console.log(err);
  goToHome();
}

window.addEventListener("loadQuizz", () => loadQuizz());
