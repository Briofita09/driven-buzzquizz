function getQuizzes() {
  axios
    .get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then(renderQuizzes)
    .catch(renederQuizzesError);
}

function renderQuizzes(response) {
  console.log({ renderQuizzes: response.data });
  let quizzesContainer = document.querySelector(".de-quizz__container");

  response.data.map(
    (quizz) =>
      (quizzesContainer.innerHTML += `
        <div class='de-quizz__element de-quizz__element--${quizz.id}'>
            <img class='de-quizz__element-image' src=${quizz.image} alt=${quizz.title}/>
            <p class='de-quizz__element-title'>${quizz.title}</p>
        </div>
      `)
  );
}

function renederQuizzesError(err) {
  console.log(err);
}

getQuizzes();

function goToCreateQuizz() {
  let;
}
