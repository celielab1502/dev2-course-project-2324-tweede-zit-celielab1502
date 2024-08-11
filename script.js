const form = document.querySelector('form');
const sortWeightButton = document.querySelector('#sortByWeightButton')
const sortHeightButton = document.querySelector('#sortByHeightButton')
let pokemonArray = [];

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
                })  
        }

        const sortWeight = (event) =>{
            event.preventDefault();
            pokemonArray.sort((a, b) => a.weight - b.weight);
            cardContainer.innerHTML = "";
            pokemonArray.forEach(pokemonCard => {
                cardContainer.appendChild(pokemonCard.renderCard());
            });
        }

            const sortHeight = (event) =>{
                event.preventDefault();
                pokemonArray.sort((a, b) => a.height - b.height);
                cardContainer.innerHTML = "";
                pokemonArray.forEach(pokemonCard => {
                    cardContainer.appendChild(pokemonCard.renderCard());
                });
        }

        sortWeightButton.addEventListener("click",sortWeight);
        sortHeightButton.addEventListener("click",sortHeight);
    })
}

form.addEventListener("submit", submitAmount);


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