<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const showAlert = ref(false);

const displayAlert = () => {
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
};
</script>

<template>
  <header class="header">
    <img alt="Tim logo" class="logo" src="@/assets/tim.svg" width="150" height="150" />

    <div class="wrapper">
      <HelloWorld msg="Bem-vindo à Tim - Conectando você ao futuro!" />
      
      <div v-if="showAlert" class="alert alert-warning" role="alert">
        Em breve! Estamos trabalhando para melhor atende você.
      </div>

      <nav>
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/planos" @click.native="displayAlert" class="nav-link">Planos</RouterLink>
        <RouterLink to="/atendimento" @click.native="displayAlert" class="nav-link">Atendimento</RouterLink>
        <RouterLink to="/contato" @click.native="displayAlert" class="nav-link">Contato</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  background-color: #002198; 
  color: white;
  display: flex; 
  justify-content: space-between;
  align-items: center; 
  padding: 10px 20px;
}

.logo {
  display: block;
  width: 150px;
  height: auto;
  margin-top: -140px !important;
}

.wrapper {
  flex-grow: 1; 
  text-align: center;
  margin-left: 30px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
}

nav {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

nav .nav-link {
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  margin: 0 10px;
  transition: background-color 0.3s;
}

nav .nav-link:hover {
  background-color: #005f7f; 
}

/* Alerta de Em breve */
.alert {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  font-size: 1.2rem;
  width: auto;
  padding: 15px 30px;
  text-align: center;
}

@media (min-width: 1024px) {
  .header {
    padding-right: 2rem;
  }

  .logo {
    margin: 0;  
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
