import express from 'express';
import videoModel from '../models/video.mjs';
import seriesModel from '../models/series.mjs';
import channelModel from '../models/channel.mjs';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { title, date, description, link, series } = req.body;
        const foundSeries = await seriesModel.findOne({name: series});
        const newVideo = new videoModel({
            title,
            date,
            description,
            link,
            series: foundSeries._id
        });

        await newVideo.save()
            .then(() => res.status(201).json({ message: 'Video created successfully' }))
            .catch((error) => res.status(400).json({ error }));
    } 
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update/:id', async (req, res) => {

    try {
        const videoid = req.params.id;
        const { title, date, description, link, series } = req.body;
        const seriesId = await seriesModel.findOne({name: series});

        const updatedVideo = await videoModel.findByIdAndUpdate(videoid,{title,date, description, link, series: seriesId._id}, {new: true, runValidators: true});

        if(!updatedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        else {
            res.status(200).json({ message: 'Video updated successfully', video: updatedVideo });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const videoid = req.params.id;
        const deletedVideo = await videoModel.findByIdAndDelete(videoid);

        if (!deletedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.status(200).json({ message: 'Video deleted successfully', video: deletedVideo });
    } 
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
    });

router.get('/get/:id', async (req, res) => {
    try {
        const videoid = req.params.id;
        const foundVideo = await videoModel.findById(videoid);

        if (!foundVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.status(200).json({ video: foundVideo });
    } 
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/select-all/:seriesName', async (req, res) => {
    try {
        const selectSeriesName = await seriesModel.findOne({ name: req.params.seriesName });
        const foundVideos = await videoModel.find({ series: selectSeriesName._id });
        res.status(200).json({ foundVideos });

        if(!foundVideos) {
            return res.status(404).json({ error: 'No videos found for this series' });
        }
    } 
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
router.get('/get-latest/:channel', async (req, res) => {
    try {
        const channelDoc = await channelModel.findOne({ name: req.params.channel });

        //Get all seriesId under the requested channel
        const channelSeriesIds = await seriesModel.find({ channelId: channelDoc._id }).select('_id');

        //Get the ids of the series
        const seriesIds = channelSeriesIds.map(doc => doc._id);

        //Find the latest video among the series under the requested channel
        const latestVideo = await videoModel.findOne({ series: { $in: seriesIds } }).sort({ date: -1 });

        if (!latestVideo) {
            return res.status(404).json({ error: 'No videos found for this channel' });
        }

        res.status(200).json({ latestVideo });
    } 
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
export default router;