<script lang="ts">
    import { navigate } from 'svelte-routing'

    export let data
    const pokemons = data?.Pokemons
    let selectedPokemonId = ''
    $: selectedPokemon = pokemons.find(pokemon => pokemon.id === selectedPokemonId)
    let customName = ''

    function handleSubmit(event) {
        event.preventDefault()

        let customNameFinal = ''
        if (customName == '') {
            customNameFinal = pokemons.find(pokemon => String(pokemon.id) === String(selectedPokemonId))?.name
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
        }).then(() => {
            navigate('/')
        })
    }
</script>

<svelte:head>
	<title>Création d'un combattant</title>
</svelte:head>
  
<h1>Formulaire Pokémon</h1>
  
<div class="createFighter">
    <form method="post" on:submit={handleSubmit}>
        {#if selectedPokemon}
            <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
        {/if}
        <select bind:value={selectedPokemonId} name="selectPokemon">
            {#each pokemons as pokemon (pokemon.id)} 
                <option value={pokemon.id}>{pokemon.name}</option>
            {/each}
        </select>   
        <label> 
            Nom personnalisé ?
            <input type="text" bind:value={customName} name="namePokemon" />
        </label>
        <button type="submit">Créer</button>
    </form>
</div>

<style>
    .createFighter {
        display: flex;
        justify-content: center;
        text-align: center;
    }
    .createFighter img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    img {
        width: 100px;
        height: 100px;
    }
    .createFighter form {
        display: flex;
        flex-direction: column;
        margin-top: 10rem;
    }
    select {
        margin-bottom: 1rem;
    }
    label{
        margin-bottom: 1rem;
    }
</style>