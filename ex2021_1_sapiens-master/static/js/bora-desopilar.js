const navSlide = () => {
    const burger = document.querySelector('.burger')
    const nav = document.querySelector('.nav-links')
    const navLinks = document.querySelectorAll('.nav-links li')

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
            }
        });
        //Burger Animation
        burger.classList.toggle('toggle');
    })

}
navSlide();


document.querySelector("#items")
.addEventListener("wheel", event => {
  if(event.deltaY > 0) {
    event.target.scrollBy(300, 0)
  } else {
    event.target.scrollBy(-300, 0)
  }
})