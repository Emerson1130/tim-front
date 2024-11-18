import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    address: null,
  },
  mutations: {
    SET_ADDRESS(state, payload) {
      state.address = payload;
    },
  },
  actions: {
    async fetchCepData({ commit }, cep) {
      try {
        const apiUrl = import.meta.env.VITE_APP_API_URL; 
        const response = await axios.get(`${apiUrl}/consultar-cep?cep=${cep}`); 
        commit('SET_ADDRESS', response.data);
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        commit('SET_ADDRESS', 'CEP não encontrado.');
      }
    },
  },
});

export default store;
