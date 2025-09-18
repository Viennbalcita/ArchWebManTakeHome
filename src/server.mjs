import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// Model for videos
// import video from '../models/video.mjs';

// //routes
// import create from '../routes/create.mjs';
// import deletevideo from '../routes/deletevideo.mjs';
// import get from '../routes/get.mjs';
// import getLatest from '../routes/get-latest.mjs';
// import selectAll from '../routes/select-all.mjs';
// import update from '../routes/update.mjs';

const app = express();
const PORT = 5000

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

// app.use('/api/videos', create);
// app.use('/api/videos', deletevideo);
// app.use('/api/videos', get);
// app.use('/api/videos', getLatest);
// app.use('/api/videos', selectAll);
// app.use('/api/videos', update);
