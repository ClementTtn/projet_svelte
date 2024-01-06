import data from "$lib/data.json";

export function load({depends}) {
    return { pokemons: data };
}