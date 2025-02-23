import DataConnect from '../../utils/DataConnect';

const NotifyRepository = {
    async createNotify(messageNotify: string, statusNotify: string, receiveUserID: number) {
        const proc = 'create_notify';
        const params = {
            MessageNotify: messageNotify,
            StatusNotify: statusNotify,
            ReceiveUserID: receiveUserID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateNotify(notifyID: number, messageNotify: string, statusNotify: string) {
        const proc = 'update_notify';
        const params = {
            NotifyID: notifyID,
            MessageNotify: messageNotify,
            StatusNotify: statusNotify
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteNotify(notifyID: number) {
        const proc = 'delete_notify';
        const params = {
            NotifyID: notifyID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getAllNotifications() {
        const query = `
            SELECT n.*, 
                   u.FullName as ReceiverName
            FROM [Notify] n
            INNER JOIN [User] u ON n.ReceiveUserID = u.UserID
            ORDER BY n.CreatedDate DESC
        `;
        return await DataConnect.execute(query);
    },

    async getNotificationsByUser(userID: number) {
        const query = `
            SELECT n.*
            FROM [Notify] n
            WHERE n.ReceiveUserID = @UserID
            ORDER BY n.CreatedDate DESC
        `;
        const params = {
            UserID: userID
        };
        return await DataConnect.executeWithParams(query, params);
    }
};

export default NotifyRepository;
