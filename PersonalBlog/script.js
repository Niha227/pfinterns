function openCategory(evt, categoryName) {

  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.style.display = 'none');

  
  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => link.classList.remove('active'));

 
  document.getElementById(categoryName).style.display = 'flex';
  evt.currentTarget.classList.add('active');
}


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('food').style.display = 'flex';
  document.querySelector('.tab-link').classList.add('active'); 
});


// contact form
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

 
  const formData = new FormData(this);

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
