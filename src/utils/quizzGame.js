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
  const questionAnswersEl = questionEl.querySelectorAll('.de-quizz-page__question-answer');

  if (answerEl.dataset.answer === 'true') correctAnswers++;

  questionEl.dataset.answered = 'true';
  totalQuestionsAnswered++;

  for (let answer of questionAnswersEl) {
    answer.removeAttribute('onclick');
    answer.classList.add(`de-quizz-page__question-answer--${answer.dataset.answer === 'true' ? 'correct' : 'incorrect'}`);

    if (answer === answerEl) continue;

    answer.classList.add('de-quizz-page__question-answer--unselected');
  }
}

function checkQuizzIsFinished() {
  if (totalQuestionsAnswered !== totalQuestions) return;

  const quizzQuestions = document.querySelector(".de-quizz-page__questions");
  const correctPercentage = Math.round((correctAnswers / totalQuestions) * 100);
  let levelAchievied = quizz.levels[0];

  for (let level of quizz.levels) {
    if (correctPercentage < parseInt(level.minValue)) continue;

    levelAchievied = level;
  }

  quizzQuestions.innerHTML += `
    <div class="de-quizz-page__result">
      <div class="de-quizz-page__result-title">
        ${levelAchievied.title}
      </div>
      <div class="de-quizz-page__result-content">
        <img src="${levelAchievied.image}" alt="${levelAchievied.title}" class="de-quizz-page__result-image">
        <div class="de-quizz-page__result-text">
          ${levelAchievied.text}
        </div>
      </div>
    </div>
    <button class="de-quizz-page__button" onclick="loadQuizz()">
        Reiniciar Quizz
    </button>
    <button class="de-quizz-page__button de-quizz-page__button--plained" onclick="goToHome()">
        Voltar pra home
    </button>
  `;
}

function scrollToNextQuizzElement(questionEl) {
  const nextQuestionEl = questionEl.nextElementSibling;

  if (nextQuestionEl) {
    nextQuestionEl.scrollIntoView({ behavior: 'smooth' });
  }

  if (totalQuestionsAnswered !== totalQuestions) return;

  const quizzContainer = document.querySelector(".de-quizz-page__questions");
  quizzContainer.lastElementChild.scrollIntoView({ behavior: 'smooth' });
}
