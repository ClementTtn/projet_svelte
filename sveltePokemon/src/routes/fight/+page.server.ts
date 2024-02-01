import { createResult, updateFighter } from '$lib/server/index.js'
import type { ResultOfFight, Fighter } from '$lib/types.js'

export async function load({url: { searchParams }, parent}) {
    const uuid1 = searchParams.get('uuid1')
    const uuid2 = searchParams.get('uuid2')
    const layoutData = await parent()
    const fighter1 = layoutData.FightersName.find(fighter => fighter.uuid === uuid1)
    const fighter2 = layoutData.FightersName.find(fighter => fighter.uuid === uuid2)

    return { fighter1, fighter2 }
}

export const actions: Actions = {
    default: async (event) => {
		const data = await event.request.formData()
		const result: ResultOfFight = {
			uuid1: data.get('uuid1'),
			uuid2: data.get('uuid2'),
			winner: data.get('winner')
		}

		createResult(result)

        if (result.winner !== "") {
            updateFighter(result.winner, 3)
        } else {
            updateFighter(result.uuid1, 1)
            updateFighter(result.uuid2, 1)
        }

        return {
            status: 200,
            body: 'Résultat créé'
        }
	}
}