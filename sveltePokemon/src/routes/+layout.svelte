<script>
    import "../app.css"
    export let data
    const pokemons = data.Pokemons
    $: leader = data.leader
    $: imgFighter = pokemons.find(pokemon => pokemon.id === leader.id)
</script>

<header>
    <nav>
        <p><a href="/">Accueil</a></p>
        <p><a href="/createFighter">Créer un combattant</a></p>
        <p><a href="/listFighter">Liste des combattans</a></p>
        <div class="leader">
            {#if leader}
                <p><b>Leader :</b><img src={imgFighter?.sprites.back_default} alt={imgFighter?.id} />{leader.name}, {leader.points} points</p>
            {/if}
        </div>
    </nav>
</header>

<main>
    <slot />
</main>

<style>
    header nav{
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid black;
        padding-bottom: 0.5rem;
    }
    nav p a{
        text-decoration: none;
        color: white;
        margin-right: 2rem;
    }
    nav p:first-child {
        margin-left: 2rem;
    }
    .leader {
        margin-left: auto;
        margin-right: 2rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .leader p{
        display: flex;
        align-items: center;
    }
    .leader img{
        width: 40px;
        height: 40px;
        margin: 0 5px;
    }
</style>