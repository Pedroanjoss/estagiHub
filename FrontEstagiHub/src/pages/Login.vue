<template>
    <q-page class="q-gutter-md d-flex justify-center align-center" style="height: 80vh;">
      <div style="width: 50%; margin: 10% 25%;">
        <q-page padding class="d-flex justify-center align-center" style="height: 100%;">
          <q-form @submit="submitForm">
            <div style="margin-bottom: 10px;">
              <label for="email">E-mail</label>
              <q-input outlined v-model="user.email" label="Usuário" id="usuario" />
            </div>
            
            <div style="margin-bottom: 10px;">
              <label for="senha">Senha</label>
              <q-input outlined v-model="user.senha" label="Senha" type="password" id="senha" />
            </div>
    
            <div style="padding-top: 10px;">
              <q-btn type="submit" color="primary" style="width: 100%;">
                <div class="ellipsis">
                  Entrar
                </div>
              </q-btn>
            </div>
          </q-form>
        </q-page>
      </div>
    </q-page>
  </template>
  
  <script setup>
  defineOptions({
    name: 'LoginPage'
  });
  
  import { reactive } from 'vue';
  import { api } from '../boot/axios'

  const email = reactive({
    email:'',
    senha:''
  });
 
  
  async function login () {
    try {
        const {data} = await api.post('auth', user)
    } catch (error) {
        console.log(error?.response?.data)
    }
  };
  </script>
  
  <style>
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  </style>
  