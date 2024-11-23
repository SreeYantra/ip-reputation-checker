// Function to check the reputation of an IP address
async function checkIPReputation() {
    const ipAddress = document.getElementById('ipAddress').value;  // Get IP address from input field
    const resultsDiv = document.getElementById('results');        // Get the results container
    const errorDiv = document.querySelector('.error');            // Get the error message element (if any)

    // Clear previous results or errors
    resultsDiv.innerHTML = '';
    if (errorDiv) errorDiv.remove();

    // Validate the input IP address
    if (!validateIP(ipAddress)) {
        displayError('Please enter a valid IP address.');
        return;
    }

    // API URL to fetch data from IPinfo API (replace with your API token if needed)
    const apiKey = 'YOUR_IPINFO_API_KEY'; // Replace with your IPinfo API Key
    const url = `https://ipinfo.io/${ipAddress}/json?token=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the response contains error message
        if (data.error) {
            displayError(`Error: ${data.error.message}`);
        } else {
            // Display the IP address information
            displayResults(data);
        }
    } catch (error) {
        displayError('Error fetching data from IPinfo API.');
    }
}

// Validate if the entered string is a valid IP address
function validateIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip)
