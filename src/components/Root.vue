<template>
 <v-container grid-list-xs>
     
    <v-data-table
      :headers="headers"
      :items="competitions"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">      
        <td>{{ props.item.start_time }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.location }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
        { text: "Start time", value: "start_time" },
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      { text: "Location", value: "location" },
      
    ],
    competitions: [
      {
        id: 1,
        location: "Auwiesen",
        name: "Wettkampf 1",
        start_time: "Fri, 28 Dec 2018 14:05:00 GMT",
        youtube_id: "1234"
      }
    ]
  }), 
  
  mounted: function() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      var api = this.source + "api/competitions/";
      this.axios.get(api).then(response => {
        this.competitions= response.data;
        
      });
      setTimeout(this.loadData, 15000);
    }
  }
};
</script>