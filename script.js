let excelData = [];  // To store data from the Excel file
// added comment
// This function will be called to fetch the bill for the entered consumer number
function fetchBill() {

    if (excelData.length === 0) {
    alert('Excel data is not loaded yet.');
    return;
  }
  const consumerNumber = document.getElementById('consumerNumber').value.trim();
  const billAmountElement = document.getElementById('billAmount');


  

  
  if (!consumerNumber) {
    alert('Please enter a consumer number');
    return;
  }

  // Find the corresponding bill amount from the loaded data
  const entry = excelData.find(row => String(row['Consumer Number']).trim() === consumerNumber);

  if (entry) {
    billAmountElement.textContent = entry['Bill Amount'];
  } else {
    billAmountElement.textContent = 'No record found';
  }
}

// This function loads and parses the Excel file from GitHub repository
function loadExcelData() {
  fetch('data.xlsx')  // Path to the Excel file in your GitHub repository
    .then(response => response.arrayBuffer())  // Fetch and convert the file to an array buffer
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });  // Parse the Excel data
      const sheet = workbook.Sheets[workbook.SheetNames[0]];  // Get the first sheet
      const jsonData = XLSX.utils.sheet_to_json(sheet);  // Convert the sheet to JSON
      
      excelData = jsonData;  // Store the parsed data in the global variable
      console.log(excelData);  // Optional: Log data to the console for debugging
    })
    .catch(error => {
      console.error('Error loading the Excel file:', error);
    });
}

// Load the Excel file when the page is loaded
window.onload = loadExcelData;
