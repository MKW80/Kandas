let questionsHTML = [
    {
        "id": "1",
        "question": "Wofür steht HTML?",
        "answers": {
            "A": "Hyperthread Modern Language",
            "B": "Hypertest Manufacture Language",
            "C": "Hypertext Markup Language",
            "D": "Hyperthin Malware Language"
        },
        "right_answer": "C"
    },
    {
        "id": "2",
        "question": "Wofür steht CSS?",
        "answers": {
            "A": "Client Side Scanning, ",
            "B": "Cascading Style Sheets",
            "C": "Closed Source Software",
            "D": "Computerized Support Systems"
        },
        "right_answer": "B"
    },
    {
        "id": "3",
        "question": "Wann wurde das Internet erfunden?",
        "answers": {
            "A": "29.10.1949",
            "B": "29.10.1959",
            "C": "29.10.1969",
            "D": "29.10.1979"
        },
        "right_answer": "C"
    },
    {
        "id": "4",
        "question": "Welche Subatomaren Teilchen stecken in einem Proton?",
        "answers": {
            "A": "2 Up-Quarks, 1 Down-Quark",
            "B": "1 Up-Quark,  2 Down-Quarks",
            "C": "2 Up-Quarks, 2 Down-Quarks",
            "D": "1 Up-Quark,  1 Down-Quark"
        },
        "right_answer": "A"
    },
    {
        "id": "5",
        "question": "Was bestimmt die Chemischen eigenschaften eines Atoms?",
        "answers": {
            "A": "Elektronen",
            "B": "Protonen",
            "C": "Neutronen",
            "D": "Leptonen"
        },
        "right_answer": "A"
    },
    {
        "id": "6",
        "question": "Wie schnell ist das Licht?",
        "answers": {
            "A": "298792458 m/s",
            "B": "299792458 m/s",
            "C": "300792458 m/s",
            "D": "301792458 m/s"
        },
        "right_answer": "B"
    },
    {
        "id": "7",
        "question": "Welches Protein löst zwei DNA bzw. RNA-Strängen auf?",
        "answers": {
            "A": "Globuline",
            "B": "Albumine",
            "C": "Helikase",
            "D": "Metabolite"
        },
        "right_answer": "C"
    },
    {
        "id": "8",
        "question": "Welche Grundbausteine von DNA-Strängen sind die 4 Nukleotide?",
        "answers": {
            "A": "Aranin, Thypin, Gutanin und Cytarin",
            "B": "Abenin, Thywin, Guatin und Cytasin",
            "C": "Adenin, Thymin, Guanin und Cytosin.",
            "D": "Amenin, Thypin, Gualin und Cytobin"
        },
        "right_answer": "C"
    },
    {
        "id": "9",
        "question": "Welche Halbwertszeit hat das Isotop C14",
        "answers": {
            "A": "5730 Stunden",
            "B": "5730 Tage",
            "C": "5730 Monate",
            "D": "5730 Jahre"
        },
        "right_answer": "D"
    },
    {
        "id": "10",
        "question": "Wofür wurde Albert Einstein 1921 der Nobelpreis für Physik zugesprochen?",
        "answers": {
            "A": "Lichtquantenhypothese",
            "B": "spezielle Relativitätstheorie",
            "C": "Heisenbergsche Unschärferelation",
            "D": "allgemeine Relativitätstheorie"
        },
        "right_answer": "A"
    }
]

let rightQuestions = 0;
let currentQuestion = 0;
//let AUDIO_SUCCESS = new Audio('audio/success.mp3');
//let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
    
    startScreen();
    //endScreen();
    //renderMainCard();
}

function startScreen() {
    let startScreen = document.getElementById("mainCard"); 
    startScreen.innerHTML = "";

    startScreen.innerHTML = /*html*/ `
      <div> <img src="https://cdn.pixabay.com/photo/2017/02/13/08/54/brain-2062057_1280.jpg" style="height: 280px; width: 350px;  border-radius: 20px;    margin-bottom: 20px;"></div>
        <h1>Teste dein Wissen!</h1>
        <span></span>
        <button onclick="start()" id="start_btn" class="btn btn-primary btn-lg" role="button">
        Jetzt starten
        </button>
    `;

}

