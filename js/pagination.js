const container = document.getElementById("catalogue");
const paginationContainer = document.getElementById("pagination");
let pageActuelle = 1;
const cartesParPage = 21; 

function afficherCartes(listeJeux) {
  container.innerHTML = "";
  listeJeux.forEach(jeu => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${jeu.image}" alt="${jeu.nom}" class="image">
      <h3 class="nom">${jeu.nom}</h3>
      <div class="card-info">
        <p><strong>Genre :</strong> ${jeu.genre.join(", ")}</p>
        <p><strong>Console :</strong> ${jeu.console.join(", ")}</p>
        <p><strong>Mode :</strong> ${jeu.mode.join(", ")}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function afficherJeuxPage(page = 1) {

  jeux.sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' }));

  let jeuxFiltres = jeux;

  // appliquer recherche si existe
  if (typeof rechercheActuelle !== "undefined" && rechercheActuelle !== "") {
    jeuxFiltres = jeuxFiltres.filter(jeu =>
      jeu.nom.toLowerCase().includes(rechercheActuelle.toLowerCase())
    );
  }

  // appliquer filtres si existent
  if (typeof filtresActuels !== "undefined") {
    if (filtresActuels.console.length > 0) {
      jeuxFiltres = jeuxFiltres.filter(jeu =>
        filtresActuels.console.some(f =>
          jeu.console.map(c => c.toLowerCase()).includes(f)
        )
      );
    }
    if (filtresActuels.mode.length > 0) {
      jeuxFiltres = jeuxFiltres.filter(jeu =>
        filtresActuels.mode.some(f =>
          jeu.mode.map(m => m.toLowerCase()).includes(f)
        )
      );
    }
    if (filtresActuels.genre.length > 0) {
      jeuxFiltres = jeuxFiltres.filter(jeu =>
        filtresActuels.genre.some(f =>
          jeu.genre.map(g => g.toLowerCase()).includes(f)
        )
      );
    }
  }

  // pagination
  const debut = (page - 1) * cartesParPage;
  const fin = debut + cartesParPage;
  const jeuxPage = jeuxFiltres.slice(debut, fin);

  afficherCartes(jeuxPage);
  genererPagination(jeuxFiltres);
}

function genererPagination(jeuxFiltres) {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(jeuxFiltres.length / cartesParPage);
  const maxPagesVisible = 3; // nombre de pages visibles autour de la page actuelle

  // Bouton "<"
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "❮";
  prevBtn.disabled = pageActuelle === 1;
  prevBtn.addEventListener("click", () => {
    if (pageActuelle > 1) {
      pageActuelle--;
      afficherJeuxPage(pageActuelle);
    }
  });
  paginationContainer.appendChild(prevBtn);

  // Toujours afficher la première page
  const firstBtn = document.createElement("button");
  firstBtn.textContent = 1;
  if (pageActuelle === 1) {
    firstBtn.style.backgroundColor = "#FEC944";
    firstBtn.style.color = "#fff";
  }
  firstBtn.addEventListener("click", () => {
    pageActuelle = 1;
    afficherJeuxPage(pageActuelle);
  });
  paginationContainer.appendChild(firstBtn);

  // Points de suspension avant
  if (pageActuelle > 3) {
    const dotsBefore = document.createElement("span");
    dotsBefore.textContent = "...";
    dotsBefore.style.margin = "0 5px";
    paginationContainer.appendChild(dotsBefore);
  }

  // Pages autour de la page actuelle
  let debut = Math.max(2, pageActuelle - 1);
  let fin = Math.min(totalPages - 1, pageActuelle + 1);
  for (let i = debut; i <= fin; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === pageActuelle) {
      btn.style.backgroundColor = "#FEC944";
      btn.style.color = "#fff";
    }
    btn.addEventListener("click", () => {
      pageActuelle = i;
      afficherJeuxPage(pageActuelle);
    });
    paginationContainer.appendChild(btn);
  }

  // Points de suspension après
  if (pageActuelle < totalPages - 2) {
    const dotsAfter = document.createElement("span");
    dotsAfter.textContent = "...";
    dotsAfter.style.margin = "0 5px";
    paginationContainer.appendChild(dotsAfter);
  }

  // Toujours afficher la dernière page si > 1
  if (totalPages > 1) {
    const lastBtn = document.createElement("button");
    lastBtn.textContent = totalPages;
    if (pageActuelle === totalPages) {
      lastBtn.style.backgroundColor = "#FEC944";
      lastBtn.style.color = "#fff";
    }
    lastBtn.addEventListener("click", () => {
      pageActuelle = totalPages;
      afficherJeuxPage(pageActuelle);
    });
    paginationContainer.appendChild(lastBtn);
  }

  // Bouton ">"
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "❯";
  nextBtn.disabled = pageActuelle === totalPages;
  nextBtn.addEventListener("click", () => {
    if (pageActuelle < totalPages) {
      pageActuelle++;
      afficherJeuxPage(pageActuelle);
    }
  });
  paginationContainer.appendChild(nextBtn);
}

// affichage initial
afficherJeuxPage(pageActuelle);



