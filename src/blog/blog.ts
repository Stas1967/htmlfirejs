const articleList: HTMLElement | null = document.getElementById("article-list");
const listItem: HTMLLIElement | null = document.createElement("li");
const articleContent: HTMLElement | null = document.getElementById("article-content");
if (articleList) {
  for (let i = 0; i < 3; i++) {
    listItem.innerHTML = `
            <h3>
                <a href="/blog/article.html?id=${i}">Título del Artículo ${i + 1
      }</a>
            </h3>
            <p>Resumen del artículo ${i + 1}</p>
        `;
    articleList?.appendChild(listItem);
  }
}
//blog/article.html
if (document.getElementById("article-content")) {
  // Obtiene el ID del artículo de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");
  // Si no se encuentra el ID, muestra un mensaje de error
  if (articleId === null) {
    if (articleContent) {
      articleContent.innerHTML = `<p>Artículo no encontrado.</p>`;
    }
  } else {
    // Muestra el contenido del artículo basado en el ID
    if (articleContent) {
      articleContent.innerHTML = `
            <h1>Título del Artículo ${articleId}</h1>
            <p>Contenido del artículo ${articleId}</p>
        `;
    }
  }
}
