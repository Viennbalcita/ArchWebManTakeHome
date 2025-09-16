import mongoose from 'mongoose';

//Could possibly be turned into an object under a series or even channel?
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true},
    description: { type: String, required: true },
    link: { type: String, required: true },
    channel: { type: String, required: true },
    series: { type: String, required: false} 
});

const video = mongoose.model('Video', videoSchema);
export default video;