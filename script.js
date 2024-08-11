const form = document.querySelector("form");

const submit = (event) => {
    event.preventDefault();
    const amountOfPokemon = (event.target[0].value);
    const limitLinkSnippet = "?offset=0&limit="
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
                    
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const pokemonTitle = document.createElement('h2');
                    pokemonTitle.innerText = pokemonData.name;
                    pokemonTitle.classList.add('card-title')

                    const pokemonImage = document.createElement('img');
                    pokemonImage.src = pokemonData.sprites.front_default;
                    
                    const weightElement = document.createElement('p');
                    weightElement.innerText = "Weight: " + pokemonData.weight + "hg";
                    weightElement.classList.add('card-paragraph');
                    
                    const heightElement = document.createElement('p');
                    heightElement.innerText = "Height: " + pokemonData.height + "dm";
                    heightElement.classList.add('card-paragraph');

                    card.appendChild(pokemonTitle);
                    card.appendChild(pokemonImage);
                    card.appendChild(weightElement);
                    card.appendChild(heightElement);

                    for (let i = 0; i<pokemonData.types.length; i++ ){
                        const typeName = pokemonData.types[i].type.name;
                        let pokeTypeName = document.createElement('p')
                        pokeTypeName.innerText = "Type: " + typeName;
                        pokeTypeName.classList.add('card-paragraph');
                        card.appendChild(pokeTypeName);
                    }

                    cardContainer.appendChild(card);


                    
                })
                

        }
            
    })
}
form.addEventListener("submit", submit);