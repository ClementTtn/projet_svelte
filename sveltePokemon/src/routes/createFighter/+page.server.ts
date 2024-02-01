import type { Actions } from '@sveltejs/kit'
import { randomUUID } from "crypto"
import { rand } from '$lib/helpers'
import type { Fighter } from '$lib/types'
import { createFighter } from '$lib/server'

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData()
		const fighter: Fighter = {
			uuid: randomUUID(),
			name: String(data.get('namePokemon')),
			id: Number(data.get('selectPokemon')),
			points: 0,
			pv: rand(200, 50),
			force: rand(50, 20)
		}

		createFighter(fighter)

		return {
            status: 200,
            body: 'Combattant créé'
        }
	}
}
