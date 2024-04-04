<template>
    <q-page>
      <q-card class="q-pa-md">
        <q-card-section>
          <q-form @submit="criarContrato" class="q-gutter-md">
            <div class="q-gutter-md">
              <q-select outlined v-model="form.modalidade" label="Modalidade Contrato" :options="modalidadeOptions" />
              <q-input outlined v-model="form.dataInicio" label="Data Início (DD/MM/AAAA)" mask="##/##/####" />
              <q-input outlined v-model="form.dataFim" label="Data Fim (DD/MM/AAAA)" mask="##/##/####" />
              <q-input outlined v-model="form.saldoFerias" label="Saldo de Férias" type="number" />
              <q-input outlined v-model="form.dataRescisao" label="Data Rescisão (DD/MM/AAAA)" mask="##/##/####" />
              <q-input outlined v-model="form.dataInicioFerias" label="Data Início Férias (DD/MM/AAAA)" mask="##/##/####" />
              <q-input outlined v-model="form.dataFimFerias" label="Data Fim Férias (DD/MM/AAAA)" mask="##/##/####" />
              <q-select outlined v-model="form.statusFerias" label="Status Férias" :options="statusFeriasOptions" />
              <q-input outlined v-model="form.diasCorridos" label="Dias Corridos" type="number" />
              <div class="q-mt-md">
                <q-btn type="submit" color="primary" label="Criar Contrato" />
                <q-btn color="secondary" label="Cancelar" @click="voltarPagina" class="q-ml-md" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { api } from 'boot/axios';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const form = ref({
        modalidade: '',
        dataInicio: null,
        dataFim: null,
        saldoFerias: null,
        dataRescisao: null,
        dataInicioFerias: null,
        dataFimFerias: null,
        statusFerias: '',
        diasCorridos: null,
      });
  
      const modalidadeOptions = ['Graduação', 'Pós-graduação'];
      const statusFeriasOptions = ['Aprovada', 'Reprovada'];
      const router = useRouter();
  
      const criarContrato = async () => {
  try {
    const estagiarioId = this.$route.params.id;
    const formData = this.form;

    // Certifique-se de que os campos obrigatórios estão sendo preenchidos
    if (!formData.modalidade || !formData.dataInicio || !formData.dataFim || !formData.statusFerias) {
      throw new Error('Por favor, preencha todos os campos obrigatórios.');
    }

    // Certifique-se de que os campos de data sejam convertidos para o tipo Date
    formData.dataInicio = new Date(formData.dataInicio);
    formData.dataFim = new Date(formData.dataFim);
    formData.dataRescisao = new Date(formData.dataRescisao);
    formData.dataInicioFerias = new Date(formData.dataInicioFerias);
    formData.dataFimFerias = new Date(formData.dataFimFerias);

    // Faça a chamada à API para criar o contrato
    const response = await api.post('/app/contratos', { ...formData, estagiarioId });
    console.log('Contrato criado com sucesso:', response.data);
    router.push({ name: 'contratos', params: { id: estagiarioId } });
  } catch (error) {
    console.error('Erro ao criar contrato:', error.message);
  }
}
  
      const voltarPagina = () => {
        router.push({ name: 'contratos', params: { id: form.value.estagiarioId } });
      };
  
      return {
        form,
        modalidadeOptions,
        statusFeriasOptions,
        criarContrato,
        voltarPagina,
      };
    },
  };
  </script>
  
  <style scoped>
  </style>
  