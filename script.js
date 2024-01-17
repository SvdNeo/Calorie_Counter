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
