// Function to handle the search form submission
function handleSearch(event) {
    event.preventDefault();
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    const categoryItems = document.querySelectorAll(".category-item");
  
    // Filter categories based on search query
    categoryItems.forEach(item => {
      const categoryName = item.querySelector("h4").textContent.toLowerCase();
      if (categoryName.includes(searchQuery)) {
        item.style.display = "block"; // Show matching categories
      } else {
        item.style.display = "none"; // Hide non-matching categories
      }
    });
  }
  
  // Function to load the selected calculator layout
  function loadCalculator(calculatorType) {
    const container = document.getElementById('calculator-container');
    
    // Define templates for each calculator type
    const templates = {
      basic: document.getElementById('basic-calculator-template').innerHTML,
      scientific: '<p>Scientific calculator layout goes here.</p>', // Placeholder for scientific calculator layout
      currency: '<p>Currency converter layout goes here.</p>', // Placeholder for currency converter layout
      unit: '<p>Unit converter layout goes here.</p>', // Placeholder for unit converter layout
    };
  
    // Replace container content with the selected calculator layout
    container.innerHTML = templates[calculatorType] || '<p>Calculator not found.</p>';
  
    // Add event listeners to buttons for the basic calculator
    if (calculatorType === 'basic') {
      addBasicCalculatorFunctionality();
    }
  }
  
  // Function to add basic calculator functionality
  function addBasicCalculatorFunctionality() {
    const resultScreen = document.getElementById('basic-result');
    const buttons = document.querySelectorAll('.btn');
  
    let currentInput = '';
    let operator = '';
    let firstNumber = '';
    let secondNumber = '';
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const buttonValue = button.value;
  
        if (buttonValue === 'C') {
          // Clear the input
          currentInput = '';
          operator = '';
          firstNumber = '';
          secondNumber = '';
          resultScreen.value = '';
        } else if (buttonValue === '=') {
          // Perform calculation
          secondNumber = currentInput;
          currentInput = '';
          if (operator && firstNumber !== '' && secondNumber !== '') {
            switch (operator) {
              case '+':
                resultScreen.value = parseFloat(firstNumber) + parseFloat(secondNumber);
                break;
              case '-':
                resultScreen.value = parseFloat(firstNumber) - parseFloat(secondNumber);
                break;
              case '*':
                resultScreen.value = parseFloat(firstNumber) * parseFloat(secondNumber);
                break;
              case '/':
                resultScreen.value = parseFloat(firstNumber) / parseFloat(secondNumber);
                break;
              default:
                resultScreen.value = 'Error';
            }
          }
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
          // Store operator and first number
          if (firstNumber === '') {
            firstNumber = currentInput;
          }
          operator = buttonValue;
          currentInput = '';
        } else {
          // Append digit or decimal to current input
          currentInput += buttonValue;
          resultScreen.value = currentInput;
        }
      });
    });
  }
  