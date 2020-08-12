<template>
    <v-container>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                     <v-text-field v-model="username" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="password" type="password" label="Password"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-btn>Login</v-btn>
                    
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
    </v-container>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  
});
</script>