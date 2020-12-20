"use strict";

let numberOfFilms;

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

let personalMovieDb = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: {},
    privat: false
};


personalMovieDb.genres = writeYourGenres();
console.log(personalMovieDb);