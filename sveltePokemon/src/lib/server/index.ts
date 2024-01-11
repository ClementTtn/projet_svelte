import type { Fighter } from '$lib/types'
import { readFileSync, writeFileSync } from "fs";

let fighters: Fighter[] = readFighters()

export function readFighters(): Fighter[] {
	try {
		const data = readFileSync("generated/fighters.json", "utf-8");
		return JSON.parse(data)
	} catch (e) {
        console.log('No file')
        return []
    }
}

export function createFighter(fighter: Fighter) {
	fighters = [...fighters, fighter]
	save()
}

export function deleteFighter(uuid: string) {
	fighters = fighters.filter((fighter) => fighter.uuid !== uuid)
	save()
}

export function save() {
    writeFileSync("generated/fighters.json", JSON.stringify(fighters))
}

