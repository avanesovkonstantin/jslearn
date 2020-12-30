"use strict";

function start() {
    numberOfFilms = +prompt("Сколько фильмов ты посмотрел уже,", "");
    while (numberOfFilms == "" || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt("Сколько фильмов ты посмотрел уже,", "");
    }
}

function rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
        let latest = getAnswerControlLenght("what was the latest film do you see?");
        let rating = getAnswerControlLenght("rat it");
        personalMovieDb.movies[latest] = rating;
    }
    console.log(personalMovieDb);

}

function detectPersonalLevel() {
    if (personalMovieDb.count < 10) {
        alert("its too little");
    } else if (personalMovieDb.count < 30) {
        alert("you are tipical");
    } else {
        alert("you are fan of films!");
    }
}

function getAnswerControlLenght(question) {
    let answer = '';
    answer = prompt(question, "");
    if (answer == null || answer.length == 0 || answer.length > 2) {
        getAnswerControlLenght(question);
    }

    return answer;
}

function showMyDB() {
    if (personalMovieDb.privat == true) {
        console.log(personalMovieDb);
    }

}

function writeYourGenres() {
    let arr = [];
    for (let i = 0; i < 3; i++) {
        arr.push(prompt(`Ваш любимый жанр под номером ${i+1}`, ""));
    }

    return arr;
}
let numberOfFilms;
let personalMovieDb = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    writeYourGenres: function () {
        let arr = [];
        for (let i = 0; i < 3; i++) {
            let answer = prompt(`Ваш любимый жанр под номером ${i+1}`, "");
            if (answer === null || answer === '') {
                i--;
                continue;
            }
            arr.push(answer);
        }
        personalMovieDb.genres = arr;
        personalMovieDb.genres.forEach(function (value, i, array) {
            let textMassage = `Любимый жанр #${i+1} - ${value}`;
            console.log(textMassage);
        });
    },
    privat: false,
    toggleVisibleMyDB: function () {
        personalMovieDb.privat = !personalMovieDb.privat;
    }
};
personalMovieDb.writeYourGenres();
console.log(personalMovieDb);
// 3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
// Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
// при помощи метода forEach вывести в консоль сообщения в таком виде:
// "Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/