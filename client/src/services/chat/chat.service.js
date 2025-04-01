import chatInstance from "./axios.chat.config";

const ChatService = {
    sendMessage: async (sender, receiver, content) => {
        const response = await chatInstance.post("/messages/send", { sender, receiver, content });
        return response;
    },
    getConversation: async (sender, receiver) => {
        const response = await chatInstance.post(`/messages/conversation`, { sender, receiver });
        return response;

        /** datademo
         * "data": [
        {
            "_id": "67dd97797fa0028afd9193a1",
            "sender": "1",
            "receiver": "2",
            "content": "ádfas",
            "isRead": false,
            "createdAt": "2025-03-21T16:44:41.830Z",
            "updatedAt": "2025-03-21T16:44:41.830Z"
        },
        {
            "_id": "67dd977a7fa0028afd9193a4",
            "sender": "1",
            "receiver": "2",
            "content": "ádfas",
            "isRead": false,
            "createdAt": "2025-03-21T16:44:42.854Z",
            "updatedAt": "2025-03-21T16:44:42.854Z"
        },
        {
            "_id": "67dd977e7fa0028afd9193a7",
            "sender": "1",
            "receiver": "2",
            "content": "ádfads",
            "isRead": false,
            "createdAt": "2025-03-21T16:44:46.007Z",
            "updatedAt": "2025-03-21T16:44:46.007Z"
        },
        {
            "_id": "67dd97867fa0028afd9193aa",
            "sender": "2",
            "receiver": "1",
            "content": "ádfads",
            "isRead": false,
            "createdAt": "2025-03-21T16:44:54.495Z",
            "updatedAt": "2025-03-21T16:44:54.495Z"
        },
        {
            "_id": "67dd97877fa0028afd9193ad",
            "sender": "2",
            "receiver": "1",
            "content": "ádfads",
            "isRead": false,
            "createdAt": "2025-03-21T16:44:55.122Z",
            "updatedAt": "2025-03-21T16:44:55.122Z"
        }
    ]
         */
    },
    deleteMessage: async (messageId, userId) => {
        const response = await chatInstance.post(`/messages/delete`, {
            messageId,
            userId

        });
        return response;
    }
}
export default ChatService;