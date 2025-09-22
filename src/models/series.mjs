import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema({
    nae: { type: String, required: true },
    channelid: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true }, // Reference to Channel model
});

const series = mongoose.model('Series', seriesSchema);
export default series;