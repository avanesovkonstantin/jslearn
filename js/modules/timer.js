function timer() {

    const dedline = '2021-12-31';

    function getTimerSettings(endtime) {
        const t = Date.parse(endtime) - new Date();

        function setZero(num) {
            if (num > 0 && num < 10) {
                return `0${num}`;
            }

            return num;
        }

        return {
            "total": t,
            "days": setZero(Math.floor(t / (1000 * 60 * 60 * 24))),
            "hours": setZero(Math.floor(t / (1000 * 60 * 60) % 60)),
            "minutes": setZero(Math.floor(t / (1000 * 60) % 60)),
            "seconds": setZero(Math.floor((t / 1000) % 60))
        };
    }

    function updateTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(setTimer, 1000);

        setTimer();

        function setTimer() {
            const t = getTimerSettings(dedline);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total < 0) {
                clearInterval(timeInterval);
            }
        }

    }

    updateTimer('.timer', dedline);

}

module.exports = timer;