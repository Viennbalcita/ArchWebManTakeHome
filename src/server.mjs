import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// Model for database
import video from './models/video.mjs';
import channel from './models/channel.mjs';
import series from './models/series.mjs';

// Route
import videoRoutes from './routes/videoRoutes.mjs';

const app = express();
const PORT = 5000

app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

mongoose.connect('mongodb://localhost:27017/ArchBackendChallenge')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));



app.use('/routes/video', videoRoutes)

