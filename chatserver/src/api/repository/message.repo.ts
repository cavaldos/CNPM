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

    async getConversation(user1Id: string, user2Id: string) {
        return await Message.find({
            $or: [
                { sender: user1Id, receiver: user2Id },
                { sender: user2Id, receiver: user1Id },
            ],
        }).sort({ createdAt: 1 });
    },

    async getUserMessages(userId: string) {
        return await Message.find({
            $or: [{ sender: userId }, { receiver: userId }],
        }).sort({ createdAt: -1 });
    },

    async markMessageAsRead(messageId: string) {
        return await Message.findByIdAndUpdate(
            messageId,
            { isRead: true },
            { new: true }
        );
    },

    async getUnreadCount(userId: string) {
        return await Message.countDocuments({
            receiver: userId,
            isRead: false,
        });
    },

    async getConversationPartners(userId: string) {
        // Find all messages where the user is either sender or receiver
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }],
        });

        // Extract unique user IDs that have communicated with this user
        const partners = new Set();

        messages.forEach((message) => {
            if (message.sender.toString() === userId) {
                partners.add(message.receiver.toString());
            } else if (message.receiver.toString() === userId) {
                partners.add(message.sender.toString());
            }
        });

        return Array.from(partners);
    },

    isValidObjectId(id: string) {
        return mongoose.Types.ObjectId.isValid(id);
    }
};

export default MessageRepo;