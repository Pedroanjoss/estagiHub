User
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
      <div class="actions-container">
        <q-btn @click="visualizarContratos(row)" color="primary" label="Contratos" />
        <q-btn @click="editarEstagiario(row.id)" color="secondary" label="Editar" />
        <q-btn @click="confirmarExclusao(row)" color="negative" label="Excluir" />
      </div>
    </template>
    </q-table>

    <q-btn @click="criarEstagiario()" color="primary" label="Criar Estagiario" />

    <q-dialog v-model="exibindoModalExclusao" persistent>
      <q-card>
        <q-card-section>
          <q-card-title>Confirmação de exclusão</q-card-title>
          <q-card-text>
            Tem certeza de que deseja excluir esse usuário? Ao confirmar essa ação, você não poderá desfazê-la.
          </q-card-text>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" color="primary" @click="exibindoModalExclusao = false" />
          <q-btn label="Sim, excluir!" color="negative" @click="excluirUsuario" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { api } from 'boot/axios'


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
      ],
      exibindoModalExclusao: false,
      usuarioParaExcluir: null
    };
  },
  created() {
    this.fetchEstagiarios();
  },
  methods: {
    async fetchEstagiarios() {
      try {
        const response = await api.get('/app/estagiarios');
        this.estagiarios = response.data;
      } catch (error) {
        console.error('Erro ao buscar estagiários:', error);
      }
    },
    
    visualizarContratos(estagiarioId) {
      // Navegar para a página de contratos passando o ID do estagiário como parâmetro
      this.$router.push({ name: 'contratos', params: { id: estagiarioId } });
    },

    criarEstagiario(){
      this.$router.push({ name: "criarEstagiario" })
    },
    
    editarEstagiario(id) {
      this.$router.push({ name: 'editarEstagiario', params: { id } })
    },
    
    confirmarExclusao(row) {
      this.usuarioParaExcluir = row;
      this.exibindoModalExclusao = true;
    },

    async excluirUsuario() {
      try {
        if (this.usuarioParaExcluir) {
          await api.delete(`/app/estagiarios/${this.usuarioParaExcluir.id}`);
         
          this.estagiarios = this.estagiarios.filter(estagiario => estagiario.id !== this.usuarioParaExcluir.id);
          this.exibindoModalExclusao = false;
          console.log('Usuário excluído com sucesso!');
          
        }
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
      }
    }
  }
};
</script>

<style scoped>
.actions-container {
  display: flex;
  justify-content: center;
}
</style>