function start() {
    renderMainCard();
}

function renderMainCard() {

    if (currentQuestion >= questionsHTML.length) {
        endScreen();
    } else {

        let question = questionsHTML[currentQuestion];

        let mainCard = document.getElementById("mainCard");
        mainCard.innerHTML = ""; 

        mainCard.innerHTML = /*html*/ `
            <div class="progress">
                <div class="progress-bar" id="progress-bar" role="progressbar" style="width: 0%;">0%</div>
            </div>
            <div id="question" class="jumbotron" >
                <h2>Frage <span id="qno">${question['id']}</span></h2>
                <div class="mb-4">${question['question']}</div>
            </div>
            <div class="row answer">
                <div id="answer_A" class="card">
                    <div class="card-body" onclick="answer('answer_A')">${question['answers'].A}</div>
                </div>
                <div id="answer_B" class="card">
                    <div class="card-body" onclick="answer('answer_B')">${question['answers'].B}</div>
                </div>
                <div id="answer_C" class="card">
                    <div class="card-body" onclick="answer('answer_C')">${question['answers'].C}</div>
                </div>
                <div  id="answer_D" class="card">
                    <div class="card-body" onclick="answer('answer_D')">${question['answers'].D}</div>
                </div>
                <div class="bottomCard">
                <div class="counter">
                    <span><b id="questionNumber">1</b> von <b id="all-questions"></b> Fragen</span>
                </div>
                <div class="nextQuestion">
                    <button onclick="nextQuestion()" id="nextButton" class="btn btn-primary" disabled>nächste Frage</button>
                </div>
            </div>
        `;
        document.getElementById('all-questions').innerHTML = questionsHTML.length;
        document.getElementById('questionNumber').innerHTML = currentQuestion + 1;

        let percent = (currentQuestion + 1) / questionsHTML.length;
        percent = Math.round(percent * 100);

        document.getElementById('progress-bar').innerHTML = `${percent}%`;
        document.getElementById('progress-bar').style = `width: ${percent}%`;
    }
}

function answer(selection) {
    let question = questionsHTML[currentQuestion]; // currentQuestion = 0. s.Oben

    let selectedQuestionLetter = selection.slice(-1); // letztes Zeichen aus dem String selection (onclick(parameter))

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionLetter == question['right_answer']) { // Vergleich
        rightQuestions++;
        document.getElementById(selection).classList.add('bg-success');
        AUDIO_SUCCESS.play();
    } else {
        document.getElementById(selection).classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('nextButton').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    resetAnswerButtons();
    renderMainCard();
}

function resetAnswerButtons() {
    document.getElementById('answer_A').classList.remove('bg-success');
    document.getElementById('answer_A').classList.remove('bg-danger');
    document.getElementById('answer_B').classList.remove('bg-success');
    document.getElementById('answer_B').classList.remove('bg-danger');
    document.getElementById('answer_C').classList.remove('bg-success');
    document.getElementById('answer_C').classList.remove('bg-danger');
    document.getElementById('answer_D').classList.remove('bg-success');
    document.getElementById('answer_D').classList.remove('bg-danger');
}

function endScreen() {
    document.getElementById("mainCard").innerHTML = "";

    document.getElementById("mainCard").innerHTML = /*html*/ `
        <div id="trophy">
            <img src="./img/tropy.png" alt="">
        </div>
        <div id="result">
            <img src="./img/brain_result.png" alt="">
        </div>
       
        <h1>Geschafft!</h1>
        <div id="points">
            Dein Punktestand ist: <b id='endpoints'>0</b> von
            <b id="possiblepoints">0</b>
        </div>
        <button onclick="restart()" class="restart btn btn-primary btn-lg" role="button">
            Nochmal starten
        </button>
    `;
    document.getElementById('possiblepoints').innerHTML = questionsHTML.length;
    document.getElementById('endpoints').innerHTML = rightQuestions;
}

function restart() {
    document.getElementById("mainCard").innerHTML = "";
    currentQuestion = 0;
    rightQuestions = 0;
    renderMainCard();
}

