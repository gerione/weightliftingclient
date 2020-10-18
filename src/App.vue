
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>


<script>

const default_layout = "default";

export default {
    computed: {
    layout() {
      if (this.$route.meta.layout === "overlay") {
        this.$vuetify.theme.dark = false;  
        this.$vuetify.theme.light = true;  
      }
      else {
        this.$vuetify.theme.dark = true;  
        this.$vuetify.theme.light = false;
      }
      return (this.$route.meta.layout || default_layout) + "-layout";
      
    }
  }
};
</script>