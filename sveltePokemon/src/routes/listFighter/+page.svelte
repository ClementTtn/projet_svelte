<script lang="ts">
    export let data
    const pokemons = data.Pokemons
    $: fighters = data.FightersPoints.sort((a, b) => b.points - a.points)

    function getPokemonImage(fighterId) {
        const pokemon = pokemons.find(pokemon => pokemon.id === fighterId)
        return pokemon ? pokemon.sprites.front_default : ''
    }
</script>

<svelte:head>
	<title>Liste des combattants</title>
</svelte:head>

<h1>Liste des combattants</h1>

<div class="listFighter">
    {#each fighters as fighter (fighter.uuid)}
        <li>
            <div class="cardFighter">
                <img src={getPokemonImage(fighter.id)} alt={fighter.name} />
                <b>{fighter.name}</b>
                <p>Points: {fighter.points}</p>
                <button><a href="/detailFighter?uuid={fighter.uuid}">Détails</a></button>
            </div>
        </li>
    {/each}
</div>


<style>
    .listFighter {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        list-style: none;
        justify-content: center;
    }
    .cardFighter {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-right: 4rem;
        border: 1px solid white;
        border-radius: 5px;
        background-color: #333;
        padding: 2rem;
        margin-bottom: 2rem;
    }
</style>
