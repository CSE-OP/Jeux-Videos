const nouveautes = [
  
];
  
  document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const dotsContainer = document.querySelector(".dots");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
  
    let current = 0;
  
    // Création des slides et des dots
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
  
    const slides = Array.from(document.querySelectorAll(".slide"));
    const dots = Array.from(document.querySelectorAll(".dot"));
  
    function updateSlides() {
      const total = slides.length;
    
      slides.forEach(slide => {
        slide.classList.remove("active");
        slide.style.transition = "transform 0.6s ease, opacity 0.6s ease";
        slide.style.opacity = 0;
        slide.style.zIndex = 0;
      });
    
      const getIndex = i => (i + total) % total;
    
      // Calcul dynamique des positions selon le nombre de slides
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
    
      // Calcul des indices à afficher
      const indices = [];
      for (let i = 0; i < positions.length; i++) {
        indices.push(getIndex(current - Math.floor(positions.length / 2) + i));
      }
    
      indices.forEach((idx, i) => {
        const p = positions[i];
        const slide = slides[idx];
        slide.style.opacity = p.opacity;
        slide.style.zIndex = p.z;
        slide.style.transform = `translateX(calc(-50% + ${p.x}px)) scale(${p.scale})`;
      });
    
      slides[indices[Math.floor(positions.length / 2)]].classList.add("active");
    
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    }
  
    prevBtn.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      updateSlides();
    });
  
    nextBtn.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      updateSlides();
    });
  
    updateSlides();
  });