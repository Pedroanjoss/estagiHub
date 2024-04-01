<template>
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      flat bordered
      title="Estagiários"
      :rows="estagiarios"
      :columns="columns"
      row-key="id"
      virtual-scroll
      :rows-per-page-options="[0]"
    >
      <template v-slot:body-cell-actions="{ row }">
      
        <q-btn  color="primary" label="Contratos" />
       
        <q-btn  color="secondary" label="Editar" />
      </template>
    </q-table>
    <RouterLink to="/estagiarios/criarEstagiario">Criar Estagiairo</RouterLink>
  </div>
</template>

<script>
import { api } from 'boot/axios'
import { useRouter } from "vue-router";


export default {
  data() {
    return {
      estagiarios: [],
      columns: [
        { name: 'nome', label: 'Nome', align: 'left', field: 'nome' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
        { name: 'telefone', label: 'Telefone', align: 'left', field: 'telefone' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' },
        { name: 'actions', label: 'Ações', align: 'center' }
      ]
    };
  },
  created() {
    this.fetchEstagiarios();
  },
  methods:
   {
    async fetchEstagiarios() {
      try {
        const response = await api.get('/app/estagiarios');
        this.estagiarios = response.data;
        
      } catch (error) {
        console.error('Erro ao buscar estagiários:', error);
      }
    },

    criarEstagiario() {
      const router = useRouter(); 
      router.push("/estagiarios/criarEstagiario")
    }
    
   
   
  }
};
</script>

<style scoped>
/* Estilos opcionais para o componente */
</style>
