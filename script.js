let excelData = [];  // To store data from the Excel file
let isDataLoaded = false; // Track whether data has been loaded

// Fetch Bill Function
function fetchBill() {
  if (!isDataLoaded) {
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
    billAmountElement.textContent = entry['bill_amount'] || '-'; 

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
      isDataLoaded = true; // Set data as loaded
      console.log(excelData);  // Log data to check the structure
    })
    .catch(error => {
      console.error('Error loading the Excel file:', error);
    });
}


//pdf code
// Function to generate and download PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;  // Destructure jsPDF from the window object

  const doc = new jsPDF();  // Create a new jsPDF instance
  
  // Add Title to PDF
  doc.setFontSize(18);
  doc.text("Bill Details", 14, 20);
  
  // Add content from the page to the PDF
  const consumerNumber = document.getElementById('consumerNumber').value.trim();
  const billAmount = document.getElementById('billAmount').textContent;
  const billMonth = document.getElementById('billMonth').textContent;
  const billYear = document.getElementById('billYear').textContent;
  const dueDate = document.getElementById('dueDate').textContent;
  const billDate = document.getElementById('billDate').textContent;
  const chequeDate = document.getElementById('chequeDate').textContent;
  const amountAfterDate = document.getElementById('amountAfterDate').textContent;
  const name = document.getElementById('name').textContent;
  const fathers = document.getElementById('fathers').textContent;
  const address = document.getElementById('address').textContent;
  const mobileNo = document.getElementById('mobileNo').textContent;
  
  let content = `
    Consumer Number: ${consumerNumber}
    Bill Amount: ${billAmount}
    Bill Month: ${billMonth}
    Bill Year: ${billYear}
    Due Date: ${dueDate}
    Bill Date: ${billDate}
    Cheque Date: ${chequeDate}
    Amount After Due Date: ${amountAfterDate}
    Name: ${name}
    Father's Name: ${fathers}
    Address: ${address}
    Mobile No: ${mobileNo}
  `;

  // Add the content to the PDF
  doc.setFontSize(12);
  doc.text(content, 14, 40);
  
  // Save the PDF
  doc.save('bill_details.pdf');
}


// Load the Excel data when the page is loaded
window.onload = loadExcelData;
