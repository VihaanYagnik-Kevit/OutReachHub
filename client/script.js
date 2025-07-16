//nav-hamburger-start
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    console.log("reached")
    navMenu.classList.toggle('active');
});
//nav-hamburger-end

