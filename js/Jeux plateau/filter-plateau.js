// ==== VARIABLES GLOBALES ====
const container = document.getElementById("catalogue");
const paginationContainer = document.getElementById("pagination");
const filterSelect = document.getElementById("filter");
const searchInput = document.getElementById("searchInput");

const checkboxesAge = document.querySelectorAll(".filter-age");
const checkboxesCoop = document.querySelectorAll(".filter-coop");
const checkboxesDifficulte = document.querySelectorAll(".filter-difficulte");
const checkboxesJoueurs = document.querySelectorAll(".filter-joueurs");

let pageActuelle = 1;
const cartesParPage = 21;

let rechercheActuelle = "";

const filtresActuels = { age: [], coop: [], difficulte: [], joueurs: [] };

// ==== FONCTIONS UTILES ====
function normaliserTexte(texte) {
  return texte
    .toLowerCase()
    .replace(/(^\p{L}|[.!?]\s+\p{L})/gu, l => l.toUpperCase());
}

// Récupérer plage de joueurs d'un jeu
function getPlageJoueurs(valeur) {
  if (!valeur) return { min: 0, max: 0 };
  valeur = valeur.replace(/\s+/g, "");
  if (valeur.includes("-")) {
    const [min, max] = valeur.split("-");
    return { min: parseInt(min), max: max.includes("+") ? Infinity : parseInt(max) };
  }
  if (valeur.includes("+")) {
    const n = parseInt(valeur);
    return { min: n, max: Infinity };
  }
  const n = parseInt(valeur);
  return { min: n, max: n };
}

// Vérifie si le jeu correspond aux filtres joueurs
function filtreParJoueurs(jeu, joueursSelectionnes) {
  if (joueursSelectionnes.length === 0) return true;
  const { min, max } = getPlageJoueurs(jeu.nbrJoueurs[0]);
  return joueursSelectionnes.some(filtre => {
    if (filtre === 1) return min <= 1 && max >= 1;
    if (filtre === 2) return min <= 2 && max >= 2;
    if (filtre === 3) return max >= 3;
  });
}

// Filtrage complet des jeux
function filtrerJeux() {
  return plateau.filter(jeu => {
    const ageJeu = jeu.age[0];
    const coopJeu = jeu.coop[0].toLowerCase();
    const diffJeu = jeu.difficulte[0];
    const joueursSelectionnes = filtresActuels.joueurs;

    const matchRecherche = rechercheActuelle === "" || jeu.nom.toLowerCase().includes(rechercheActuelle);
    const matchAge = filtresActuels.age.length === 0 || filtresActuels.age.includes(ageJeu);
    const matchCoop = filtresActuels.coop.length === 0 || filtresActuels.coop.includes(coopJeu);
    const matchDifficulte = filtresActuels.difficulte.length === 0 || filtresActuels.difficulte.includes(diffJeu);
    const matchJoueurs = filtreParJoueurs(jeu, joueursSelectionnes);

    return matchRecherche && matchAge && matchCoop && matchDifficulte && matchJoueurs;
  });
}

// Tri des jeux
function trierJeux(liste) {
  if (!filterSelect) return liste;
  let sorted = [...liste];
  switch (filterSelect.value) {
    case "alphabetical":
      sorted.sort((a, b) => a.nom.localeCompare(b.nom));
      break;
    case "nbrJoueurs":
      sorted.sort((a, b) => getPlageJoueurs(a.nbrJoueurs[0]).min - getPlageJoueurs(b.nbrJoueurs[0]).min);
      break;
    case "age":
      sorted.sort((a, b) => parseInt(a.age[0]) - parseInt(b.age[0]));
      break;
    case "duree":
      sorted.sort((a, b) => parseInt(a.duree[0]) - parseInt(b.duree[0]));
      break;
    case "coop":
      sorted.sort((a, b) => a.coop[0].localeCompare(b.coop[0]));
      break;
    case "difficulte":
      sorted.sort((a, b) => parseInt(a.difficulte[0]) - parseInt(b.difficulte[0]));
      break;
  }
  return sorted;
}

