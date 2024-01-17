document.getElementById('calorieForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    calculateTotalCalories();
});

function addEntry() {
    const entryType = document.getElementById('entryType').value;
    const targetInputContainer = document.querySelector(`#${entryType}Fieldset .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

    const HTMLString = `
        <label for="${entryType}-${entryNumber}-name">Entry ${entryNumber} Name</label>
        <input type="text" id="${entryType}-${entryNumber}-name" placeholder="Name" />
        <label for="${entryType}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
        <input
            type="number"
            min="0"
            id="${entryType}-${entryNumber}-calories"
            placeholder="Calories"
        />`;

    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateTotalCalories() {
    const budget = parseInt(document.getElementById('budget').value) || 0;

    // Get calories consumed from each fieldset
    const breakfast = getTotalCaloriesFromFieldset('breakfastFieldset');
    const lunch = getTotalCaloriesFromFieldset('lunchFieldset');
    const dinner = getTotalCaloriesFromFieldset('dinnerFieldset');
    const snacks = getTotalCaloriesFromFieldset('snacksFieldset');

    // Get calories burned from exercise fieldset
    const exercise = getTotalCaloriesFromFieldset('exerciseFieldset');

    // Calculate total consumed calories
    const totalCaloriesConsumed = breakfast + lunch + dinner + snacks;

    // Calculate surplus or deficit calories
    const surplusDeficit = budget - totalCaloriesConsumed + exercise;

    // Display results in the DOM
    const resultContainer = document.querySelector('.result-container');
const surplusElement = document.getElementById('surplus');
const deficitElement = document.getElementById('deficit');
const budgetedElement = document.getElementById('budgeted');
const consumedElement = document.getElementById('consumed');
const burnedElement = document.getElementById('burned');

resultContainer.style.display = 'block';

if (surplusDeficit >= 0) {
  surplusElement.style.display = 'block';
  deficitElement.style.display = 'none';
  surplusElement.textContent = `${surplusDeficit} calories surplus`;
} else {
  surplusElement.style.display = 'none';
  deficitElement.style.display = 'block';
  deficitElement.textContent = `${Math.abs(surplusDeficit)} calories deficit`;
}

budgetedElement.textContent = `Budgeted Calories: ${budget}`;
consumedElement.textContent = `Consumed Calories: ${totalCaloriesConsumed}`;
burnedElement.textContent = `Burned Calories: ${exercise}`;
}

function getTotalCaloriesFromFieldset(fieldsetId) {
    const inputContainer = document.querySelector(`#${fieldsetId} .input-container`);
    const calorieInputs = inputContainer.querySelectorAll('input[type="number"]');
    let totalCalories = 0;

    calorieInputs.forEach(input => {
        totalCalories += parseInt(input.value) || 0;
    });

    return totalCalories;
}

function clearForm() {
    document.getElementById('calorieForm').reset();

    // Clear input containers
    const inputContainers = document.querySelectorAll('.input-container');
    inputContainers.forEach(container => {
        container.innerHTML = '';
    });

    // Clear result container
    const resultContainer = document.querySelector('.result-container');
    resultContainer.style.display = 'none';
}
