// Função para rolagem suave ao clicar nos links do menu
function smoothScroll(target, duration) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = document.querySelector(target).offsetTop - headerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

// Adicionar evento de clique suave para os links do menu
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
link.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    smoothScroll(target, 1000);
    // Remover a classe 'active' de todos os links do menu
    navLinks.forEach(link => link.classList.remove('active'));
    // Adicionar a classe 'active' ao link do menu atual
    link.classList.add('active');
});
});

// Destacar a seção atual no menu enquanto a página é rolada
window.addEventListener('scroll', () => {
const scrollPosition = window.pageYOffset + window.innerHeight / 2;
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
    // Remover a classe 'active' de todos os links do menu
    navLinks.forEach(link => link.classList.remove('active'));
    // Adicionar a classe 'active' ao link do menu correspondente à seção atual
    const activeLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');
    }
});
});