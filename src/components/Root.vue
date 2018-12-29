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
        location: "Adf222",
        name: "Test2333222",
        start_time: "Fri, 28 Dec 2018 14:05:00 GMT",
        youtube_id: "ffasdf"
      },
      {
        id: 2,
        location: "Adf222",
        name: "Test2333222",
        start_time: "Fri, 28 Dec 2018 14:05:00 GMT",
        youtube_id: "ffasdf"
      },
      {
        id: 3,
        location: "Auwiesen",
        name: "SKV - XYZ",
        start_time: "Mon, 31 Dec 2018 13:05:00 GMT",
        youtube_id: "wwMDvPCGeE0"
      },
      {
        id: 4,
        location: "Auwiesen",
        name: "SKV 2 - TEST",
        start_time: "Sun, 30 Dec 2018 13:10:00 GMT",
        youtube_id: "RnXqOe1IFr4"
      }
    ]
  })
};
</script>