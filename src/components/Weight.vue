<template>
    <svg width="100%" height="100%">

    <rect x="10%" y="47%" rx="10" ry="10" width="80%" height="6%" style="fill:grey;stroke:black;stroke-width:4;opacity:1" />
    <rect x="45%" y="44%" rx="10" ry="10" width="45%" height="12%" style="fill:grey;stroke:black;stroke-width:4;opacity:1" />

    <rect x="35%" y="41%" rx="10" ry="10" width="5%" height="18%" style="fill:grey;stroke:black;stroke-width:4;opacity:1" />
    Sorry, your browser does not support inline SVG.

    <text v-if="sex == true" x="12%" y="52%"  font-size="5vh" font-weight="bold" fill="red">F</text>
    <template v-for="disc in weightDiscs">
        <rect :x="(disc.x+40)+'%'" :y="(50-disc.height/2)+'%'" rx="10" ry="10" :width="disc.width+'%'" :height="disc.height+'%'" :style="'fill:'+ disc.color + ';stroke:black;stroke-width:4;opacity:1'" />
    </template>
    </svg>
</template>

<script>
export default {
  data() {
    return {
      sex: true,
      discs: [
          {
            weight: 25,
            color: "red",
            width: 6, 
            height: 80, 
            type: "disc",
            amount: -1
          },
          {
            weight: 20,
            color: "blue",
            width: 5, 
            height: 80,
            type: "disc",
            amount: -1
          },
          {
            weight: 15,
            color: "yellow",
            width: 4.5, 
            height: 80,
            type: "disc",
            amount: -1
          },
          {
            weight: 10,
            color: "green",
            width: 3.5, 
            height: 80,
            type: "disc",
            amount: 1
          },
          {
            weight: 5,
            color: "white",
            width: 2.5, 
            height: 50,
            type: "disc",
            amount: 1
          },
          {
            weight: 2.5,
            color: "red",
            width: 1.5, 
            height: 40,
            type: "disc",
            amount: 1
          },
          {
            weight: 2.5,
            color: "Silver",
            width: 7, 
            height: 24,
            type: "collar",
            amount: 1
          },
          {
            weight: 2.0,
            color: "blue",
            width: 1.0, 
            height: 35,
            type: "disc",
            amount: 1
          },
          {
            weight: 1.5,
            color: "yellow",
            width: 1.0, 
            height: 30,
            type: "disc",
            amount: 1
          },
          {
            weight: 1.0,
            color: "green",
            width: 1.0, 
            height: 25,
            type: "disc",
            amount: 1
          },
          {
            weight: 0.5,
            color: "white",
            width: 1.0, 
            height: 20,
            type: "disc",
            amount: 1
          },
        
        ],
    };
  },
  props: ["competitionid"],
  filters: {
    round: function(value) {
      return value.toFixed(2);
    }
  },
  computed: {
    weight(){
       try {
        return this.$store.getters.currentWeight;
      }
      catch(e) {
        console.log(e);
      }
      return 0;
    },
    sex(){
       try {
        return this.$store.getters.sex;

      }
      catch(e) {
        console.log(e);
      }
      return 0;
    },
    weightDiscs() {
        if (this.sex == true){
          return this.weightToDiscs((this.weight-20)/2,this.discs, 0);
        }
        else {
          return this.weightToDiscs((this.weight-25)/2,this.discs, 0);
        }
        
        
    }
  },
  methods: {
      weightToDiscs:function (weight, disc, x){
          if (weight <= 0) {
            if (disc.length > 0 && disc[0].weight >= 2.5) {
              var collar = this.lodash.find (disc, function(o) { return o.type === "collar"; });
              var disc1 = {
                color: collar.color,
                weight: collar.weight,
                x:x, 
                width: collar.width, 
                height: collar.height
              };
              return [disc1]
            }
            else 
              return [];
            }
            else {
                if (weight >= disc[0].weight){
                    var left = weight - disc[0].weight;
                    var disc1 = {
                        color: disc[0].color,
                        weight: disc[0].weight,
                        x:x, 
                        width: disc[0].width, 
                        height: disc[0].height
                    };
                    var newx = x + disc[0].width;
                    disc[0].amount = disc[0].amount - 1;
                    if (disc[0].amount == 0) {
                       return [disc1].concat(this.weightToDiscs(left, disc.slice(1), newx));
                    }
                    else {
                      return [disc1].concat(this.weightToDiscs(left, disc, newx));
                    }
                }
                else {
                    if (disc[0].weight == 2.5 && disc[0].type === "collar") {
                      var disc1 = {
                        color: disc[0].color,
                        weight: disc[0].weight,
                        x:x, 
                        width: disc[0].width, 
                        height: disc[0].height
                      };
                      var newx = x + disc[0].width;
                      return [disc1].concat(this.weightToDiscs(weight, disc.slice(1), newx));
                    } 
                    return this.weightToDiscs(weight, disc.slice(1), x);
                }
            }
      },
  }
};
</script>