function openCategory(evt, categoryName) {
  // Get all elements with class="tab-content" and hide them
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  // Get all elements with class="tab-link" and remove the class "active"
  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => link.classList.remove('active'));

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(categoryName).style.display = 'flex';
  evt.currentTarget.classList.add('active');
}

// Set default active tab on page load
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('food').style.display = 'flex';
  document.querySelector('.tab-link').classList.add('active'); // Optional, to set the first tab as active
});


// for contact form
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Create a FormData object from the form element
  const formData = new FormData(this);

  // Send the form data using Fetch API
  fetch('https://formspree.io/f/your-form-id', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Thank you for your message!');
      this.reset();
    } else {
      alert('There was a problem with your submission. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was a problem with your submission. Please try again.');
  });
});
