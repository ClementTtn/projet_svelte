import Pokemons from "$lib/data.json"
import { readFighters, getLeader } from "$lib/server/index.js"

export async function load({depends}) {
	depends('p:all')

	const sortedFightersName = readFighters().sort((a, b) => {
		return a.name.localeCompare(b.name)
	})

	const sortedFightersPoints = readFighters().sort((a, b) => {
		return b.points - a.points
	})

	const leader = getLeader(sortedFightersName)

	return {
		FightersName: sortedFightersName,
		FightersPoints: sortedFightersPoints,
		leader: leader,
		Pokemons
	}
}