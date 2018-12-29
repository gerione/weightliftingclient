<template>
 <v-container grid-list-xs>
     
    <v-layout v-bind="binding" >
      <v-flex d-flex xs4 >
        <v-card  dark>
          <v-card-title class="pb-0 pt-1">
            <div>
            <span class="headline">Gerald Kettlgruber</span>
            <br> 
            <span>SK VÖEST </span>

            </div>
          </v-card-title>
          <v-card-text class="py-1">
          <div>Total: 90kg</div>
        <div>Punkte: 90kg</div>

          </v-card-text>
          
          
        </v-card>
      </v-flex>
      
            <v-flex d-flex xs4 >
        <v-card dark>
          <v-card-title  class="pb-0  pt-1">
            <div>
            <span class="headline">Reissen</span>
            <br />
            <span>Best: 90kg</span>
            </div>
          </v-card-title>
          <v-card-text class="py-1">
             <v-chip class="font-weight-black">
               <v-avatar>
                 <v-icon color="green">check</v-icon>
               </v-avatar>
              125 
          </v-chip>
           <v-chip class="font-weight-black">
               <v-avatar>
                 <v-icon color="red">clear</v-icon>
               </v-avatar>
              125 
          </v-chip>
           <v-chip class="font-weight-black">
               <v-avatar>
                 <v-icon>timer</v-icon>
               </v-avatar>
              125 
          </v-chip>
          </v-card-text>
          
        </v-card>
      </v-flex>
      
      <v-flex d-flex xs4 >
        <v-card  dark>
          <v-card-title  class="pb-0  pt-1">
            <div>
              <span class="headline">Stossen</span>
            <br /><br />
            <span> </span>
            </div>
          </v-card-title>
          <v-card-text class="py-1"> 
             <v-chip class="font-weight-black"> 
               <v-avatar>
                 <v-icon color="green">check</v-icon>
               </v-avatar>
              125 
          </v-chip>
           <v-chip>
               <v-avatar>
                 <v-icon color="red">clear</v-icon>
               </v-avatar>
              125 
          </v-chip>
           <v-chip elevation-24>
               <v-avatar>
                 <v-icon>timer</v-icon>
               </v-avatar>
              125 
          </v-chip>
          </v-card-text>
          
        </v-card>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    }),

  
   computed: {
    binding () {
      const binding = {}
      binding.column=true
      if (this.$vuetify.breakpoint.mdAndUp) binding.column = false

      return binding
    }
  }
  }
</script>