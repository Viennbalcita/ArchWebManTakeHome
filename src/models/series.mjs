import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true }, // Reference to Channel model
});

const series = mongoose.model('Series', seriesSchema);
export default series;