<template>
  <q-page>
    <q-card class="q-pa-md">
      <q-card-section>
        <q-form @submit="criarEstagiario" class="q-gutter-md">
          <div class="q-gutter-md">
            <div class="row q-col-gutter-md">
              <div class="col">
                <q-input
                  outlined
                  v-model="form.nome"
                  label="Nome"
                  :rules="nomeRules"
                />
              </div>
              <div class="col">
                <q-input
                  outlined
                  v-model="form.email"
                  label="Email"
                  type="email"
                  :rules="emailRules"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col">
                <q-input
                  outlined
                  v-model="form.telefone"
                  label="Telefone"
                  :rules="telefoneRules"
                  mask="(##) # ####-####"
                />
              </div>
              <div class="col">
                <q-select
                  outlined
                  v-model="form.status"
                  label="Status"
                  :options="statusOptions"
                  :rules="statusRules"
                />
              </div>
            </div>
            <q-input
              outlined
              v-model="form.senha"
              label="Senha"
              :rules="senhaRules"
            />
            <q-input
              outlined
              v-model="form.confirmarSenha"
              label="Confirmar Senha"
              :rules="confirmarSenhaRules"
            />
            <div class="q-mt-md">
              <q-btn type="submit" color="primary" label="Criar Estagiário" />
              <q-btn color="secondary" label="Cancelar" @click="voltarPagina" class="q-ml-md"/>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';

import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const form = ref({
      nome: '',
      email: '',
      telefone: '',
      status: '',
      senha: '',
      confirmarSenha: '',
    });

    const statusOptions = ['Ativo', 'Inativo'];

    const nomeRules = [
      (val) => !!val || 'Por favor, digite o nome',
      (val) => val.length <= 60 || 'O nome deve ter no máximo 60 caracteres',
    ];

    const emailRules = [
      (val) => !!val || 'Por favor, digite o email',
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        'Por favor, digite um email válido',
    ];

    const telefoneRules = [(val) => !!val || 'Por favor, digite o telefone'];
    const statusRules = [(val) => !!val || 'Por favor, selecione o status'];

    const senhaRules = [(val) => !!val || 'Por favor, digite a senha'];

    const confirmarSenhaRules = [
      (val) => !!val || 'Por favor, confirme a senha',
      (val) => val === form.value.senha || 'As senhas não coincidem',
    ];

    const router = useRouter();

    const criarEstagiario = async () => {
      try {
        const { confirmarSenha, ...dataToSend } = form.value;

        const telefoneSemMascara = dataToSend.telefone.replace(/\D/g, '');
        dataToSend.telefone = telefoneSemMascara;

        const response = await api.post('app/estagiarios', dataToSend);
        console.log('Estagiário criado com sucesso:', response.data);

        router.push({ name: 'estagiarios' });
      } catch (error) {
        console.error('Erro ao criar estagiário:', error.response.data);
      }
    };

    const voltarPagina = () => {
      router.push({ name: 'estagiarios' });
    };

    return {
      form,
      statusOptions,
      nomeRules,
      emailRules,
      telefoneRules,
      statusRules,
      senhaRules,
      confirmarSenhaRules,
      criarEstagiario,
      voltarPagina,
    };
  },
});
</script>

<style scoped></style>