// Affichage des cartes
function afficherCartes(listeJeux) {
  container.innerHTML = "";
  listeJeux.forEach(jeu => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-header">
        <img src="${jeu.image}" alt="${jeu.nom}" class="image">
        <span class="info-btn">i</span>
        <div class="tooltip">${normaliserTexte(jeu.description[0])}</div>
      </div>
      <h3 class="nom">${jeu.nom}</h3>
      <div class="card-info">
        <p>👶 Âge : ${jeu.age[0]}</p>
        <p>👥 Joueurs : ${jeu.nbrJoueurs[0]}</p>
        <p>⏱️ Durée : ${jeu.duree[0]}</p>
        <p>🤝 Coop : ${jeu.coop[0]}</p>
        <p>🔥 Difficulté : ${jeu.difficulte[0]} / 5</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==== PAGINATION ====
function afficherJeuxPage(page = 1) {
  let jeuxFiltres = trierJeux(filtrerJeux());
  const debut = (page - 1) * cartesParPage;
  const fin = debut + cartesParPage;
  const jeuxPage = jeuxFiltres.slice(debut, fin);

  afficherCartes(jeuxPage);
  genererPagination(jeuxFiltres);
}

function genererPagination(jeuxFiltres) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(jeuxFiltres.length / cartesParPage);

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "❮";
  prevBtn.disabled = pageActuelle === 1;
  prevBtn.addEventListener("click", () => { if(pageActuelle>1){ pageActuelle--; afficherJeuxPage(pageActuelle); }});
  paginationContainer.appendChild(prevBtn);

  for(let i=1; i<=totalPages; i++){
    const btn = document.createElement("button");
    btn.textContent = i;
    if(i===pageActuelle){ btn.style.backgroundColor="#FEC944"; btn.style.color="#fff"; }
    btn.addEventListener("click", () => { pageActuelle=i; afficherJeuxPage(pageActuelle); });
    paginationContainer.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "❯";
  nextBtn.disabled = pageActuelle===totalPages;
  nextBtn.addEventListener("click", () => { if(pageActuelle<totalPages){ pageActuelle++; afficherJeuxPage(pageActuelle); } });
  paginationContainer.appendChild(nextBtn);
}

// ==== FILTRES CHECKBOX ====
function mettreAJourFiltres() {
  filtresActuels.age = [...checkboxesAge].filter(cb => cb.checked).map(cb => cb.value);
  filtresActuels.coop = [...checkboxesCoop].filter(cb => cb.checked).map(cb => cb.value);
  filtresActuels.difficulte = [...checkboxesDifficulte].filter(cb => cb.checked).map(cb => cb.value);
  filtresActuels.joueurs = [...checkboxesJoueurs].filter(cb => cb.checked).map(cb => parseInt(cb.value));

  pageActuelle = 1;
  afficherJeuxPage(pageActuelle);
}

[...checkboxesAge, ...checkboxesCoop, ...checkboxesDifficulte, ...checkboxesJoueurs]
  .forEach(cb => cb.addEventListener("change", mettreAJourFiltres));

// ==== RECHERCHE ====
searchInput.addEventListener("input", (e) => {
  rechercheActuelle = e.target.value.toLowerCase().trim();
  pageActuelle = 1;
  afficherJeuxPage(pageActuelle);
});

// ==== TRI SELECT ====
if(filterSelect){
  filterSelect.addEventListener("change", () => { pageActuelle=1; afficherJeuxPage(pageActuelle); });
}

// ==== MENUS DÉROULANTS (ouvrir/fermer) ====
document.querySelectorAll(".filter-toggle").forEach(button => {
  button.addEventListener("click", e => {
    e.stopPropagation();
    const parentGroup = button.closest(".filter-group");
    const options = parentGroup.querySelector(".filter-options");
    document.querySelectorAll(".filter-options").forEach(opt => { if(opt!==options) opt.style.display="none"; });
    options.style.display = options.style.display==="block" ? "none" : "block";
  });
});
document.querySelectorAll(".filter-options").forEach(menu => menu.addEventListener("click", e => e.stopPropagation()));
document.addEventListener("click", () => document.querySelectorAll(".filter-options").forEach(opt => opt.style.display="none"));

// ==== AFFICHAGE INITIAL ====
afficherJeuxPage(pageActuelle);