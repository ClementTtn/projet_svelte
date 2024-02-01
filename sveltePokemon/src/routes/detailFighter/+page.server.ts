import { readFighters, readResults } from '$lib/server/index.js'

export async function load({url: { searchParams }, parent}) {
    const uuid = searchParams.get('uuid')
    const layoutData = await parent()
    const fighter = layoutData.FightersPoints.find(fighter => fighter.uuid === uuid)
    const listFighters = readFighters()
    const results = readResults()

    return {
        fighter: fighter,
        listFighters: listFighters,
        results: results
    }
}