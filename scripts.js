document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      alert('Vous avez lancé le jeu!');
    });
  });
});
