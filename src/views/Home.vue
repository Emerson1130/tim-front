<script>
export default {
  name: 'Home',
};
</script>
<template>
  <div class="home">
    <h1>Bem-vindo ao Sistema de Busca de CEP</h1>
    <router-link to="/search">
      <button class="btn btn-primary btn-lg mt-4">Pesquisar CEP</button>
    </router-link>
  </div>
</template>
