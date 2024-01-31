export type Pokemon = {
	id: number
	name: string
}

export type Fighter = {
	uuid: string
	name: string
	id: number
	points: number
	pv: number
	force: number
}

export type ResultOfFight = {
	uuid1: Fighter
	uuid2: Fighter
	winner: Fighter | string
}