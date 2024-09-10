document.getElementById('subscribeForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log('Form submitted and JavaScript is working!');
  
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const messageDiv = document.getElementById('message');
    const label = document.getElementById('form-label');
  
    // Clear any previous messages
    messageDiv.innerHTML = '';
  
    try {
      const response = await fetch('https://email-subscriptions-worker.wmurphybusiness.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
        }),
      });
  
      if (response.ok) {
        // Update the form label text to confirm subscription success
        label.textContent = 'You have successfully subscribed!';
        emailInput.value = ''; // Clear the input field
      } else {
        const errorMessage = await response.text();
        messageDiv.textContent = 'Failed to subscribe. Please try again later.';
        console.error('Error:', errorMessage);
      }
    } catch (error) {
      messageDiv.textContent = 'Failed to subscribe. Please try again later.';
      console.error('Error:', error);
    }
  });
  