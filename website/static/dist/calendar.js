const calendar = () => {
    // Get current date
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    // Get number of days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Days main container
    const calendarDays = document.getElementById('calendar-days');
    function moveDays() {
        // Get first day of a month
        const monthToString = String(currentMonth + 1);
        const firstDayOfMonth = new Date(currentYear + '-' + monthToString + '-1').getDay();
        function createEmptyCell() {
            let p = document.createElement('p');
            p.innerHTML = ' ';
            calendarDays.appendChild(p);
        }
        let i = 1;
        // Sunday is 0
        if (firstDayOfMonth === 0) {
            for (i; i < 7; i++) {
                createEmptyCell();
            }
        }
        else {
            for (i; i < firstDayOfMonth; i++) {
                createEmptyCell();
            }
        }
    }
    moveDays();
    for (let i = 1; i <= daysInMonth; i++) {
        let p = document.createElement('p');
        p.classList.add('calendar__day');
        p.innerHTML = i.toString();
        let div = document.createElement('div');
        div.classList.add('calendar__day-container');
        div.appendChild(p);
        calendarDays.appendChild(div);
    }
};
export { calendar };
