<template>
<v-app  style="background: rgba(0,0,0,0);" >
  <v-main >
    <v-container fluid>
      <slot />
    </v-container>
  </v-main>
</v-app>
</template>

<style>
  html { overflow-y: auto }
</style>