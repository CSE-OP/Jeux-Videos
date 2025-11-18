const nouveautes = [
  { nom: "Fc26", genre: ["Sport"], console: ["Ps5"], mode: ["Solo", "Multijoueur En Ligne", "Multijoueur Local"], image: "https://image.jeuxvideo.com/medias-sm/175268/1752682779-9893-jaquette-avant.png" },
  { nom: "Ghost Of Yoteï", genre: ["Action", "Rpg"], console: ["Ps5"], mode: ["Solo"], image: "https://image.jeuxvideo.com/medias-sm/172724/1727242081-2106-jaquette-avant.jpg" },
  { nom: "Ninja Gaiden 4", genre: ["Action", "Hack’N Slash"], console: ["Ps5"], mode: ["Solo", "Multijoueur En Ligne"], image: "https://image.jeuxvideo.com/medias-sm/176103/1761031910-9233-jaquette-avant.jpg" },
  { nom: "Lost Soul Aside", genre: ["Action", "Rpg"], console: ["Ps5"], mode: ["Solo"], image: "https://image.jeuxvideo.com/medias-sm/175569/1755689915-2970-jaquette-avant.jpg" },
  { nom: "Call Of Duty: Black Ops 7", genre: ["Action", "Fps"], console: ["Ps5"], mode: ["Solo", "Multijoueur En Ligne", "Multijoueur Local", "Coop Local", "Coop En Ligne"], image: "https://image.jeuxvideo.com/medias-sm/174965/1749654399-2306-jaquette-avant.jpg" },
  { nom: "Clair Obscur: Expédition 33", genre: ["Rpg", "Fantastique"], console: ["Ps5"], mode: ["Solo"], image: "https://image.jeuxvideo.com/medias-sm/171803/1718033257-8476-jaquette-avant.jpg" },
  { nom: "Cobra", genre: ["Action"], console: ["Switch"], mode: ["Solo", "Multijoueur"], image: "https://image.jeuxvideo.com/images-sm/cp/c/o/cobrcp0f.jpg" },

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
        <p><strong>Genre :</strong> ${jeu.genre.join(", ")}</p>
        <p><strong>Console :</strong> ${jeu.console.join(", ")}</p>
        <p><strong>Mode :</strong> ${jeu.mode.join(", ")}</p>
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
