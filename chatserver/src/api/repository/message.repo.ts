import Message from '../../model/message.model';
import mongoose from 'mongoose';

const MessageRepo = {
    async createMessage(sender: string, receiver: string, content: string) {
        const newMessage = new Message({
            sender,
            receiver,
            content,
            isRead: false,
        });

        return await newMessage.save();
    },

    async getConversation(sender: string, receiver: string) {
        return await Message.find({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender },
            ],
        }).sort({ createdAt: 1 });
    },

    async deleteMessage(messageId: string, userId: string) {
        // Find message first to verify sender
        const message = await Message.findById(messageId);

        // If message doesn't exist or user is not the sender, return null
        if (!message || message.sender.toString() !== userId) {
            return null;
        }

        // Delete the message if user is the sender
        return await Message.findByIdAndDelete(messageId);
    },

    isValidObjectId(id: string) {
        return mongoose.Types.ObjectId.isValid(id);
    }
};

export default MessageRepo;