<template>
  <q-page>
    <q-card class="q-pa-md">
      <q-card-section>
        <q-form
          @submit="atualizarEstagiario"
          @reset="limparFormulario"
          class="q-gutter-md"
        >
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
            <q-btn type="submit" color="primary" label="Atualizar Estagiário" />
            <q-btn color="secondary" label="Cancelar" @click="voltarPagina" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const form = ref({
      nome: "",
      email: "",
      telefone: "",
      status: "",
      senha: "",
      confirmarSenha: "",
    });

    const statusOptions = ["Ativo", "Inativo"];

    const nomeRules = [
      (val) => !!val || "Por favor, digite o nome",
      (val) => val.length <= 60 || "O nome deve ter no máximo 60 caracteres",
    ];

    const emailRules = [
      (val) => !!val || "Por favor, digite o email",
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        "Por favor, digite um email válido",
    ];

    const telefoneRules = [(val) => !!val || "Por favor, digite o telefone"];
    const statusRules = [(val) => !!val || "Por favor, selecione o status"];

    const senhaRules = [(val) => !!val || "Por favor, digite a senha"];

    const confirmarSenhaRules = [
      (val) => !!val || "Por favor, confirme a senha",
      (val) => val === form.value.senha || "As senhas não coincidem",
    ];

    const router = useRouter();

    const buscarEstagiario = async () => {
      try {
        const id = route.params.id;
        const response = await api.get(`app/estagiarios/${id}`);
        const estagiario = response.data;
        
        form.value.nome = estagiario.nome;
        form.value.email = estagiario.email;
        form.value.telefone = estagiario.telefone;
        form.value.status = estagiario.status;
        form.value.senha = estagiario.senha;
        form.value.confirmarSenha = estagiario.senha;
       
      } catch (error) {
        console.error("Erro ao buscar estagiário:", error.response.data);
      }
    };

    const atualizarEstagiario = async () => {
    try {
      const id = route.params.id;
      const { confirmarSenha, ...dataToSend } = form.value;
      const telefoneSemMascara = dataToSend.telefone.replace(/\D/g, "");
      dataToSend.telefone = telefoneSemMascara;
      await api.put(`app/estagiarios/${id}`, dataToSend);
      console.log("Estagiário atualizado com sucesso!");
      router.push({ name: "estagiarios" });
    } catch (error) {
      console.error("Erro ao atualizar estagiário:", error.response.data);
    }
  };

  const voltarPagina = () => {
    router.push({ name: "estagiarios" });
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
      buscarEstagiario,
      atualizarEstagiario,
      voltarPagina
    };
  },
  mounted() {
    
    this.buscarEstagiario();
  },
});
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
