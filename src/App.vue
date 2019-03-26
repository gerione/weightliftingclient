<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
    <!-- 
      
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
         <v-subheader class="mt-3 grey--text text--darken-1">Live</v-subheader>

          
      </v-list>-->
      <v-list>
          <v-list-tile v-for="item in competitions" :key="item.text" avatar 
            :to="item.id"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
              <v-list-tile-sub-title v-text="item.location">Test</v-list-tile-sub-title>
            </v-list-tile-content>
            
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      
     
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    
    <v-footer :fixed="fixed" app>
      <span>&copy; Gerald Kettlgruber - SK VÖEST - 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      videoId: "lG0Ys-2d4MA",

      items: [
        {
          icon: "cast",
          title: "Live",
          path: "/"
        },
        {
          icon: "account_box",
          title: "Current",
          path: "/current"
        }
      ],
      competitions: [
        { picture: 28, name: "NL: SKV II - VSD1", id: "/scoreboard/1" }
      ],
      miniVariant: false,
      title: "SK VÖEST Gewichtheben - LIVE"
    };
  },
  name: "App",

  mounted: function() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      var api = this.source + "api/competitions/";
      this.axios.get(api).then(response => {
        this.competitions=[]
        response.data.forEach(element => {
          this.competitions.push({picture:28, name: element.name, id:"/scoreboard/" + element.id, location: element.location})
        });
      });
      setTimeout(this.loadData, 15000);
    }
  }
};
</script>
