<template>
    <q-page>
      <q-card class="q-pa-md">
        <q-card-section>
          <q-form
            @submit="atualizarUsuario"
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
                  v-model="form.perfil"
                  label="Perfil"
                  :options="perfilOptions"
                  :rules="perfilRules"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col">
                <q-select
                  outlined
                  v-model="form.status"
                  label="Status"
                  :options="statusOptions"
                  :rules="statusRules"
                />
              </div>
              <div class="col">
                <q-input
                  outlined
                  v-model="form.senha"
                  label="Senha"
                  :rules="senhaRules"
                />
              </div>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col">
                <q-input
                  outlined
                  v-model="form.confirmarSenha"
                  label="Confirmar Senha"
                  :rules="confirmarSenhaRules"
                />
              </div>
            </div>
            <div class="q-mt-md">
              <q-btn type="submit" color="primary" label="Atualizar Usuário" />
              <q-btn color="secondary" label="Cancelar" @click="voltarPagina()" />
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
        perfil: "",
        status: "",
        senha: "",
        confirmarSenha: "",
      });
  
      const statusOptions = ["Ativo", "Inativo"];
      const perfilOptions = ["Administrador", "Usuario"];
  
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
      const perfilRules = [(val) => !!val || "Por favor, selecione o perfil"];
      const statusRules = [(val) => !!val || "Por favor, selecione o status"];
  
      const senhaRules = [(val) => !!val || "Por favor, digite a senha"];
  
      const confirmarSenhaRules = [
        (val) => !!val || "Por favor, confirme a senha",
        (val) => val === form.value.senha || "As senhas não coincidem",
      ];
  
      const router = useRouter();
  
      const buscarUsuario = async () => {
        try {
          const id = route.params.id;
          const response = await api.get(`app/usuarios/${id}`);
          const usuario = response.data;
          
          form.value.nome = usuario.nome;
          form.value.email = usuario.email;
          form.value.telefone = usuario.telefone;
          form.value.perfil = usuario.perfil;
          form.value.status = usuario.status;
          form.value.senha = usuario.senha;
          form.value.confirmarSenha = usuario.senha;
         
        } catch (error) {
          console.error("Erro ao buscar usuário:", error.response.data);
        }
      };
  
      const atualizarUsuario = async () => {
      try {
        const id = route.params.id;
        const { confirmarSenha, ...dataToSend } = form.value;
        const telefoneSemMascara = dataToSend.telefone.replace(/\D/g, "");
        dataToSend.telefone = telefoneSemMascara;
        await api.put(`app/usuarios/${id}`, dataToSend);
        console.log("Usuário atualizado com sucesso!");
        router.push({ name: "usuarios" });
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error.response.data);
      }
    };
  
    const voltarPagina = () => {
      router.push({ name: "usuarios" });
    };
  
      return {
        form,
        statusOptions,
        perfilOptions,
        nomeRules,
        emailRules,
        telefoneRules,
        perfilRules,
        statusRules,
        senhaRules,
        confirmarSenhaRules,
        buscarUsuario,
        atualizarUsuario,
        voltarPagina
      };
    },
    mounted() {
      this.buscarUsuario();
    },
  });
  </script>
  
  <style scoped>
  
  </style>
  