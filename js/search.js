const searchInput = document.getElementById("searchInput");
let rechercheActuelle = "";

searchInput.addEventListener("input", (e) => {
  rechercheActuelle = e.target.value.toLowerCase().trim();
  pageActuelle = 1;
  afficherJeuxPage(pageActuelle);
});
