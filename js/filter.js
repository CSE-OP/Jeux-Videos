const checkboxesConsole = document.querySelectorAll(".filter-console");
const checkboxesMode = document.querySelectorAll(".filter-mode");
const checkboxesGenre = document.querySelectorAll(".filter-genre");

let filtresActuels = { console: [], mode: [], genre: [] };

// --- GESTION DES MENUS DÉROULANTS (ouverture/fermeture) ---
document.querySelectorAll(".filter-toggle").forEach(button => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const parentGroup = button.closest(".filter-group");
    const options = parentGroup.querySelector(".filter-options");

    // Ferme tous les autres filtres
    document.querySelectorAll(".filter-options").forEach(opt => {
      if (opt !== options) opt.style.display = "none";
    });

    // Alterne l'affichage du filtre cliqué
    options.style.display = options.style.display === "block" ? "none" : "block";
  });
});

// --- EMPÊCHER LA FERMETURE SI ON COCHE ---
document.querySelectorAll(".filter-options").forEach(menu => {
  menu.addEventListener("click", (e) => {
    e.stopPropagation(); // bloque la fermeture du menu quand on coche
  });
});

// --- FERMER LES MENUS QUAND ON CLIQUE AILLEURS ---
document.addEventListener("click", () => {
  document.querySelectorAll(".filter-options").forEach(opt => opt.style.display = "none");
});


// --- FILTRAGE des jeux ---
function mettreAJourFiltres() {
  filtresActuels.console = Array.from(checkboxesConsole)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  filtresActuels.mode = Array.from(checkboxesMode)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  filtresActuels.genre = Array.from(checkboxesGenre)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  pageActuelle = 1;
  afficherJeuxPage(pageActuelle);
}

// --- Rattacher les écouteurs ---
[...checkboxesConsole, ...checkboxesMode, ...checkboxesGenre].forEach(cb =>
  cb.addEventListener("change", mettreAJourFiltres)
);

// --- Fonction de vérification d’un jeu ---
function jeuCorrespondAuxFiltres(jeu) {
  const matchConsole =
    filtresActuels.console.length === 0 ||
    filtresActuels.console.some(f => jeu.console.map(c => c.toLowerCase()).includes(f));

  const matchMode =
    filtresActuels.mode.length === 0 ||
    filtresActuels.mode.some(f => jeu.mode.map(m => m.toLowerCase()).includes(f));

    const matchGenre =
    filtresActuels.genre.length === 0 ||
    filtresActuels.genre.some(f =>
      jeu.genre.some(g => g.split(',').map(x => x.trim()).includes(f))
    );

  return matchConsole && matchMode && matchGenre;
} 

