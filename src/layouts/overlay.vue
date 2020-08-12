<template>
<v-app  style="background: rgba(0,0,0,0);" >
  <v-content >
    <v-container fluid>
      <slot />
    </v-container>
  </v-content>
</v-app>
</template>

<style>
  html { overflow-y: auto }
</style>