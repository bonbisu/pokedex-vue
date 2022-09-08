<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import axios from 'axios';
  
  import CardPokemon from '../components/CardPokemon.vue'
  import PokeButton from '../components/PokeButton.vue'
  
  
  interface Pokemon {
    name: string,
    url: string
  }
  
  const pokemonList = ref<Array<Pokemon>>([])
  
  const limit = ref(151)
  const page = ref(1)
  const offset = computed(() => limit.value * (page.value -1))
  
  const pagination = computed(() => {
    let _limit= 151;
    let _offset =0;
    if (page.value === 1){
      _limit = 151
      _offset = 0
    } else if (page.value === 2) {
      _limit = 100
      _offset = 151
    } else if (page.value === 3) {
      _limit = 135
      _offset = 251
    } else if (page.value === 4) {
      _limit = 106
      _offset = 386
    } else if (page.value === 5) {
      _limit = 155
      _offset = 494
    }
  
  
    return `?limit=${_limit}&offset=${_offset}`
  
  })
  async function getPokemonList () {
    const response = await axios.get(`/api/${pagination.value}`)
    pokemonList.value = response.data.results
  }
  
  watch([limit, page], () => {
    getPokemonList()
  })
  
  getPokemonList()
  </script>
  
  <template>
    <PokeButton @click="page = 1" >Gen 1</PokeButton>
    <PokeButton @click="page = 2" >Gen 2</PokeButton>
    <PokeButton @click="page = 3" >Gen 3</PokeButton>
    <PokeButton @click="page = 4" >Gen 4</PokeButton>
    <PokeButton @click="page = 5" >Gen 5</PokeButton>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 lg:grid-cols-3 px-64 m-auto" >
      <CardPokemon 
        v-for="pokemon in pokemonList" 
        :key="pokemon.name" 
        :name="pokemon.name"
        :url="pokemon.url">
      </CardPokemon>
  </div>
    
  </template>
  
  
  