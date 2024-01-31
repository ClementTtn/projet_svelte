<script lang="ts">
    export let data
    const pokemons = data?.Pokemons
    const fighter = data.fighter
    const listFighters = data.listFighters

    const imgFighter = pokemons.find(pokemon => pokemon.id === fighter.id)

    $: results = data.results;

    function getFighterName(fighterUuid) {
        const nameFighter = listFighters.find(nameFighter => nameFighter.uuid === fighterUuid);
        return nameFighter ? nameFighter.name : '';
    }
</script>


<svelte:head>
	<title>Profil de {fighter?.name}</title>
</svelte:head>

<h1>Profil de {fighter?.name}</h1>

<div class="fighters">
    <div class="fighter">
        <img src={imgFighter?.sprites.back_default} alt={imgFighter?.id} />
        <b>{fighter?.name}</b>
        <p>Points : <b>{fighter?.points}</b></p>
        <p>Attaque : <b>{fighter?.force}</b></p>
        <p>Points de vie : <b>{fighter?.pv}</b></p>
    </div>
</div>

<div class="results">
    <h2>Historique des combats</h2>
    {#each results as result }
        {#if result.uuid1 === fighter.uuid || result.uuid2 === fighter.uuid}
        <li>
            <div class="result">
                {#if result.winner === fighter.uuid}
                    <p class="victoire">Victoire : </p>
                {:else if result.winner === null}
                    <p>Egalité : </p>
                {:else}
                    <p class="defaite">Défaite : </p>
                {/if}
                <p> {getFighterName(result.uuid1)} VS {getFighterName(result.uuid2)}</p>
            </div>
        </li>
        {/if}
    {/each}
</div>


<style>
    .fighters{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 5rem 0;
    }
    .fighter{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #333;
        border: 1px solid white;
        border-radius: 5px;
        padding: 2rem;
        text-align: center;
    }
    .fighter img{
        width: 100px;
        height: 100px;
    }
    .results{
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .results li{
        list-style: none;
    }
    .result{
        display: flex;
        flex-direction: row;
    }
    .victoire {
        color: green;
    }
    .defaite {
        color: red;
    }
</style>