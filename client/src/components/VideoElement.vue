<template>
  <div class="videoElement">
    <button class="remove" @click="onremove">Remove</button>
    <div class="videoName">{{ config.name }}</div>
    <div class="videoWrapper" :id="id.substring(1)"></div>
    <div class="buttonWrapper">
      <button @click="loadRTSP">Load</button>
      <button @click="playRTSP">Play</button>
      <button @click="pauseRTSP">Pause</button>
      <button @click="stopRTSP">Stop</button>
    </div>
  </div>
</template>

<script>
import JSMpeg from "@cycjimmy/jsmpeg-player";

export default {
  name: "VideoElement",
  data() {
    return {
      id: "",
      player: null,
    };
  },
  props: {
    config: String,
  },
  mounted() {
    // this.loadRTSP();
    this.id = "#vid-" + this.config.name;
    console.log(this.id);
  },
  methods: {
    onremove() {
      this.stopRTSP();
      this.$emit("removeStream", this.config.name);
    },
    loadRTSP() {
      if (this.player !== null) {
        return;
      }
      console.log("Loading...");

      // "http://localhost:8080/startStream?port=9000&url=rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4&name=bunny"
      fetch(
        `http://localhost:8080/startStream?port=${this.config.port}&url=${this.config.url}&name=${this.config.name}`
      )
        .then((response) => response.json())
        .then((data) => console.log(data));

      this.player = new JSMpeg.VideoElement(
        this.id,
        `ws://localhost:${this.config.port}`
      );
    },
    playRTSP() {
      console.log("Playing...");
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
      if (this.player === null) {
        return;
      }
      console.log("Stopping...");

      fetch(`http://localhost:8080/stopStream?port=${this.config.port}`)
        .then((response) => response.json())
        .then((data) => console.log(data));

      this.player.destroy();
      this.player = null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videoWrapper {
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
  cursor: pointer;
}

.remove {
  background: none;
  border: 1px solid red;
  width: 100px;
  height: 40px;
  font-size: 20px;
  color: red;
  border-radius: 0.25rem;
  cursor: pointer;
}

.videoElement {
  padding: 40px;
}

.videoName {
  font-size: 24px;
  margin-top: 20px;
}
</style>
