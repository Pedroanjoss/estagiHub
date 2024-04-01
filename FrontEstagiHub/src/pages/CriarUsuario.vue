<template>
    <q-page>
      <q-card class="q-pa-md">
        <q-card-section>
          <q-form
            @submit="criarUsuario"
            @reset="limparFormulario"
            class="q-gutter-md"
          >
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
                <q-btn type="submit" color="primary" label="Criar Usuário" />
                <q-btn color="secondary" label="Cancelar" @click="voltarPagina" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  import { api } from "src/boot/axios";
  import { useRouter } from "vue-router";
  
  export default defineComponent({
    setup() {
      const form = ref({
        nome: "",
        email: "",
        telefone: "",
        perfil: "",
        status: "",
        senha: "",
        confirmarSenha: "",
      });
  
      const perfilOptions = ["Administrador", "Usuario"];
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
  
      const perfilRules = [(val) => !!val || "Por favor, selecione o perfil"];
  
      const statusRules = [(val) => !!val || "Por favor, selecione o status"];
  
      const senhaRules = [(val) => !!val || "Por favor, digite a senha"];
  
      const confirmarSenhaRules = [
        (val) => !!val || "Por favor, confirme a senha",
        (val) => val === form.value.senha || "As senhas não coincidem",
      ];
  
      const router = useRouter();
  
      const criarUsuario = async () => {
        try {
          const { confirmarSenha, ...dataToSend } = form.value;
  
          const telefoneSemMascara = dataToSend.telefone.replace(/\D/g, "");
          dataToSend.telefone = telefoneSemMascara;
  
          await api.post("app/usuarios", dataToSend);
          console.log("Usuário criado com sucesso!");
         
          router.push({ name: "usuarios" });
        } catch (error) {
          console.error("Erro ao criar usuário:", error.response.data);
        }
      };
      
      const voltarPagina = () => {
        router.push({ name: "usuarios" });
      };
  
      return {
        form,
        perfilOptions,
        statusOptions,
        nomeRules,
        emailRules,
        telefoneRules,
        perfilRules,
        statusRules,
        senhaRules,
        confirmarSenhaRules,
        criarUsuario,
        voltarPagina
      };
    },
  });
  </script>
  
  <style scoped>
    /* Adicione estilos personalizados aqui, se necessário */
  </style>
  