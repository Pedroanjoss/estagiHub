<template>
    <q-page padding>
      <div>Estagiarios</div>
      <div class="q-pa-md">
        <q-table
          :rows="posts"
          :columns="columns"
          row-key="nome"
        />
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const posts = ref([
    { nome: 'Nome 1', Email: 'email1@example.com', Telefone: '123456789', Perfil: 'Perfil 1' },
    { nome: 'Nome 2', Email: 'email2@example.com', Telefone: '987654321', Perfil: 'Perfil 2' },
    // Adicione mais dados conforme necessário
  ]);
  
  const columns = [
    { name: 'nome', required: true, label: 'Nome', align: 'left', field: row => row.nome },
    { name: 'Email', required: true, label: 'Email', align: 'left', field: row => row.Email },
    { name: 'Telefone', required: true, label: 'Telefone', align: 'left', field: row => row.Telefone },
    { name: 'Perfil', required: true, label: 'Perfil', align: 'left', field: row => row.Perfil },
  ];
  </script>
