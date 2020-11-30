let numberOfFilm = +prompt("how many movies?", "");
let personalMovieDb = {
    count: numberOfFilm,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

let i = 0;
while (i < 2) {
    let ans1 = prompt("the last one?", "");
    let ans2 = prompt("rate it2?", "");
    personalMovieDb.movies[ans1] = ans2;
    i++;
}

console.log(personalMovieDb);