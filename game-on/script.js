document.addEventListener('DOMContentLoaded', () => {
    const flows = document.querySelectorAll('.flow');
    const resultOverlay = document.getElementById('resultOverlay');
    const startButton = document.getElementById('startButton');
    const betButton = document.getElementById('betButton');
    const spinButton = document.getElementById('spinButton');
    const continueButton = document.getElementById('continueButton');
    const spinnerTrack = document.getElementById('spinnerTrack');
    const whiteBar = document.getElementById('whiteBar');
    const betOptions = document.querySelectorAll('#betOptions button');
    const errorMessage = document.getElementById('errorMessage');

    let activeFlow = 0;
    let userBet = { type: null, value: null };
    let rouletteNumbers = generateRouletteNumbers();
    let spinInProgress = false;

    function generateRouletteNumbers() {
        const numbers = [];
        for (let i = 0; i <= 36; i++) {
            const color = i === 0 ? 'green' : i % 2 === 0 ? 'black' : 'red';
            numbers.push({ value: i, color });
        }
        return shuffle(numbers);
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function populateSpinner(numbers) {
        spinnerTrack.innerHTML = '';
        numbers.forEach((num) => {
            const div = document.createElement('div');
            div.classList.add('number', num.color);
            div.textContent = num.value;
            spinnerTrack.appendChild(div);
        });
        const duplicatedNumbers = [...numbers, ...numbers];
        duplicatedNumbers.forEach((num) => {
            const div = document.createElement('div');
            div.classList.add('number', num.color);
            div.textContent = num.value;
            spinnerTrack.appendChild(div);
        });
    }

    populateSpinner(rouletteNumbers);

    function goToFlow(index) {
        flows[activeFlow].classList.remove('active');
        activeFlow = index;
        flows[activeFlow].classList.add('active');
    }

    startButton.addEventListener('click', () => goToFlow(1));
    betButton.addEventListener('click', () => goToFlow(2));
    spinButton.addEventListener('click', startRoulette);
    continueButton.addEventListener('click', resetGame);

    betOptions.forEach((option) => {
        option.addEventListener('click', () => {
            if (userBet.type) {
                errorMessage.textContent = "You can only select one bet. Please unselect the current bet before choosing a new one.";
                errorMessage.style.display = 'block';
                return;
            }
            const betType = option.dataset.type;
            const betValue = option.dataset.bet;
            userBet = { type: betType, value: betValue };
            betOptions.forEach((btn) => btn.classList.remove('selected'));
            option.classList.add('selected');
            errorMessage.style.display = 'none';
        });
    });

    function startRoulette() {
        if (spinInProgress) return;

        if (!userBet.type) {
            errorMessage.textContent = "Please select a bet before spinning!";
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';
        spinInProgress = true;

        spinnerTrack.offsetHeight;

        const spinDuration = 3000;
        const totalDistance = Math.floor(Math.random() * 1000) + 2000;
        spinnerTrack.style.transition = `transform ${spinDuration}ms ease-out`;
        spinnerTrack.style.transform = `translateX(-${totalDistance}px)`;

        setTimeout(() => {
            spinnerTrack.style.transition = 'none';

            const spinnerItems = document.querySelectorAll('#spinnerTrack .number');
            const itemWidth = spinnerItems[0].offsetWidth;

            const whiteBarCenter = whiteBar.offsetLeft + whiteBar.offsetWidth / 2;
            const trackOffset = (totalDistance + whiteBarCenter) % (itemWidth * rouletteNumbers.length);

            const adjustedPosition = Math.round(trackOffset / itemWidth);
            const resultIndex = adjustedPosition % rouletteNumbers.length;
            const result = rouletteNumbers[resultIndex];

            document.getElementById('resultNumber').textContent = result.value;

            const didWin = (
                (userBet.type === 'color' && userBet.value === result.color) ||
                (userBet.type === 'number' && userBet.value == result.value)
            );

            document.getElementById('resultMessage').textContent = didWin
                ? `You won! It landed on ${result.value} (${result.color})`
                : `You lost! It landed on ${result.value} (${result.color})`;

            resultOverlay.classList.add('active');
            spinInProgress = false;

        }, spinDuration);
    }

    function resetGame() {
        userBet = { type: null, value: null };
        spinnerTrack.style.transition = 'none';
        spinnerTrack.style.transform = 'translateX(0px)';
        populateSpinner(rouletteNumbers);
        resultOverlay.classList.remove('active');
        goToFlow(2);
    }
});