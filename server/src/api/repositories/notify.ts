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
    }
};

export default NotifyRepository;
