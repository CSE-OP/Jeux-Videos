const nouveautes = [
  { nom: "Monster Hunter Stories 3", genre: ["Rpg"], console: ["Ps5"], mode: ["Solo"], image: "https://www.monsterhunter.com/stories3/assets/images/share_en.png" },
  { nom: "Crimson Dessert", genre: ["Action", "Rpg"], console: ["Ps5"], mode: ["Solo"], image: "https://image.jeuxvideo.com/medias-sm/177376/1773757035-5941-jaquette-avant.jpg" },
  { nom: "Nioh 3", genre: ["Action", "Rpg"], console: ["Ps5"], mode: ["Solo", "Coop Local"], image: "https://image.jeuxvideo.com/medias-sm/175913/1759132155-8435-jaquette-avant.jpg" },
  { nom: "Mario Tennis Fever", genre: ["Sport", "Arcade"], console: ["Switch 2"], mode: ["Solo", "Multijoueur Local", "Multijoueur En Ligne", "Coop Local", "Coop En Ligne"], image: "https://image.jeuxvideo.com/medias-sm/175771/1757709734-4787-jaquette-avant.jpg" },
  { nom: "Dragonquest Vii Reimagined", genre: ["Rpg", "Tour À Tour"], console: ["Switch 2"], mode: ["Solo"], image: "https://image.jeuxvideo.com/medias-sm/176277/1762770390-2457-jaquette-avant.jpg" },
  { nom: "Pokemon - Pokopia", genre: ["Rpg"], console: ["Switch 2"], mode: ["Solo"], image: "https://image.jeuxvideo.com/medias-sm/175771/1757707202-8974-jaquette-avant.jpg" },
  { nom: "Yakuza 0", genre: ["Action", "Aventure"], console: ["Switch 2"], mode: ["Solo"], image: "https://image.jeuxvideo.com/medias-sm/174402/1744016178-7550-jaquette-avant.jpg" },
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
