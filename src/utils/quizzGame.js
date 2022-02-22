let quizz = null;
let totalQuestions = 0;
let totalQuestionsAnswered = 0;
let correctAnswers = 0;

function initQuizz(data) {
  quizz = data;
  totalQuestions = quizz.questions.length;
  totalQuestionsAnswered = 0;
  correctAnswers = 0;
}

function selectAnswer(answerEl) {
  const questionEl = answerEl.parentNode.parentNode;

  if (questionEl.dataset.answered === 'true') return;

  checkAnswers(answerEl, questionEl);

  checkQuizzIsFinished();

  scrollToNextQuizzElement(questionEl);
}

function checkAnswers(answerEl, questionEl) {
  const questionAnswersEl = questionEl.querySelectorAll('.de-quizz-answer');

  if (answerEl.dataset.answer === 'true') correctAnswers++;

  questionEl.dataset.answered = 'true';
  totalQuestionsAnswered++;

  for (let answer of questionAnswersEl) {
    answer.removeAttribute('onclick');
    answer.classList.add(`de-quizz-answer--${answer.dataset.answer === 'true' ? 'correct' : 'incorrect'}`);

    if (answer === answerEl) continue;

    answer.classList.add('de-quizz-answer--unselected');
  }
}

function checkQuizzIsFinished() {
  if (totalQuestionsAnswered !== totalQuestions) return;

  const quizzQuestions = document.querySelector(".de-quizz-page__questions");
  const actualPercentage = Math.round((correctAnswers / totalQuestions) * 100);
  let levelAchievied = quizz.levels.find(level => parseInt(level.minValue) === 0);

  for (let level of quizz.levels) {
    if (
      actualPercentage < parseInt(level.minValue) ||
      parseInt(levelAchievied.minValue) > parseInt(level.minValue)
    ) continue;

    levelAchievied = level;
  }

  quizzQuestions.innerHTML += `
    <div class="de-quizz-result">
      <div class="de-quizz-result-title">
        ${actualPercentage}% de acerto: ${levelAchievied.title}
      </div>
      <div class="de-quizz-result-content">
        <img src="${levelAchievied.image}" alt="${levelAchievied.title}" class="de-quizz-result-image">
        <div class="de-quizz-result-text">
          ${levelAchievied.text}
        </div>
      </div>
    </div>
    <div>
      <button class="de-quizz-page__button" onclick="loadQuizz()">
          Reiniciar Quizz
      </button>
      <button class="de-quizz-page__button de-quizz-page__button--plained" onclick="goToHome()">
          Voltar pra home
      </button>
    </div>
  `;
}

function scrollToNextQuizzElement(questionEl) {
  const nextQuestionEl = questionEl.nextElementSibling;

  if (nextQuestionEl) {
    nextQuestionEl.scrollIntoView({behavior: 'smooth'});
  }

  if (totalQuestionsAnswered !== totalQuestions) return;

  const quizzContainer = document.querySelector(".de-quizz-page__questions");
  quizzContainer.lastElementChild.scrollIntoView({behavior: 'smooth'});
}
