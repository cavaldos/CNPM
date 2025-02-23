import DataConnect from '../../utils/DataConnect';

const UserRepository = {
    async createUser(userName: string, email: string, fullName: string, role: string) {
        const proc = 'create_user';
        const params = {
            UserName: userName,
            Email: email,
            FullName: fullName,
            Role: role
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateUser(userID: number, userName: string, email: string, fullName: string, role: string) {
        const proc = 'update_user';
        const params = {
            UserID: userID,
            UserName: userName,
            Email: email,
            FullName: fullName,
            Role: role
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteUser(userID: number) {
        const proc = 'delete_user';
        const params = {
            UserID: userID
        };
        return await DataConnect.executeProcedure(proc, params);
    }
};

export default UserRepository;
