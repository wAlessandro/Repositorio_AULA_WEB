const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const results = document.getElementById("results");

async function buscarSeries() {
    const termo = input.value.trim();
    results.innerHTML = "";

    if (termo === "") {
    results.innerHTML = `
        <p class="message">Digite algo para pesquisar.</p>
    `;
    return;
    }

    try {
    const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${termo}`
    );

    const data = await response.json();
    if (data.length === 0) {
        results.innerHTML = `
        <p class="message">Nenhuma série encontrada.</p>
        `;
        return;
    }

    data.forEach(item => {
        const serie = item.show;

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");

        if (serie.image && serie.image.medium) {
        img.src = serie.image.medium;
        } else {
        img.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
        }

        img.alt = serie.name;

        const content = document.createElement("div");
        content.classList.add("card-content");

        const title = document.createElement("h3");
        title.textContent = serie.name;

        const score = document.createElement("p");
        score.textContent = `Score: ${item.score.toFixed(2)}`;

        content.appendChild(title);
        content.appendChild(score);

        card.appendChild(img);
        card.appendChild(content);

        results.appendChild(card);
    });

    } catch (error) {
    results.innerHTML = `
        <p class="message">Erro ao buscar séries.</p>
    `;

    console.error("Erro:", error);
    }
}

button.addEventListener("click", buscarSeries);

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    buscarSeries();
    }
});