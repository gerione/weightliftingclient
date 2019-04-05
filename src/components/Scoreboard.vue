<template>
    <scoreboardtable :competitionid="competitionid" ref="scoreboardtable"></scoreboardtable>
 </template>

<script>


export default {

  data() {
    return {
      competitionid: -1,
      videoId: "21X5lGlDOfg",
      playerVars: {
        autoplay: 1,
      },
    };
  },
};
</script>