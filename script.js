const form = document.querySelector('form');
const sortWeightButton = document.querySelector('#sortByWeightButton')
const sortHeightButton = document.querySelector('#sortByHeightButton')
const filterByTypeSelector = document.querySelector('select');
let pokemonArray = [];
let pokemonChart; 

const submitAmount = (event) => {
    event.preventDefault();
    const amountOfPokemon = (event.target[0].value);
    const limitLinkSnippet = "?offset=0&limit="
    const apiLink = "https://pokeapi.co/api/v2/pokemon/"


    fetch(apiLink + limitLinkSnippet + amountOfPokemon)
    .then(response => response.json())
    .then (data => {
        const cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = "";
        pokemonArray = [];


        for (let i = 0; i< amountOfPokemon; i++ ){
                let pokemonName = data.results[i].name
                fetch(apiLink + pokemonName)
                .then(response => response.json())
                .then (pokemonData => {
                    const pokemonCard = new PokemonCard(pokemonData);
                    cardContainer.appendChild(pokemonCard.renderCard());  
                    pokemonArray.push(pokemonCard);

                    if (pokemonArray.length === parseInt(amountOfPokemon)) {
                        const pokemonNames = [];
                        const pokemonWeights = [];
                        const pokemonHeights = [];
                        
                        for (let j = 0; j < pokemonArray.length; j++) {
                            pokemonNames.push(pokemonArray[j].name);
                            pokemonWeights.push(pokemonArray[j].weight);
                            pokemonHeights.push(pokemonArray[j].height);
                        } 

                        updateChart(pokemonNames, pokemonWeights, pokemonHeights);
                    }
                })  
        }

        const sortWeight = (event) =>{
            event.preventDefault();
            pokemonArray.sort((a, b) => a.weight - b.weight);
            cardContainer.innerHTML = "";
            pokemonArray.forEach(pokemonCard => {
                cardContainer.appendChild(pokemonCard.renderCard());
            });
            
            const sortedNames = [];
            const sortedWeights = [];
            const sortedHeights = [];
            
            for (let i = 0; i < pokemonArray.length; i++) {
            sortedNames.push(pokemonArray[i].name);
            sortedWeights.push(pokemonArray[i].weight);
            sortedHeights.push(pokemonArray[i].height);
            
            }

            updateChart(sortedNames, sortedWeights, sortedHeights);
        }

        const sortHeight = (event) =>{
            event.preventDefault();
            pokemonArray.sort((a, b) => a.height - b.height);
            cardContainer.innerHTML = "";
            pokemonArray.forEach(pokemonCard => {
                cardContainer.appendChild(pokemonCard.renderCard());
            });

            const sortedNames = [];
            const sortedWeights = [];
            const sortedHeights = [];
            
            for (let i = 0; i < pokemonArray.length; i++) {
            sortedNames.push(pokemonArray[i].name);
            sortedWeights.push(pokemonArray[i].weight);
            sortedHeights.push(pokemonArray[i].height);
            }

            updateChart(sortedNames, sortedWeights, sortedHeights);
        }

        const filterByType = event =>{
            event.preventDefault();
            const selectedType = event.target.value;

            if (selectedType === "all") {
                renderFilteredCards(pokemonArray);
            } else {
                const filteredArray = pokemonArray.filter(pokemonCard => 
                    pokemonCard.types.includes(selectedType)
                );
                renderFilteredCards(filteredArray);
            }
        }
        const renderFilteredCards = (filteredArray) => {
            cardContainer.innerHTML = ""; 
            filteredArray.forEach(pokemonCard => {
                cardContainer.appendChild(pokemonCard.renderCard()); 
            });
        }
        sortWeightButton.addEventListener("click",sortWeight);
        sortHeightButton.addEventListener("click",sortHeight);
        filterByTypeSelector.addEventListener("change", filterByType);
    })
}

form.addEventListener("submit", submitAmount);

const updateChart = (labels, weights, heights) => {
    const ctx = document.getElementById('pokemonChart').getContext('2d');

    if (pokemonChart) {
        pokemonChart.destroy();
    }

    pokemonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Weight of Pokémon (hg)',
                    data: weights,
                    backgroundColor: '#8b0000',
                    borderColor: '#ffffff',
                    borderWidth: 1
                },
                {
                    label: 'Height of Pokémon (dm)',
                    data: heights,
                    backgroundColor: '#FF0000',
                    borderColor: '#ffffff',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            }
        }
    });
};


class PokemonCard {
    constructor(pokemonData) {
        this.name = pokemonData.name;
        this.imageSrc = pokemonData.sprites.front_default;
        this.weight = pokemonData.weight;
        this.height = pokemonData.height;
        this.types = [];
        for (let i = 0; i < pokemonData.types.length; i++) {
            this.types.push(pokemonData.types[i].type.name);
        }
    }
    renderCard() {
        const card = document.createElement('div');
        card.classList.add('card');

        const pokemonTitle = document.createElement('h2');
        pokemonTitle.innerText = this.name;
        pokemonTitle.classList.add('card-title');

        const pokemonImage = document.createElement('img');
        pokemonImage.src = this.imageSrc;

        const weightElement = document.createElement('p');
        weightElement.innerText = "Weight: " + this.weight + "hg";
        weightElement.classList.add('card-paragraph');

        const heightElement = document.createElement('p');
        heightElement.innerText = "Height: " + this.height + "dm";
        heightElement.classList.add('card-paragraph');

        card.appendChild(pokemonTitle);
        card.appendChild(pokemonImage);
        card.appendChild(weightElement);
        card.appendChild(heightElement);

        this.types.forEach(typeName => {
            const pokeTypeName = document.createElement('p');
            pokeTypeName.innerText = "Type: " + typeName;
            pokeTypeName.classList.add('card-paragraph');
            card.appendChild(pokeTypeName);
        });

        return card;
    }
}

/* Bronnen 
- Elabed, Céline — Voorbije oefeningeng. Geraadpleegd op 11 augustus 2024.
- https://developer.mozilla.org/en-US/docs/Web/JavaScript. Geraadpleegd op 11 augustus 2024. (voor hulp syntax)
Chart:
- https://www.chartjs.org/docs/. Geraadpleegd op 11 augustus 2024.
- https://www.chatgpt./. Geraadpleegd op 11 augustus 2024.
*/
