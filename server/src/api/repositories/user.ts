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
    },

    async getAllUsers() {
        const query = `
            SELECT u.*, 
                   (SELECT COUNT(*) FROM Course c WHERE c.InstructorID = u.UserID) as CoursesCount,
                   (SELECT COUNT(*) FROM Invoice i WHERE i.StudentID = u.UserID) as InvoicesCount
            FROM [User] u
            ORDER BY u.CreatedTime DESC
        `;
        return await DataConnect.execute(query);
    },

    async getUserByID(userID: number) {
        const query = `
            SELECT * FROM [User] WHERE UserID = @UserID
        `;
        const params = { UserID: userID };
        return await DataConnect.executeWithParams(query, params);
    }
};

export default UserRepository;
