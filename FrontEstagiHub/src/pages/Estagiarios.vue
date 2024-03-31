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
        <!-- Botão para visualizar contratos -->
        <q-btn @click="visualizarContratos(row)" color="primary" label="Contratos" />
        <!-- Botão para redirecionar para a página de edição -->
        <q-btn @click="editarEstagiario(row.id)" color="secondary" label="Editar" />
      </template>
    </q-table>
    <q-btn color="primary" label="Criar Estagiário" @click="criarEstagiario" />
  </div>
</template>

<script>
import axios from 'axios';

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
  methods: {
    async fetchEstagiarios() {
      try {
        const response = await axios.get('http://localhost:3000/app/estagiarios');
        this.estagiarios = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar estagiários:', error);
      }
    },
    async criarEstagiario() {
      try {
        const novoEstagiario = {
          nome: 'Novo Estagiário',
          email: 'novo@example.com',
          telefone: '123456789',
          status: 'Ativo'
        };
        const response = await axios.post('http://localhost:3000/app/estagiarios', novoEstagiario);
        console.log('Estagiário criado:', response.data);
        // Atualize a lista de estagiários após criar um novo estagiário
        this.fetchEstagiarios();
      } catch (error) {
        console.error('Erro ao criar estagiário:', error);
      }
    },
    visualizarContratos(estagiario) {
      // Lógica para visualizar contratos do estagiário
      console.log('Visualizar contratos de', estagiario.nome);
    },
    editarEstagiario(id) {
      // Redirecionar para a página de edição de estagiários com o ID do estagiário
      this.$router.push({ name: 'editarEstagiario', params: { id } });
    }
  }
};
</script>

<style scoped>
/* Estilos opcionais para o componente */
</style>
