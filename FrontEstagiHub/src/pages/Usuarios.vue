<template>
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      flat bordered
      title="Usuários"
      :rows="usuarios"
      :columns="columns"
      row-key="id"
      virtual-scroll
      :rows-per-page-options="[0]"
    >
      <template v-slot:body-cell-actions="{ row }">
        <q-btn @click="editarUsuario(row.id)" color="secondary" label="Editar" />
        <q-btn @click="confirmarExclusao(row)" color="negative" label="Excluir" />
      </template>
    </q-table>

    <q-btn @click="criarUsuario()" color="primary" label="Criar Usuário" />

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
import { api } from 'boot/axios';

export default {
  data() {
    return {
      usuarios: [],
      columns: [
        { name: 'nome', label: 'Nome', align: 'left', field: 'nome' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
        { name: 'telefone', label: 'Telefone', align: 'left', field: 'telefone' }, // Adicionando a coluna de telefone
        { name: 'perfil', label: 'Perfil', align: 'left', field: 'perfil' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' },
        { name: 'actions', label: 'Ações', align: 'center' }
      ],
      exibindoModalExclusao: false,
      usuarioParaExcluir: null
    };
  },
  created() {
    this.fetchUsuarios();
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await api.get('/app/usuarios');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    },
    
    criarUsuario() {
      this.$router.push({ name: "criarUsuario" });
    },

    editarUsuario(id) {
      this.$router.push({ name: 'editarUsuario', params: { id } });
    },
    
    confirmarExclusao(row) {
      this.usuarioParaExcluir = row;
      this.exibindoModalExclusao = true;
    },

    async excluirUsuario() {
      try {
        if (this.usuarioParaExcluir) {
          await api.delete(`/app/usuarios/${this.usuarioParaExcluir.id}`);
          this.usuarios = this.usuarios.filter(usuario => usuario.id !== this.usuarioParaExcluir.id);
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
</style>
