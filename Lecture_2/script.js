
const cards = ["10a", "10g", "10j", "10k", "6a", "6g", "6j", "6k", "7a", "7g", "7j", "7k", "8a", "8g", "8j", "8k", "9a", "9g", "9j", "9k", "da", "dg", "dj", "dk", "ka", "kg", "kj", "kk", "ta", "tg", "tj", "tk", "va", "vg", "vj", "vk"]

let deck = document.getElementById("deck")
let shuffledCards = shuffle(cards)
let openCard = 1;
let currentIndex = 1

function render() {
    if (deck.hasChildNodes()) {
        deck.innerHTML = ''
    }
    for (let i = 1; i <= 6; i++) {
        if (i <= openCard) {
            const card = document.createElement('img');
            card.src = `deck/${shuffledCards[i - 1]}.gif`
            deck.append(card)
        } else {
            const card = document.createElement('img');
            card.src = `deck/blank.gif`
            deck.append(card)
        }
    }
}

render()

function up() {
    openCard++;
    render();

    if (score(shuffledCards[currentIndex]) > score(shuffledCards[currentIndex - 1])) {
        document.getElementById("text").innerText = "არის მაღალი !!!!";
    } else {
        lose()
    }
    if(openCard == 6 && score(shuffledCards[currentIndex]) > score(shuffledCards[currentIndex - 1])) {
        win()
    }
    currentIndex = currentIndex + 1;
}


function down() {
    openCard++
    render()
    if (score(shuffledCards[currentIndex]) < score(shuffledCards[currentIndex - 1])) {
        document.getElementById("text").innerText = "არის დაბალი !!!!"
    } else {
        lose()
    }

    if(openCard == 6 && score(shuffledCards[currentIndex]) < score(shuffledCards[currentIndex - 1])) {
        win()
    }
    currentIndex = currentIndex + 1
}

function lose() {
    document.getElementById("note").innerText = "თქვენ დამარცხდით, სცადეთ თავიდან";
    var timeBar = document.querySelector(".round-time-bar");
    var section = document.querySelector(".gameSection");
    if (timeBar) {
        timeBar.style.display = "block";
        section.style.opacity = 0.2;
    }

    var allButtons = document.querySelectorAll(".gameSection button")
    allButtons.forEach((button) => {
        button.disabled = "true";
        button.style.cursor = "not-allowed"
    });


    setTimeout(function () {
        location.reload();
    }, 3000);
}

function win() {
    document.getElementById("note").innerText = "გილოცავთ, თქვენ გაიმარჯვეთ!!!";
    var timeBar = document.querySelector(".round-time-bar");
    var innerDiv = document.querySelector(".inner_div");
    if (timeBar) {
        timeBar.style.display = "block";
        timeBar.style.border = "solid 1px #15c026";
        innerDiv.style.background = "linear-gradient(to bottom, #64f67c, #15c02c)"; 
        document.getElementById("note").style.color = "#15c026";
    }

    var allButtons = document.querySelectorAll(".gameSection button");
    allButtons.forEach((button) => {
        button.disabled = true; 
        button.style.cursor = "not-allowed";
    });

    setTimeout(function () {
        location.reload();
    }, 10000);
}


function change() {
    shuffledCards = shuffle(cards)
    document.getElementById("buttonChange").disabled = true;
    render()

}

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array.slice(0, 6);
}

function score(card) {
    let _score = 0
    let cardNumber = card.slice(0, -1)
    if (cardNumber == "v") {
        _score = 11
    }
    if (cardNumber == "d") {
        _score = 12
    }
    if (cardNumber == "k") {
        _score = 13
    }
    if (cardNumber == "t") {
        _score = 14
    }
    if (_score == 0) {
        _score = cardNumber
    }
    console.log("ქულა", _score)
    return +_score
}
