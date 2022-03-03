<template>
  <div class="rtspForm">
    <div class="fields">
      <label for="Name">Name</label>
      <input type="text" v-model="name" id="Name" name="Name" />
    </div>
    <div class="fields">
      <label for="RTSP URL">RTSP Url</label>
      <input type="text" v-model="url" id="RTSP URL" name="RTSP URL" />
    </div>
    <div class="fields">
      <label for="Port">Port</label>
      <input type="text" v-model="port" id="Port" name="Port" />
    </div>
    <button @click="onclick" class="add">Add</button>
  </div>
</template>

<script>
export default {
  name: "AddRtspForm",
  data() {
    return {
      name: "",
      url: "",
      port: "",
    };
  },
  methods: {
    onclick() {
      const streamConfig = {
        name: this.name,
        url: this.url,
        port: this.port,
      };

      this.$emit("addStream", streamConfig);

      this.name = "";
      this.url = "";
      this.port = "";
    },
  },
};
</script>

<style>
.rtspForm {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.fields {
  display: grid;
  grid-template-columns: 100px 200px;
  align-items: center;
}

.fields > input {
  padding: 3px;
}

.add {
  background: none;
  border: 1px solid rgb(0, 194, 0);
  width: 100px;
  height: 30px;
  font-size: 20px;
  color: rgb(0, 194, 0);
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>