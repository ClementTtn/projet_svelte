<script lang="ts">
    import type { ResultOfFight } from '$lib/types'
    import { rand } from '$lib/helpers'
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'

    export let data

    $: fighter1 = data.fighter1
	$: fighter2 = data.fighter2
    let initialPvFighter1
    let initialPvFighter2
    const pokemons = data?.Pokemons
    const imgFighter1 = pokemons.find(pokemon => pokemon.id === data.fighter1?.id)
    const imgFighter2 = pokemons.find(pokemon => pokemon.id === data.fighter2?.id)
    let round = 1
    let resultFight: ResultOfFight | null

    function startFight(interval) {
        if (fighter1 && fighter2) {
            const fighter1AtkPower = rand(fighter1.force, 0)
            const fighter2AtkPower = rand(fighter2.force, 0)
            fighter2.pv -= fighter1AtkPower
            fighter1.pv -= fighter2AtkPower
            round += 1

            if (fighter1.pv <= 0 || fighter2.pv <= 0) {
                clearInterval(interval)
                resultFight = getResultFight()
            }
        }
    }

    function getResultFight() {
        if (fighter1 && fighter2) {
            let nameWinner = null
            let result: ResultOfFight = {
                uuid1: fighter1.uuid,
                uuid2: fighter2.uuid,
                winner: null,
            }

            if (fighter1.pv <= 0 && fighter2.pv > 0) {
                result.winner = fighter2.uuid
                nameWinner = fighter2.name
            } else if (fighter2.pv <= 0 && fighter1.pv > 0) {
                result.winner = fighter1.uuid
                nameWinner = fighter1.name
            } else {
                result.winner = ""
                nameWinner = null
            }

            fetch('/fight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    uuid1: result.uuid1,
                    uuid2: result.uuid2,
                    winner: result.winner,
                }),
            }).then(() => {
                invalidate('p:all')
            })
            return { result, nameWinner }
        }
        return null
    }

    onMount(() => {
        if (data && data.fighter1 && data.fighter2) {
            fighter1 = data.fighter1
            fighter2 = data.fighter2

            initialPvFighter1 = fighter1.pv
            initialPvFighter2 = fighter2.pv
            
            const interval = setInterval(() => {
				startFight(interval)
			}, 2000)

			return () => {
				clearInterval(interval)
			}
        }
    })
</script>

<svelte:head>
	<title>{fighter1.name} VS {fighter2.name}</title>
</svelte:head>

<h1>Combat !</h1>

<div class="fighters">
    <div class="fighter">
        <img src={imgFighter1?.sprites.back_default} alt={imgFighter1?.id} />
        <b>{fighter1?.name}</b>
        <p>Points de vie :</p>
        <b>{fighter1?.pv}</b>
    </div>

    <h2>{round}e round !</h2>

    <div class="fighter">
        <img src={imgFighter2?.sprites.back_default} alt={imgFighter2?.id} />
        <b>{fighter2?.name}</b>
        <p>Points de vie :</p>
        <b>{fighter2?.pv}</b>
    </div>
</div>

<div class="resultFight">
    {#if resultFight}
        {#if resultFight.nameWinner == null}
            <p>Match nul</p>
        {:else}
            <p>{resultFight.nameWinner} remporte le combat !</p>
        {/if}
        <button><a href="/">Nouveau combat</a></button>
    {/if}
</div>

<style>
    .fighters {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 5rem 15rem;
    }
    .fighter {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px solid white;
        border-radius: 5px;
        padding: 2rem;
        text-align: center;
        background-color: #333;
    }
    .fighter img {
        width: 100px;
        height: 100px;
    }
    .resultFight {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .resultFight a {
        text-decoration: none;
        color: black;
    }
    h2 {
        text-align: center;
    }
</style>