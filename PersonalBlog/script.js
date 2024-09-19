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


