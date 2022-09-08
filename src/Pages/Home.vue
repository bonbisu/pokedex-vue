// ! https://vuejs.org/guide/essentials/reactivity-fundamentals.html#script-setup
// https://vuejs.org/api/sfc-script-setup.html#script-setup
// ! https://www.youtube.com/watch?v=yXrlRBouIHc
// ! https://www.youtube.com/watch?v=gF0KYiCkAOE
<script setup lang="ts">
  // ! https://vuejs.org/api/reactivity-core.html#ref
  // https://vuejs.org/api/reactivity-core.html
  // ! https://www.youtube.com/watch?v=o8B4SguvUqk
  import { ref, computed, watch } from 'vue';

  // https://axios-http.com/docs/intro
  import axios from 'axios';
  
  // components importados já ficam disponíveis no template
  import CardPokemon from '../components/CardPokemon.vue'
  import PokeButton from '../components/PokeButton.vue'
  
  // typescript interface
  // ! https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
  interface Pokemon {
    name: string,
    url: string
  }
  
  // component state variables
  const pokemonList = ref<Array<Pokemon>>([])
  
  const limit = ref(151)
  const page = ref(1)
  const offset = computed(() => limit.value * (page.value -1))
  
  // computed pagination
  // https://vuejs.org/guide/essentials/computed.html#computed-properties
  // https://vuejs.org/api/reactivity-core.html#computed
  // https://www.youtube.com/watch?v=mYKv-NZh03Q
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

  // methods
  async function getPokemonList () {
    const response = await axios.get(`/api/${pagination.value}`)
    pokemonList.value = response.data.results
  }
  
  // "listener" - roda a arrow function toda vez que a variável limit ou page mudar
  // https://vuejs.org/guide/essentials/watchers.html#basic-example
  // https://vuejs.org/api/reactivity-core.html#watch
  watch([limit, page], () => {
    getPokemonList()
  })
  
  // pegar lista de pokemons - seria melhor colocar isso dentro de um onMounted 
  // https://vuejs.org/api/composition-api-lifecycle.html#onmounted
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
  
  
  