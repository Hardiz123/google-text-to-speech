const express = require('express');

const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());


app.post('/getAudio', (req, res) => {

    const { text } = req.body;

    const textToSpeech = require('@google-cloud/text-to-speech');
    require('dotenv').config();
    const client = new textToSpeech.TextToSpeechClient();

    const input = {
        text: text
    };

    const voice = {
        languageCode: 'en-US',
        name: 'en-US-Wavenet-A',
        ssmlGender: 'NEUTRAL'
    }

    const audioConfig = {
        audioEncoding: 'MP3',
    }

    const request = {
        input: input,
        voice: voice,
        audioConfig: audioConfig
    }

    client.synthesizeSpeech(request).then(response => {

        const [audioResponse] = response;
        const audioContent = audioResponse.audioContent;
        res.send(audioContent);

    }).catch(err => {
        console.error('ERROR:', err);
    }
    );
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

