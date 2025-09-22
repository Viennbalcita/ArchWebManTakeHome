import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
});

const channel = mongoose.model('Channel', channelSchema);
export default channel;