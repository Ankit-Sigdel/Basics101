const API_URL = 'http://localhost:8080/';

async function addViaAPI() {
  const num1 = document.getElementById('num1').value;
  const num2 = document.getElementById('num2').value;
  const num3 = document.getElementById('num3').value;
  const statusDiv = document.getElementById('status');
  const resultSpan = document.getElementById('result');

  if (num1 === '' || num2 === '' || num3 === '') {
    alert('Please enter all three numbers!');
    return;
  }

  try {
    statusDiv.textContent = '⏳ Sending request to AWS...';
    statusDiv.className = 'status sending';

    // Call the backend server deployed on AWS
    const response = await fetch(`${API_URL}/add?a=${num1}&b=${num2}&c=${num3}`);
    const data = await response.json();

    resultSpan.textContent = data.result;
    resultSpan.className = 'success';

    statusDiv.textContent = '✓ Received response from AWS!';
    statusDiv.className = 'status success';

    console.log(`Backend (AWS) calculated: ${num1} + ${num2} + ${num3} = ${data.result}`);
    console.log(`Frontend (Vercel) → Backend (AWS) connection successful!`);

  } catch (error) {
    statusDiv.textContent = '✗ Error connecting to backend';
    statusDiv.className = 'status error';
    resultSpan.textContent = 'Error';
    resultSpan.className = 'error';

    console.error('Error:', error);
    console.log('Make sure your backend is deployed and API_URL is correct!');
  }
}
