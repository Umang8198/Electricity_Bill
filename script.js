// Function to format the date as dd-mm-yyyy
function formatDate(date) {
  if (!date) return '-'; // If the date is invalid, return a dash
  
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0'); // Ensure two digits
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed)
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}

// This function will be called to fetch the bill for the entered consumer number
function fetchBill() {
  if (excelData.length === 0) {
    alert('Excel data is not loaded yet.');
    return;
  }

  const consumerNumber = document.getElementById('consumerNumber').value.trim();
  const billAmountElement = document.getElementById('billAmount');
  const billDetails = document.getElementById('billDetails');

  if (!consumerNumber) {
    alert('Please enter a consumer number');
    return;
  }

  // Debug log for consumer number
  console.log('Consumer Number:', consumerNumber);

  // Find the corresponding bill entry from the loaded data
  const entry = excelData.find(row => {
    console.log('Row Consumer Number:', row['Consumer Number']);  // Debug log for each row
    return String(row['Consumer Number']).trim() === consumerNumber;
  });

  if (entry) {
    billAmountElement.textContent = entry['Bill Amount'];

    // Fill in the details
    document.getElementById('billMonth').textContent = entry['bill_month'] || '-';
    document.getElementById('billYear').textContent = entry['bill_year'] || '-';
    document.getElementById('dueDate').textContent = formatDate(entry['due_date']);
    document.getElementById('billDate').textContent = formatDate(entry['bill_date']);
    document.getElementById('chequeDate').textContent = formatDate(entry['chque_date']);
    document.getElementById('amountAfterDate').textContent = entry['amount_after_date'] || '-';
    document.getElementById('name').textContent = entry['name'] || '-';
    document.getElementById('fathers').textContent = entry['fathers'] || '-';
    document.getElementById('address').textContent = entry['address'] || '-';
    document.getElementById('mobileNo').textContent = entry['mobile_no'] || '-';

    // Show the bill details section
    billDetails.style.display = 'block';
  } else {
    billAmountElement.textContent = 'No record found';
    billDetails.style.display = 'none';
  }
}
