const nouveautes = [
  { nom: "Take Time", nbrJoueurs: ["2-4"], age: ["10+"], duree: ["< 30 Min"],  coop: ["Oui"], difficulte: ["3"], description: ["Jeu de déduction à communication limitée dans lequel les joueurs collaborent pour résoudre des énigmes d'horloges mystérieuses en plaçant les cartes autour d'un cadran"], image: "https://cdn1.philibertnet.com/829659-large_default/take-time.jpg" },
  { nom: "Behind - Purple", nbrJoueurs: ["1-10"], age: ["12+"], duree: ["30-60 Min"],  coop: ["Oui"], difficulte: ["3"], description: ["Des tableaux à reconstituer qui font appel à des logiques d'assemblage inédites !"], image: "https://cdn3.philibertnet.com/812148-large_default/behind-purple.jpg" },
  { nom: "DJ Set", nbrJoueurs: ["3-10"], age: ["10+"], duree: ["< 30 Min"],  coop: ["Oui", "Non"], difficulte: ["2"], description: ["Dans ce quiz unique, oublie le titre et l'artiste: chaque chanson cache un thème à deviner. Plus de 500 musiques réparties en 80 thèmes pour des heures de défis."], image: "https://cdn1.philibertnet.com/791488-large_default/dj-set-quiz-musical.jpg" },
  { nom: "Cabanga", nbrJoueurs: ["3-6"], age: ["8+"], duree: ["< 30 Min"],  coop: ["Non"], difficulte: ["2"], description: ["C'est un jeu de cartes simple et plein de rebondissements dans lequel les joueurs devront se débarasser de leurs cartes en les plaçant astucieusement."], image: "https://cdn1.philibertnet.com/589839-large_default/cabanga.jpg" },
  { nom: "Mon Premier Unlock: Histoires De Canard", nbrJoueurs: ["1-4"], age: ["4+"], duree: ["< 30 Min"],  coop: ["Oui"], difficulte: ["1"], description: ["Une adaptation du célèbre jeu d'enquêtes Unlock, pour les tout petits dès 4 ans et sans application !"], image: "https://cdn3.philibertnet.com/775093-large_default/mon-premier-unlock-histoires-de-canard.jpg" },
  
];

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const dotsContainer = document.querySelector(".dots");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let current = 0;

  // --------------------------------------------------------
  // 1. Création des slides + dots dans le DOM
  // --------------------------------------------------------
  nouveautes.forEach((jeu, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
 slide.innerHTML = `
      <img src="${jeu.image}" alt="${jeu.nom}">
      <h3 class="nom">${jeu.nom}</h3>
      <div class="card-info">
          <p>👥 ${jeu.nbrJoueurs}</p>
          <p>👶 ${jeu.age}</p>
          <p>⏱️ ${jeu.duree}</p>
          <p>🤝 ${jeu.coop}</p>
          <p>🔥 ${jeu.difficulte} / 5</p>
      </div>
    `;

    slider.appendChild(slide);

    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      current = index;
      updateSlides();
    });

    dotsContainer.appendChild(dot);
  });

  // Maintenant que tout est créé, on peut récupérer les éléments
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));

  // --------------------------------------------------------
  // 2. Mise à jour de l'affichage du slider
  // --------------------------------------------------------
  function updateSlides() {
    const total = slides.length;

    // Réinitialisation de tous les slides
    slides.forEach(slide => {
      slide.classList.remove("active");
      slide.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      slide.style.opacity = 0;
      slide.style.zIndex = 0;
    });

    // Système de positions selon nombre de slides
    let positions;

    if (total >= 5) {
      positions = [
        { x: -420, scale: 0.7, opacity: 0.3, z: 0 },
        { x: -230, scale: 0.85, opacity: 0.6, z: 1 },
        { x: 0, scale: 1.15, opacity: 1, z: 3 },
        { x: 230, scale: 0.85, opacity: 0.6, z: 1 },
        { x: 420, scale: 0.7, opacity: 0.3, z: 0 }
      ];
    } else if (total === 4) {
      positions = [
        { x: -230, scale: 0.85, opacity: 0.6, z: 1 },
        { x: -100, scale: 0.9, opacity: 0.8, z: 2 },
        { x: 0, scale: 1.1, opacity: 1, z: 3 },
        { x: 150, scale: 0.9, opacity: 0.8, z: 2 }
      ];
    } else if (total === 3) {
      positions = [
        { x: -150, scale: 0.9, opacity: 0.7, z: 1 },
        { x: 0, scale: 1.1, opacity: 1, z: 3 },
        { x: 150, scale: 0.9, opacity: 0.7, z: 1 }
      ];
    } else if (total === 2) {
      positions = [
        { x: -100, scale: 0.9, opacity: 0.7, z: 1 },
        { x: 100, scale: 1, opacity: 1, z: 2 }
      ];
    } else {
      positions = [{ x: 0, scale: 1, opacity: 1, z: 3 }];
    }

    // Fonction pour gérer les index cycliques
    const getIndex = i => (i + total) % total;

    // Indices des slides à afficher
    const indices = [];
    for (let i = 0; i < positions.length; i++) {
      indices.push(getIndex(current - Math.floor(positions.length / 2) + i));
    }

    // Affectation des styles
    indices.forEach((idx, i) => {
      const slide = slides[idx];
      const p = positions[i];

      if (!slide || !p) return;

      slide.style.opacity = p.opacity;
      slide.style.zIndex = p.z;
      slide.style.transform = `translateX(calc(-50% + ${p.x}px)) scale(${p.scale})`;
    });

    // Slide actif
    slides[indices[Math.floor(positions.length / 2)]].classList.add("active");

    // Dots
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  // --------------------------------------------------------
  // 3. Boutons
  // --------------------------------------------------------
  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlides();
  });

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    updateSlides();
  });

  // Lancement initial
  updateSlides();
});
