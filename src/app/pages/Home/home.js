document.querySelectorAll('.btn-menu').forEach(button => {
  button.addEventListener('click', () => {
    const page = button.textContent.toLowerCase(); // ex: "accueil"
    fetch(`${page}.html`)
      .then(res => res.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
      });
  });
});
