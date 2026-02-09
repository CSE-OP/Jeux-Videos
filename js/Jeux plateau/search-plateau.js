const searchInput = document.getElementById("searchInput");
let rechercheActuelle = "";

searchInput.addEventListener("input", (e) => {
  rechercheActuelle = e.target.value.toLowerCase().trim();
  pageActuelle = 1;

  // Applique la recherche en filtrant les jeux avant d'afficher
  afficherJeuxPage(pageActuelle);
});

// Dans afficherJeuxPage() ou dans filtrerJeux(), il faut ajouter :

function filtrerJeux() {
  return plateau.filter(jeu => {
    const nomJeu = jeu.nom.toLowerCase();

    // Vérifie si la recherche texte correspond
    const matchRecherche = rechercheActuelle === "" || nomJeu.includes(rechercheActuelle);

    // Ici tu peux combiner avec tes filtres actuels (age, coop, difficulte)
    const matchAge = filtresActuels.age.length === 0 || filtresActuels.age.includes(jeu.age[0]);
    const matchCoop = filtresActuels.coop.length === 0 || filtresActuels.coop.includes(jeu.coop[0].toLowerCase());
    const matchDifficulte = filtresActuels.difficulte.length === 0 || filtresActuels.difficulte.includes(jeu.difficulte[0]);

    return matchRecherche && matchAge && matchCoop && matchDifficulte;
  });
}
