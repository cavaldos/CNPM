import DataConnect from '../../utils/DataConnect';

const ForumRepository = {
    async createForumMessage(content: string, courseID: number, userID: number) {
        const proc = 'create_forum_message';
        const params = {
            Content: content,
            CourseID: courseID,
            UserID: userID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateForumMessage(forumMessageID: number, content: string) {
        const proc = 'update_forum_message';
        const params = {
            ForumMessageID: forumMessageID,
            Content: content
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteForumMessage(forumMessageID: number) {
        const proc = 'delete_forum_message';
        const params = {
            ForumMessageID: forumMessageID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getForumMessagesByCourse(courseID: number) {
        const proc = 'get_course_forum_messages';
        const params = {
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getForumMessagesByUser(userID: number) {
        const proc = 'get_user_forum_messages';
        const params = {
            UserID: userID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getLatestMessages(limit: number) {
        const proc = 'get_latest_forum_messages';
        const params = {
            Limit: limit
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getMessageCount(courseID: number) {
        const proc = 'get_forum_message_count';
        const params = {
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    }
};

export default ForumRepository;