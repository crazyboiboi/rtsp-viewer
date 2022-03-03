<template>
  <div class="hello">
    <div id="videoWrapper"></div>
    <div class="buttonWrapper">
      <button @click="loadRTSP">Load</button>
      <button @click="playRTSP">Play</button>
      <button @click="pauseRTSP">Pause</button>
      <button @click="stopRTSP">Stop</button>
    </div>
  </div>
</template>

<script>
import JSMpeg from '@cycjimmy/jsmpeg-player';

export default {
  name: 'HelloWorld',
  data() {
    return {
      player: null
    }
  },
  props: {
    msg: String
  },
  mounted() {
    // this.loadRTSP();
  },
  methods: {
    loadRTSP() {
      if(this.player !== null) {
        return;
      }
      console.log("Loading...");

      fetch('http://localhost:8080/startStream?port=9000&url=rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4&name=bunny')
        .then(response => response.json())
        .then(data => console.log(data));

      this.player = new JSMpeg.VideoElement('#videoWrapper', 'ws://localhost:9000');
    },
    playRTSP() {
      console.log("Playing...")
      if (this.player !== null) {
        this.player.play();
      }
    },
    pauseRTSP() {
      console.log("Pausing...");
      if (this.player !== null) {
        this.player.pause();
      }
    },
    stopRTSP() {
      if(this.player === null) {
        return;
      }
      console.log("Stopping...");

      fetch('http://localhost:8080/stopStream?port=9000')
        .then(response => response.json())
        .then(data => console.log(data));

      this.player.destroy();
      this.player = null;
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#videoWrapper {
  margin: 20px auto;
  width: 640px;
  height: 360px;
  border: 1px solid black;
}

.buttonWrapper {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.buttonWrapper > button {
  width: 100px;
  font-size: 24px;
}

</style>
