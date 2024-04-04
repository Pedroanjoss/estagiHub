<template>
    <div class="q-pa-md">
      <q-table
        style="height: 400px"
        flat bordered
        title="Contratos do Estagiário"
        :rows="contratos"
        :columns="columns"
        row-key="id"
        virtual-scroll
        :rows-per-page-options="[0]"
      >
        <template v-slot:body-cell-actions="{ row }">
          <div class="actions-container">
            <q-btn @click="editarContrato(row.id)" color="primary" label="Editar" />
            <q-btn @click="confirmarExclusaoContrato(row)" color="negative" label="Excluir" />
          </div>
        </template>
      </q-table>
  
      <q-btn @click="criarContrato()" color="primary" label="Criar Contrato" />
  
      <q-dialog v-model="exibindoModalExclusaoContrato" persistent>
        <q-card>
          <q-card-section>
            <q-card-title>Confirmação de exclusão de contrato</q-card-title>
            <q-card-text>
              Tem certeza de que deseja excluir esse contrato? Ao confirmar essa ação, você não poderá desfazê-la.
            </q-card-text>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Cancelar" color="primary" @click="exibindoModalExclusaoContrato = false" />
            <q-btn label="Sim, excluir!" color="negative" @click="excluirContrato" />
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
        contratos: [],
        columns: [
          { name: 'modalidade', label: 'Modalidade', align: 'left', field: 'modalidade' },
          { name: 'dataInicio', label: 'Data Início', align: 'left', field: 'dataInicio' },
          { name: 'dataFim', label: 'Data Fim', align: 'left', field: 'dataFim' },
          { name: 'saldoFerias', label: 'Saldo de Férias', align: 'left', field: 'saldoFerias' },
          { name: 'dataRescisao', label: 'Data Rescisão', align: 'left', field: 'dataRescisao' },
          { name: 'actions', label: 'Ações', align: 'center' }
        ],
        exibindoModalExclusaoContrato: false,
        contratoParaExcluir: null
      };
    },
    created() {
      this.fetchContratos();
    },
    methods: {
      async fetchContratos() {
        try {
          const response = await api.get(`/app/estagiarios/${this.$route.params.id}/contratos`);
          this.contratos = response.data;
        } catch (error) {
          console.error('Erro ao buscar contratos:', error);
        }
      },
  
      criarContrato() {
        this.$router.push({ name: 'criarContrato', params: { estagiarioId: this.$route.params.id } });
      },
  
      editarContrato(id) {
        this.$router.push({ name: 'editarContrato', params: { id } });
      },
  
      confirmarExclusaoContrato(row) {
        this.contratoParaExcluir = row;
        this.exibindoModalExclusaoContrato = true;
      },
  
      async excluirContrato() {
        try {
          if (this.contratoParaExcluir) {
            await api.delete(`/app/contratos/${this.contratoParaExcluir.id}`);
            this.contratos = this.contratos.filter(contrato => contrato.id !== this.contratoParaExcluir.id);
            this.exibindoModalExclusaoContrato = false;
            console.log('Contrato excluído com sucesso!');
          }
        } catch (error) {
          console.error('Erro ao excluir contrato:', error);
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
  