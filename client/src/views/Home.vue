<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <add-rtsp-form @add-stream="addStream" />

    <div v-for="config in streamConfigs" :key="config.name">
      <video-element :config="config" @removeStream="removeStream" />
    </div>
    <!-- <video-element :config="testConfigs[0]" @removeStream="removeStream" /> -->
    <!-- <video-element :config="testConfigs[1]" @removeStream="removeStream" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import AddRtspForm from "../components/AddRtspForm.vue";
import VideoElement from "../components/VideoElement.vue";

export default {
  name: "Home",
  components: {
    AddRtspForm,
    VideoElement,
  },
  data() {
    return {
      streamConfigs: [],
      testConfigs: [
        {
          key: "bunny_video",
          url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
          port: 9000,
        },
        {
          key: "bunny_video2",
          url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
          port: 9001,
        },
      ],
    };
  },
  methods: {
    addStream(config) {
      console.log("Added config...");
      this.streamConfigs = [...this.streamConfigs, config];
    },
    removeStream(name) {
      console.log(name);
      this.streamConfigs = this.streamConfigs.filter(
        (config) => config.name !== name
      );
    },
  },
};
</script>
