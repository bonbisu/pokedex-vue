<template>
    <div class="flex flex-col justify-around items-center rounded-[10px] aspect-square"
    :class="typeColors[pokemonMainType.toLocaleLowerCase()]"
    >
        <img :src="pokemon.image" :alt="props.name" class="w-32">
        <h1>{{ pokemon.name }}</h1>
        <p># {{ pokemon.id}}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import axios from "axios";
import { defineProps, ref } from "vue";

interface Props {
    name: string,
    url: string,
}

interface PokemonDetails {
    id: number,
    name: string,
    image: string,
    types: Array<string>
}
const pokemon = ref<PokemonDetails>({
    id: 0,
    name: "",
    image: "",
    types: []
})
const props = defineProps<Props>()

const pokemonMainType = computed(() => pokemon.value.types[0] || 'normal')


async function getPokemon () {
const response = await axios.get(props.url, {
headers: {"Access-Control-Allow-Origin": "*"},
} )
pokemon.value = {
    id: response.data.id,
    name: response.data.name,
    image: response.data.sprites['versions']['generation-v']['black-white']['animated']['front_default'],
    types: response.data.types.map((item: any) => item.type.name)
}

return response.data[0]
}

getPokemon()

const typeColors = ref({
    bug: 'bg-lime-500',
    dark: 'bg-stone-800',
    dragon: 'bg-violet-800',
    electric: 'bg-yellow-300',
    fairy: 'bg-pink-400',
    fighting: 'bg-red-900',
    fire: 'bg-red-600',
    flying: 'bg-sky-400',
    ghost: 'bg-indigo-800',
    grass: 'bg-green-400',
    ground: 'bg-amber-200',
    ice: 'bg-cyan-300',
    normal: 'bg-neutral-400',
    poison: 'bg-purple-700',
    psychic: 'bg-rose-400',
    rock: 'bg-yellow-500',
    water: 'bg-blue-500'
})

</script>