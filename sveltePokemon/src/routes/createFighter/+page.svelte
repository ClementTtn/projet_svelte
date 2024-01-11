<script lang="ts">
    export let data
    const pokemons = data?.pokemons
    let selectedPokemonId = ''
    let customName = ''

    function handleSubmit(event) {
        event.preventDefault();

        let customNameFinal = ''
        if (customName == '') {
            customNameFinal = pokemons.find(pokemon => String(pokemon.id) === String(selectedPokemonId))?.name;
        } else {
            customNameFinal = customName
        }
        
        fetch('/createFighter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                selectPokemon: selectedPokemonId,
                namePokemon: customNameFinal,
            }),
        });
    }
</script>
  
<h1>Formulaire Pokémon</h1>
  
<form method="post" on:submit={handleSubmit}>
    <select bind:value={selectedPokemonId} name="selectPokemon">
        {#each pokemons as pokemon (pokemon.id)} 
            <option value={pokemon.id}>{pokemon.name}</option>
        {/each}
    </select>   
    <label> 
        Nom personnalisé :
        <input type="text" bind:value={customName} name="namePokemon" />
    </label>
    <button type="submit">Soumettre</button>
</form>