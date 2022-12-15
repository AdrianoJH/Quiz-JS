const question = document.querySelector('#question');
const options = Array.from(document.querySelectorAll('.option-text'));
const porgressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "O que é Vanilla JavaScript?",
        option1: "JavaScript puro",
        option2: "Uma biblioteca JavaScript",
        option3: "Um framework JavaScript",
        option4: "Um compilador de JavaScript",

        answer: 1,
    },
    {
        question: "Com qual instrução declaramos uma constante em JavaScript?",
        option1: "const",
        option2: "let",
        option3: "var",
        option4: "define",

        answer: 1,
    },
    {
        question: "Qual dos tipos de dado a seguir não existe em JavaScript?",
        option1: "string",
        option2: "number",
        option3: "boolean",
        option4: "float",

        answer: 4,
    },
    {
        question: "Qual dos métodos a seguir seleciona um elemento?",
        option1: "querySelector",
        option2: "parseInt",
        option3: "sort",
        option4: "reduce",

        answer: 1,
    },
    {
        question: "Qual destas propriedades da a quantidade de elementos de um array?",
        option1: "qty",
        option2: "length",
        option3: "items",
        option4: "index",

        answer: 2,

    },
    {
        question: "Qual tag cria um parágrafo?",
        option1: "<p>",
        option2: "<h1>",
        option3: "<text>",
        option4: "<ul>",

        answer: 1,

    },
    {
        question: "Qual atributo adiciona um link para a tag a?",
        option1: "alt",
        option2: "href",
        option3: "src",
        option4: "link",

        answer: 2,

    },
    {
        question: "As listas não ordenadas tem a tag de:",
        option1: "<ol>",
        option2: "<ul>",
        option3: "<li>",
        option4: "<list>",
        answer: 2,

    },
    {
        question: "Qual atributo deixa o input obrigatório?",
        option1: "placeholder",
        option2: "value",
        option3: "required",
        option4: "maxlength",

        answer: 3,

    },
    {
        question: "A tag semântica indicada para rodapés é a:",
        option1: "div",
        option2: "main",
        option3: "section",
        option4: "footer",

        answer: 4,

    },
    {
        question: "Qual regra altera a cor de um elemento?",
        option1: "color",
        option2: "background-color",
        option3: "font-size",
        option4: "transition",

        answer: 1,

    },
    {
        question: "Para aumentar a fonte de um elemento utilizamos:",
        option1: "font",
        option2: "text-transform",
        option3: "font-size",
        option4: "hover",

        answer: 3,

    },
    {
        question: "A posição que deixa um elemento fixo é a:",
        option1: "static",
        option2: "absolute",
        option3: "fixed",
        option4: "relative",

        answer: 3,

    },
    {
        question: "A propriedade CSS que pode ser utilizada para tornar um texto negrito é:",
        option1: "text-decoration: bold",
        option2: "boldness: true",
        option3: "font-weight: bold",
        option4: "font-style: bold",

        answer: 3,

    },
    {
        question: "Qual propriedade CSS é utilizada para deixar a fonte de uma página HTML em itálico?",
        option1: "font-weight",
        option2: "font-variant",
        option3: "font-size ",
        option4: "font-style",

        answer: 4,

    },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 15;

startGame = () => {
    questionCounter = 0 ;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion()
    
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/endGame.html')
    }

    questionCounter ++; 
    porgressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question

    options.forEach(option => {
       const number = option.dataset['number'];
       option.innerText = currentQuestion['option' + number]
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};

options.forEach(option => {
    option.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedOption = e.target;
        const selectedAnswer = selectedOption.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        };

        selectedOption.parentElement.classList.add(classToApply);

        setTimeout (() => {
            selectedOption.parentElement.classList.remove(classToApply);
            getNewQuestion ();
        }, 1000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;

};

startGame ();

