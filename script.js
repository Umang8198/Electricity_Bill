let excelData = [];  // To store data from the Excel file

// Fetch Bill Function
function fetchBill() {
  if (excelData.length === 0) {
    alert('Excel data is not loaded yet.');
    return;
  }

  const consumerNumber = document.getElementById('consumerNumber').value.trim();
  const billAmountElement = document.getElementById('billAmount');
  const billDetailsElement = document.getElementById('billDetails');
  
  // Reset previous details
  billAmountElement.textContent = '-';
  billDetailsElement.style.display = 'none';

  if (!consumerNumber) {
    alert('Please enter a consumer number');
    return;
  }

  console.log('Consumer Number:', consumerNumber);

  // Find the corresponding entry
  const entry = excelData.find(row => String(row['Consumer Number']).trim() === consumerNumber);

  if (entry) {
    // Display Bill Amount
    billAmountElement.textContent = entry['bill_amount'] || '-';  // Use 'bill_amount' to display the bill

    // Display Additional Information
    document.getElementById('billMonth').textContent = entry['bill_month'] || '-';
    document.getElementById('billYear').textContent = entry['bill_year'] || '-';
    document.getElementById('dueDate').textContent = entry['due_date'] || '-';
    document.getElementById('billDate').textContent = entry['bill_date'] || '-';
    document.getElementById('chequeDate').textContent = entry['chque_date'] || '-';
    document.getElementById('amountAfterDate').textContent = entry['amount_after_date'] || '-';
    document.getElementById('name').textContent = entry['name'] || '-';
    document.getElementById('fathers').textContent = entry['fathers'] || '-';
    document.getElementById('address').textContent = entry['address'] || '-';
    document.getElementById('mobileNo').textContent = entry['mobile_no'] || '-';

    // Show the bill details section
    billDetailsElement.style.display = 'block';
  } else {
    // Handle case when no matching record is found
    billAmountElement.textContent = 'No record found';
    billDetailsElement.style.display = 'none';
  }
}

// Load Excel Data from GitHub (or your server)
function loadExcelData() {
  fetch('data.xlsx?' + new Date().getTime())  // Adding a timestamp to avoid caching
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      excelData = jsonData;
      console.log(excelData);  // Log data to check the structure
    })
    .catch(error => {
      console.error('Error loading the Excel file:', error);
    });
}

// Load the Excel data when the page is loaded
window.onload = loadExcelData;
