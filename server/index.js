const app = require('express')();
const cors = require('cors');
const Stream = require('node-rtsp-stream');

app.use(cors());

// Stores all stream information with port as key
const streams = {};

// Example of a stream config
const stream_config = [{
    key: 'bunny_video',
    url: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4',
    port: 9000
}];




app.get('/test', (req, res) => {
    console.log(req.query);
    res.send("Test response successful");
})

app.listen(8080, () => {
    console.log('Server listening on localhost 8080');
});