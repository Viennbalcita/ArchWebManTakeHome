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

export default router;