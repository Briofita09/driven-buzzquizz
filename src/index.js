function getServerQuizzes() {
  const response = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
  response.then(renderQuizzes);
  response.catch(error);
}

function error(err) {
  console.log(err);
}

function renderQuizzes(response) {
  console.log(response.data);
  let serverQuizzes = document.querySelector(".de-quizz__container");
  console.log(serverQuizzes);
  response.data.map((quizz) => {
    serverQuizzes.innerHTML += `
        <div class='de-quizz de-quizz-${quizz.id}'>
            <img class='de-quizz-image' src=${quizz.image}/>
            <p class='de-quizz-title'>${quizz.title}</p>
        </div>
      `;
  });
}

getServerQuizzes();

function goToCreateQuizz() {
  let;
}
