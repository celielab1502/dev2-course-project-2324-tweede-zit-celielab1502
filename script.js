const form = document.querySelector("form");

const submit = (event) => {
    event.preventDefault();
    const amountOfPokemon = (event.target[0].value);
    const limitLinkSnippet = "?offset=0&limit="
    let offset;

    const apiLink = "https://pokeapi.co/api/v2/pokemon/"

    fetch(apiLink + limitLinkSnippet + amountOfPokemon)
    .then(response => response.json())
    .then (data => {

        const cardContainer = document.querySelector('.card-container');
        cardContainer.innerHTML = '';

        for (let i = 0; i< amountOfPokemon; i++ ){
                let pokemonName = data.results[i].name
                fetch(apiLink + pokemonName)
                .then(response => response.json())
                .then (pokemonData => {
                    console.log(pokemonData)
                    
                    let card = document.createElement('div');
                    card.classList.add('card');
                    let pokemonTitle = document.createElement('h2');
                    pokemonTitle.innerText = pokemonData.name;

                    card.appendChild(pokemonTitle);
                    cardContainer.appendChild(card);

                    
                })
                

        }
            
    })
}
form.addEventListener("submit", submit);