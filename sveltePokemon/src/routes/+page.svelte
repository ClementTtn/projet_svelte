<script lang="ts">
    export let data
    const pokemons = data.Pokemons
    $: fighters = data.FightersName.sort((a, b) => a.name.localeCompare(b.name))
    $: selectedFighters = []
    $: urlFight = `/fight?uuid1=${selectedFighters[0]}&uuid2=${selectedFighters[1]}`

    function getPokemonImage(fighterId) {
        const pokemon = pokemons.find(pokemon => pokemon.id === fighterId)
        return pokemon ? pokemon.sprites.front_default : ''
    }

    function selectFighter(uuid) {
        if (selectedFighters.length === 2 || selectedFighters.includes(uuid)) {
            selectedFighters = selectedFighters.filter((selectedUuid) => selectedUuid !== uuid)
        } else {
            selectedFighters = [...selectedFighters, uuid]
        }
    }
</script>

<svelte:head>
	<title>Sélection combattants</title>
</svelte:head>

<h1>Sélectionnez des combattants</h1>
<h3>Pour lancer un combat, sélectionnez 2 combattants.</h3>

<div class="listFighter">
    {#each fighters as fighter (fighter.uuid)}
        <li>
            <div class="cardFighter">
                <img src={getPokemonImage(fighter.id)} alt={fighter.name} />
                <b>{fighter.name}</b>
                <p>Points: {fighter.points}</p>
                <p>PV: {fighter.pv}</p>
                <p>Attaque: {fighter.force}</p>
                <button on:click={() => {selectFighter(fighter.uuid)}} class:selectedFighter={selectedFighters.includes(fighter.uuid)}>Sélectionner</button>
            </div>
        </li>
    {/each}
</div>

<div class="button">
    {#if selectedFighters.length === 2}
        <button class="startFight">
            <a href="{urlFight}">Lancer un combat</a>
        </button>
    {:else}
        <button disabled>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a>Lancer un combat</a>
        </button>
    {/if}
</div>


<style>
    .listFighter {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .cardFighter {
        display: flex;
        flex-direction: column;
        text-align: center;
        margin-right: 2rem;
        border: 1px solid white;
        border-radius: 5px;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        background-color: #333;
    }

    .cardFighter img {
        max-width: 100%;
        height: auto;
        margin-bottom: 1rem;
    }

    .selectedFighter {
        background-color: #444;
        color: #ffffff;
    }

    .button {
        margin-top: 2rem;
        text-align: center;
    }

    .startFight {
        background: #ff0000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .startFight a {
        text-decoration: none;
        color: #ffffff;
    }

    .startFight:disabled {
        background: #666;
        cursor: not-allowed;
    }
</style>
