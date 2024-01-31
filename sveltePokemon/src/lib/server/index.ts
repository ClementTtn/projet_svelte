import type { Fighter, ResultOfFight } from '$lib/types'
import { readFileSync, writeFileSync } from "fs";

let fighters: Fighter[] = readFighters()
let results: ResultOfFight[] = readResults()

export function readFighters(): Fighter[] {
	try {
		const data = readFileSync("generated/fighters.json", "utf-8");
		return JSON.parse(data)
	} catch (e) {
        console.log('No file')
        return []
    }
}

export function getLeader(fighters: Fighter[]): Fighter | null {
    if (fighters.length === 0) {
        return null;
    }
    const sortedFighters = fighters.slice().sort((a, b) => b.points - a.points);
    return sortedFighters[0];
}

export function createFighter(fighter: Fighter) {
	fighters = [...fighters, fighter]
	saveFighter()
}

export function updateFighter(uuid: string, points: number) {
    const fighter = fighters.findIndex((fighter) => fighter.uuid === uuid)

    if (fighter !== -1) {
        fighters[fighter].points += points
        saveFighter()
    }
}

export function deleteFighter(uuid: string) {
	fighters = fighters.filter((fighter) => fighter.uuid !== uuid)
	saveFighter()
}

export function saveFighter() {
    writeFileSync("generated/fighters.json", JSON.stringify(fighters))
}

export function readResults(): ResultOfFight[] {
	try {
		const data = readFileSync("generated/results.json", "utf-8");
		return JSON.parse(data)
	} catch (e) {
        console.log('No file')
        return []
    }
}

export function createResult(result: ResultOfFight) {
	results = [...results, result]
	saveResult()
	return results
}

export function saveResult() {
    writeFileSync("generated/results.json", JSON.stringify(results))
}