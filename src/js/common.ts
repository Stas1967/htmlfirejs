import "../css/styles.css";
import logoImg from "../assets/logodimini.webp"; // Importa la imagen
import icoImg from "../assets/favicon.ico";

document.addEventListener("DOMContentLoaded", function () {
  // Lista de enlaces de navegación
  const navLinks = [
    { href: "/index.html", text: "Home", icon: "home" },
    { href: "/about/index.html", text: "About", icon: "info" },
    { href: "/blog/index.html", text: "Blog", icon: "rss_feed" },
    { href: "/galeria/index.html", text: "Galery", icon: "collections" },
    { href: "/shop/index.html", text: "Shop", icon: "shopping_bag" },
    { href: "/contact/index.html", text: "Contact", icon: "email" },
  ];

  // Genera el listado de enlaces dinámicamente
  const navLinksHTML = navLinks
    .map(
      (link) => `<a href="${link.href}" class="nav-link">      
      <span class="material-icons">${link.icon}</span>
      <span class="ahide">${link.text}</span>
    </a>`
    )
    .join("");

  // Estructura del navbar
  const navbarHTML = `
    <nav class="navbar">   
      <div class="navcontainer">
       <button class="burger"><span class="material-icons">menu</span></button>
        <img class="logo" src="${logoImg}" alt="htmlfirejs">
        ${navLinksHTML}
      </div>
      <div class="nav-login">
        <a href="/login.html" class="nav-link">
        <span class="material-icons">😀</span>
        <span>Login</span>
        </a>
      </div>
    </nav>
  `;
  // Inserta el navbar en el DOM
  const body: HTMLBodyElement | null = document.querySelector("body");
  body?.insertAdjacentHTML("afterbegin", navbarHTML);
  const currentPage = window.location.pathname.split("/").pop();
  const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".nav-link")
  links.forEach((link) => {
    const linkHref = link.getAttribute("href")?.replace(".html", "");
    const modifLink = linkHref?.split("/")[1];
    // Agregar clase `active` al enlace actual
    if (modifLink === currentPage) {
      link.classList.add("active");
    }
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Evita la navegación inmediata
      const targetUrl = link.getAttribute("href");
      showLoader(); // Muestra el loader
      setTimeout(() => {
        window.location.href = targetUrl || ''; // Navega a la nueva página después de un breve retraso
      }, 500); // Ajusta el tiempo según la duración de tu animación
    });
  });
  hideLoader();
});
// Agregar el favicon al header
const faviconLink = document.createElement("link");
faviconLink.rel = "icon";
faviconLink.type = "image/x-icon";
faviconLink.href = icoImg;
document.head.appendChild(faviconLink);

// Agregar el footer al final de la página
const footerHTML = `
  <footer>
   <p>&copy; ${new Date().getFullYear()} htmlfirejs. All rights reserved.</p>
  </footer>
`;
// Crea un contenedor para el footer
const footerContainer = document.createElement("div");
footerContainer.innerHTML = footerHTML;
// Inserta el footer en el DOM
document.body.appendChild(footerContainer);

// Loader
const loadAnim = `
<div class="sk-cube-grid">
  <div class="sk-cube sk-cube1"></div>
  <div class="sk-cube sk-cube2"></div>
  <div class="sk-cube sk-cube3"></div>
  <div class="sk-cube sk-cube4"></div>
  <div class="sk-cube sk-cube5"></div>
  <div class="sk-cube sk-cube6"></div>
  <div class="sk-cube sk-cube7"></div>
  <div class="sk-cube sk-cube8"></div>
  <div class="sk-cube sk-cube9"></div>
</div>`;
// crear backstage con spinner al navegar
const backstage: HTMLDivElement | null = document.createElement("div");
backstage.innerHTML = loadAnim;
backstage.classList.add("backstage");
document.body.appendChild(backstage);

// Mostrar el loader antes de navegar
const showLoader = () => {
  if (backstage) {
    backstage.classList.add("fade-in"); // Aplica la animación de entrada
    backstage.classList.remove("fade-out");
    backstage.style.display = "flex"; // Asegúrate de que sea visible
  }
};

// Ocultar el loader después de cargar la página
const hideLoader = () => {
  if (backstage) {
    backstage.classList.add("fade-out"); // Aplica la animación de salida
    backstage.classList.remove("fade-in");
    setTimeout(() => {
      backstage.style.display = "none"; // Oculta el loader después de la animación
    }, 500); // Ajusta el tiempo según la duración de tu animación
  }
};

const scrolltop = document.createElement("div");
scrolltop.innerHTML = `
<div class="topbtn">
<span class="material-icons">
arrow_upward
</span>
<span>Go top</span></div>`;
scrolltop.classList.add("scrolltop");
document.body.appendChild(scrolltop);

// Mostrar el botón cuando se hace scroll hacia abajo
window.addEventListener("scroll", () => {
  if (window.scrollY > 150) {
    scrolltop.style.display = "block";
  } else {
    scrolltop.style.display = "none";
  }
});

// Funcionalidad para hacer scroll hacia arriba
scrolltop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
