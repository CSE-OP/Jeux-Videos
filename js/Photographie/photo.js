const container = document.getElementById("cards");

function renderCards(data) {
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
    <h2>${item.marque}</h2>
      <h4>${item.nom}</h4>

      ${item.accessoire ? `<p class="accessoire">${item.accessoire}</p>` : ""}

      <div>
        ${item.photo === "oui" ? `<span class="badge photo">📷 Photo</span>` : ""}
        ${item.video === "oui" ? `<span class="badge video">🎥 Vidéo</span>` : ""}
      </div>
    `;

    container.appendChild(card);
  });
}

renderCards(photographie);

document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
  
      const type = tab.dataset.type;
  
      if (type === "all") {
        renderCards(photographie);
      } else {
        renderCards(
          photographie.filter(item => item.materiel === type)
        );
      }
    });
  });
  