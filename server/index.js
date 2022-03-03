const app = require('express')();
const cors = require('cors');
const Stream = require('node-rtsp-stream');

app.use(cors());

// Stores all stream information with port as key
const streams = {};

// Example of a stream config
const stream_configs = [
    {
        name: 'bunny_video1',
        url: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4',
        port: 9000
    },
    {
        name: 'bunny_video2',
        url: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4',
        port: 9001
    }
];


/* ---------------------------------- Helper functions ------------------------------------- */
const startStream = (name, streamUrl, wsPort) => {
    const stream = new Stream({
        name,
        streamUrl,
        wsPort,
        ffmpegOptions: {
            '-stats': '',
            '-r': 30
        }
    })
    
    streams[wsPort] = stream;
}

const stopStream = (port) => {
    streams[port].stop();
    streams[port] = null;
}



/* ----------------------------------- API Endpoints --------------------------------------- */
// Start stream
app.get('/startStream', (req, res) => {
    // url -> RTSP link
    // port -> wsport
    // name -> name of the stream (optional)
    const { url, port, name="stream" } = req.query;

    if (!url && !port) {
        return res.json({
            message: "Bad input"
        });        
    }

    if (streams[port]) {
        return res.json({
            message: "Port currently in used"
        });
    }

    startStream(name, url, port);
    res.json({
        message: "Stream started"
    });
})

// Stop stream
app.get('/stopStream', (req, res) => {
    // port -> port that the stream is playing on
    const { port } = req.query;

    // Check if port is being used
    if (!streams[port]) {
        return res.json({
            message: "Port is not in used"
        });
    }

    stopStream(port);
    res.json({
        message: "Stream stopped"
    });
})

app.get('/test', (req, res) => {
    console.log(req.query);
    res.send("Test response successful");
})




app.listen(8080, () => {
    console.log('Server listening on localhost 8080');
    // stream_configs.forEach(config => {
    //     startStream(config.key, config.url, config.port);
    // })
})
