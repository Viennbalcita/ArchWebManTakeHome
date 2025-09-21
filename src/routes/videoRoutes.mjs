import express from 'express';
import video from '../models/video.mjs';


const router = express.Router();

router.post('/create',async (req, res) => {
    try {
        const { title, date, description, link, channel, series } = req.body;

        const newVideo = new video({
            title,
            date,
            description,
            link,
            channel,
            series
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
        const { title, date, description, link, channel, series } = req.body;
        const updatedVideo = await video.findByIdAndUpdate(videoid,{title,date, description, link, channel, series}, {new: true, runValidators: true});

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
        const deletedVideo = await video.findByIdAndDelete(videoid);

        if (!deletedVideo) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.status(200).json({ message: 'Video deleted successfully', video: deletedVideo });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
    });



export default router;