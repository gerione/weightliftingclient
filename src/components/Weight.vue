<template>
    <svg width="100%" height="100%">

    <rect x="10%" y="45%" rx="10" ry="10" width="80%" height="10%" style="fill:grey;stroke:black;stroke-width:4;opacity:1" />

    <rect x="30%" y="41%" rx="10" ry="10" width="5%" height="18%" style="fill:grey;stroke:black;stroke-width:4;opacity:1" />
    Sorry, your browser does not support inline SVG.

    <text v-if="lifter.sex == true" x="12%" y="50%"  font-size="22" fill="red">FEMALE</text>
    <template v-for="disc in weightDiscs">
        <rect :x="(disc.x+35)+'%'" :y="(50-disc.height/2)+'%'" rx="10" ry="10" :width="disc.width+'%'" :height="disc.height+'%'" :style="'fill:'+ disc.color + ';stroke:black;stroke-width:4;opacity:1'" />
    </template>
    </svg>

</template>




<script>
export default {
  data() {
    return {
      lifter: {
        id: 12,
        lifter_id: 4945,
        lifts: [
          {
            attempt: 1,
            id: 193,
            result: 0,
            weight: 1.0
          },
          {
            attempt: 2,
            id: 194,
            result: 0,
            weight: 0.0
          },
          {
            attempt: 3,
            id: 195,
            result: 0,
            weight: 0.0
          },
          {
            attempt: 4,
            id: 196,
            result: 0,
            weight: 0.0
          },
          {
            attempt: 5,
            id: 197,
            result: 0,
            weight: 0.0
          },
          {
            attempt: 6,
            id: 198,
            result: 0,
            weight: 0.0
          }
        ],
        name: " ",
        sex: true,
        sf: 1.0000,
        team: {
          id: 1,
          name: "default",
          short: ""
        },
        weightclass: {
          id: 4,
          max_weight: 59.0,
          min_weight: 55.0,
          name: "W-59",
          sex: true
        }
      },
      discs: [
          {
            weight: 25,
            color: "red",
            width: 5, 
            height: 80, 
            type: "disc",
            amount: -1
          },
          {
            weight: 20,
            color: "blue",
            width: 4.5, 
            height: 80,
            type: "disc",
            amount: -1
          },
          {
            weight: 15,
            color: "yellow",
            width: 4.0, 
            height: 80,
            type: "disc",
            amount: -1
          },
          {
            weight: 10,
            color: "green",
            width: 3.0, 
            height: 80,
            type: "disc",
            amount: 1
          },
          {
            weight: 5,
            color: "white",
            width: 2.0, 
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
            height: 22,
            type: "collar",
            amount: 1
          },
          {
            weight: 2.0,
            color: "blue",
            width: 1.0, 
            height: 50,
            type: "disc",
            amount: 1
          },
          {
            weight: 1.5,
            color: "yellow",
            width: 1.0, 
            height: 45,
            type: "disc",
            amount: 1
          },
          {
            weight: 1.0,
            color: "green",
            width: 1.0, 
            height: 40,
            type: "disc",
            amount: 1
          },
          {
            weight: 0.5,
            color: "white",
            width: 1.0, 
            height: 30,
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
    weightDiscs() {
        var weight = this.lodash.find(this.lifter.lifts, function(o) { return o.result == 0; }).weight;
        if (this.lifter.sex == true){
          return this.weightToDiscs((weight-20)/2,this.discs, 0);
        }
        else {
          return this.weightToDiscs((weight-25)/2,this.discs, 0);
        }
        
        
    }
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
      weightToDiscs:function (weight, disc, x){
          if (weight <= 0) {
            if (disc[0].weight > 2.5) {
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
    loadData: function() {
      var api =
        this.source +
        "api/competitions/" +
        this.competitionid +
        "/lifters/current/";
      this.axios
        .get(api)
        .then(response => {
          this.lifter = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      setTimeout(this.loadData, 5000);
    }
  }
};
</script>