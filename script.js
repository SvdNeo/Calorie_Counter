document.getElementById('calorieForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    addEntry();
  });
  function addEntry() {
    const entryType = document.getElementById('entryType').value;
    const entryFieldsContainer = document.getElementById(entryType + 'Fieldset').querySelector('.input-container');

    const entryNumber = entryFieldsContainer.querySelectorAll('input[type="text"]').length + 1;
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

    entryFieldsContainer.insertAdjacentHTML('beforeend', HTMLString);
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
    document.getElementById('surplus').textContent = `${surplusDeficit >= 0 ? surplusDeficit + " calories surplus" : Math.abs(surplusDeficit) + " calories deficit"}`;
    document.getElementById('budgeted').textContent = `Budgeted Calories: ${budget}`;
    document.getElementById('consumed').textContent = `Consumed Calories: ${totalCaloriesConsumed}`;
    document.getElementById('burned').textContent = `Burned Calories: ${exercise}`;
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
