const form = document.querySelector("form");

const submit = (event) => {
    event.preventDefault();
    const amountOfPokemon = (event.target[0].value);
    let offset;

    const apiLink = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit="+ amountOfPokemon

    fetch(apiLink)
    .then(response => response.json())
    .then (data => {
        for (let i = 0; i< amountOfPokemon; i++ ){
                let pokemonName = data.results[i].name
                

        }
            
    })
}
form.addEventListener("submit", submit);