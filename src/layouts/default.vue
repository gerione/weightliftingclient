<template>
  <v-app >
    <v-navigation-drawer
          clipped
      v-model="drawer"
      app
    >
      
      <v-list>
          <v-list-item v-for="item in items" :key="item.text"
            :to="item.link"
          >
                        <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar
       clipped-left
      shrink-on-scroll
      app
    >
      
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      
     
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    
    </v-app-bar>
    <v-content>
      <slot />
    </v-content>
    
    <v-footer :fixed="fixed" app>
      <span>&copy; Gerald Kettlgruber - SK VÖEST - 2019  </span> 
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
          { title: 'Home', icon: 'dashboard', link: '/'},
          { title: 'About', icon: 'question_answer', link: '/about/' },
        ],
      title: "SK VÖEST Gewichtheben - LIVE"
    };
  },
  name: "App",
};
</script>
