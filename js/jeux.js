document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("catalogue");
    const filterSelect = document.getElementById("filter");
  
    function afficherJeux(filter = "all") {
      container.innerHTML = "";
      let sortedJeux = [...jeux]; // <== "jeux" vient de catalogue-jeux.js
  
      switch(filter) {
        case "alphabetical":
          sortedJeux.sort((a, b) => a.nom.localeCompare(b.nom));
          break;
        case "genre":
          sortedJeux.sort((a, b) => a.genre.localeCompare(b.genre));
          break;
        case "console":
          sortedJeux.sort((a, b) => a.console.join(", ").localeCompare(b.console.join(", ")));
          break;
        case "mode":
          sortedJeux.sort((a, b) => a.mode.join(", ").localeCompare(b.mode.join(", ")));
          break;
      }

  
      sortedJeux.forEach(jeu => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${jeu.image}" alt="${jeu.nom}" class="image">
          <h3 class="nom">${jeu.nom}</h3>
          <div class="card-info">
            <p><strong>Genre :</strong> ${jeu.genre}</p>
            <p><strong>Console :</strong> ${jeu.console.join(", ")}</p>
            <p><strong>Mode :</strong> ${jeu.mode.join(", ")}</p>
          </div>
        `;
        container.appendChild(card);
      });
    }
  
    // affichage initial
   // afficherJeux();
  
    /* filtrage au changement
    filterSelect.addEventListener("change", () => {
      afficherJeux(filterSelect.value);
    }); */
  }); 