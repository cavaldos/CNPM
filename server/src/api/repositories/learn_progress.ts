import DataConnect from '../../utils/DataConnect';

const LearnProgressRepository = {
    async createLearnProgress(studentID: number, lessonID: number, processStatus: string, startTime?: Date, completionTime?: Date) {
        const proc = 'create_learn_progress';
        const params = {
            StudentID: studentID,
            LessonID: lessonID,
            ProcessStatus: processStatus,
            StartTime: startTime,
            CompletionTime: completionTime
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateLearnProgress(progressID: number, processStatus: string, startTime?: Date, completionTime?: Date) {
        const proc = 'update_learn_progress';
        const params = {
            ProgressID: progressID,
            ProcessStatus: processStatus,
            StartTime: startTime,
            CompletionTime: completionTime
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteLearnProgress(progressID: number) {
        const proc = 'delete_learn_progress';
        const params = {
            ProgressID: progressID
        };
        return await DataConnect.executeProcedure(proc, params);
    }
};

export default LearnProgressRepository;