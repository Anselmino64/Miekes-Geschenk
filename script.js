// Timer-Daten
const timers = [
    {
        type: 'countdown',
        targetDate: new Date(2027, 1, 25), // 25. Februar 2027
        dayId: 'birthday-days',
        hourId: 'birthday-hours',
        minuteId: 'birthday-minutes',
        secondId: 'birthday-seconds'
    },
    {
        type: 'elapsed',
        targetDate: new Date(2020, 7, 12), // 12. August 2020
        dayId: 'meeting-days',
        hourId: 'meeting-hours',
        minuteId: 'meeting-minutes',
        secondId: 'meeting-seconds'
    },
    {
        type: 'countdown',
        // Countdown zur Geburtstagsfeier am 7. März 2026
        targetDate: new Date(2026, 2, 7),
        dayId: 'gift-days',
        hourId: 'gift-hours',
        minuteId: 'gift-minutes',
        secondId: 'gift-seconds'
    }
];

// SECRET Countdown - echter Termin: 4. August
let secretActualDate = new Date(2026, 7, 4); // 4. August 2026
let secretDisplayDate = new Date(secretActualDate);

// Modal Funktionen
function openBirthdayModal() {
    const modal = document.getElementById('birthdayModal');
    modal.classList.add('show');
}

function closeBirthdayModal() {
    const modal = document.getElementById('birthdayModal');
    modal.classList.remove('show');
}

// Modal schließen wenn außen geklickt wird
window.onclick = function(event) {
    const modal = document.getElementById('birthdayModal');
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}

// Zeit-Differenz berechnen
function calculateTimeDifference(targetDate) {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = Math.abs(now - target);

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

// Secret Countdown zufällig ändern
function randomizeSecretDate() {
    const changes = [
        { type: 'days', value: Math.random() > 0.5 ? 14 : -7 }, // +14 Tage oder -7 Tage
        { type: 'days', value: Math.random() > 0.5 ? 21 : -14 }, // +21 oder -14
        { type: 'hours', value: Math.random() > 0.5 ? 3 : -3 }, // +3 oder -3 Stunden
        { type: 'hours', value: Math.random() > 0.5 ? 6 : -6 }, // +6 oder -6 Stunden
        { type: 'minutes', value: Math.random() > 0.5 ? 45 : -30 } // +45 oder -30 Minuten
    ];
    
    const change = changes[Math.floor(Math.random() * changes.length)];
    const newDate = new Date(secretActualDate);
    
    if (change.type === 'days') {
        newDate.setDate(newDate.getDate() + change.value);
    } else if (change.type === 'hours') {
        newDate.setHours(newDate.getHours() + change.value);
    } else if (change.type === 'minutes') {
        newDate.setMinutes(newDate.getMinutes() + change.value);
    }
    
    secretDisplayDate = newDate;
}

// Timer aktualisieren
function updateTimers() {
    timers.forEach(timer => {
        const { days, hours, minutes, seconds } = calculateTimeDifference(timer.targetDate);

        document.getElementById(timer.dayId).textContent = String(days).padStart(2, '0');
        document.getElementById(timer.hourId).textContent = String(hours).padStart(2, '0');
        document.getElementById(timer.minuteId).textContent = String(minutes).padStart(2, '0');
        document.getElementById(timer.secondId).textContent = String(seconds).padStart(2, '0');
    });
    
    // Secret Countdown aktualisieren
    const { days, hours, minutes, seconds } = calculateTimeDifference(secretDisplayDate);
    document.getElementById('secret-days').textContent = String(days).padStart(2, '0');
    document.getElementById('secret-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('secret-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('secret-seconds').textContent = String(seconds).padStart(2, '0');
}

// Secret Countdown alle 10-30 Sekunden ändern
function startSecretRandomizer() {
    setInterval(() => {
        randomizeSecretDate();
        updateTimers();
    }, 10000 + Math.random() * 20000); // 10-30 Sekunden
}

// Initial laden und dann jede Sekunde aktualisieren
document.addEventListener('DOMContentLoaded', () => {
    updateTimers();
    setInterval(updateTimers, 1000);
    startSecretRandomizer();
    
    // HIER KANNST DU DEINEN TEXT EINGEBEN:
    const birthdayText = `Ich weiß es ist jetzt keine krasse Website mit krassen Funktionen, aber ich wollte nur sagen dass dieser Link (Bete für mich das alles klappt und ich nicht wieder einen neuen Link in der Zukunft erstellen muss) immmer zu coolen Countdowns oder so So-viel-Zeit-ist-schon-vergangen Timer führen wird. Also falls du irgendwelche ideen hast, welche Sachen man noch hier hinzufügen kann sag bescheid. Deswegen steht hier erstmal so wenig. Naja ich hoffe irgendwann im Leben ist diese Website praktisch hihi.`;
    
    document.getElementById('modalText').textContent = birthdayText;
});
