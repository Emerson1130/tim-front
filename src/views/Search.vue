<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Search',
  setup() {
    const store = useStore();
    const cep = ref('');
    const address = computed(() => store.state.address);
    const isLoading = ref(false);
    const alertMessage = ref('');
    const alertType = ref('');

    const validateInput = () => {
      cep.value = cep.value.replace(/\D/g, '').slice(0, 8); 
    };

    const searchCep = async () => {
      if (cep.value.length === 8) {
        isLoading.value = true;
        try {
          await store.dispatch('fetchCepData', cep.value);
          isLoading.value = false;
          alertMessage.value = 'Dados encontrados com sucesso!';
          alertType.value = 'success';
        } catch (error) {
          isLoading.value = false;
          alertMessage.value = 'Erro ao buscar o CEP. Tente novamente.';
          alertType.value = 'danger'; 
        }
      } else {
        alertMessage.value = 'Digite um CEP válido!';
        alertType.value = 'warning'; 
      }
    };

    return {
      cep,
      address,
      validateInput,
      searchCep,
      isLoading,
      alertMessage,
      alertType,
    };
  },
};
</script>

<template>
  <div class="search container">
    <h1 class="my-4">Pesquise um CEP</h1>

    <div v-if="alertMessage" class="alert" :class="'alert-' + alertType">
      {{ alertMessage }}
    </div>

    <div class="mb-3">
      <input 
        type="text" 
        class="form-control"
        v-model="cep" 
        placeholder="Digite o CEP (apenas números)" 
        @input="validateInput" 
      />
    </div>

    <button 
      class="btn btn-primary" 
      @click="searchCep" 
      :disabled="isLoading" 
      v-if="!isLoading">
      Buscar
    </button>

    <button 
      class="btn btn-primary" 
      @click="searchCep" 
      :disabled="isLoading" 
      v-else>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Carregando...
    </button>

    <div v-if="address" class="mt-4">
      <h3>Dados do CEP: {{ cep }}</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Campo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CEP</td>
            <td>{{ address.cep }}</td>
          </tr>
          <tr>
            <td>Logradouro</td>
            <td>{{ address.logradouro }}</td>
          </tr>
          <tr>
            <td>Bairro</td>
            <td>{{ address.bairro }}</td>
          </tr>
          <tr>
            <td>Cidade</td>
            <td>{{ address.localidade }}</td>
          </tr>
          <tr>
            <td>Estado</td>
            <td>{{ address.uf }}</td>
          </tr>
          <tr>
            <td>Região</td>
            <td>{{ address.regiao }}</td>
          </tr>
          <tr>
            <td>IBGE</td>
            <td>{{ address.ibge }}</td>
          </tr>
          <tr>
            <td>DDD</td>
            <td>{{ address.ddd }}</td>
          </tr>
          <tr>
            <td>SIAFI</td>
            <td>{{ address.siafi }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <router-link to="/">
      <button class="btn btn-link mt-3">Voltar</button>
    </router-link>
  </div>
</template>

<style scoped>
.search {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  text-align: center;
}

button {
  width: 100%;
}

table {
  width: 100%;
  margin-top: 20px;
}

table th, table td {
  text-align: left;
  padding: 8px;
}
</style>
