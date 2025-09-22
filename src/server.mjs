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
    .then( async () => {
        console.log('Connected to MongoDB')
        // Ensures the channel and series collections exist in the database if not it creates them
        try {
            if( await channel.findOne({name: 'NCA'}) === null) {
                const newChannel = new channel({name: 'NCA',});
                await newChannel.save()
                console.log('NCA channel created');
            }
            if( await channel.findOne({name: 'ENT'}) === null) {
                await channel.create({name: 'ENT'});
                console.log('ENT channel created');
            }
            if( await channel.findOne({name: 'ADS'}) === null) {
                await channel.create({name: 'ADS'});
                console.log('ADS channel created');
            }
            // Get objectIds of channels
            const ncaId = await channel.findOne({name: 'NCA'});
            const entId = await channel.findOne({name: 'ENT'});
            const adsId = await channel.findOne({name: 'ADS'});
                //initialize NCA seriesse
            if( await series.findOne({name: 'Archers Recap', channelId: ncaId._id}) === null) {
                await series.create({name: 'Archers Recap', channelId: ncaId._id});
                console.log('Archers Recap series created');
            }
            if( await series.findOne({name: 'seARCHlight', channelId: ncaId._id}) === null) {
                await series.create({name: 'seARCHlight', channelId: ncaId._id});
                console.log('seARCHlight series created');
            }
                //initialize ENT seriesses
            if( await series.findOne({name: 'Animo Kaya Mo Ba?', channelId: entId._id}) === null) {
                await series.create({name:'Animo Kaya Mo Ba?', channelId: entId._id})
                console.log('Animo Kaya Mo Ba? series created');
            }
            if( await series.findOne({name:'Meowcumentary'}) === null) {
                await series.create({name:'Meowcumentary', channelId: entId})
                console.log('Meowcumentary series created');
            }
                //initialize ADS seriesses
            if( await series.findOne({name:'Brand Promotions'}) === null) {
                await series.create({name:'Brand Promotions', channelId: adsId})
                console.log('Brand Promotions series created');
            }
            if( await series.findOne({name:'Lasallian Organizations & Offices'}) === null) {
                await series.create({name:'Lasallian Organizations & Offices', channelId: adsId})
                console.log('Lasallian Organizations & Offices series created');
            }
        }

        catch (error) {
            console.error('Failed to initialize database:', error);
        }
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));



app.use('/routes/video', videoRoutes)

