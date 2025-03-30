import { useState, useEffect } from "react";
import StudentService from "../../../services/student.service";
import { useParams } from "react-router-dom";
const LearningService = () => {
    const { enrollmentId, courseId, lessonId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [lessonId2, setLessonId] = useState(null);
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const fetchLessons = async (enrollmentID) => {
        try {
            const response = await StudentService.progress.getAllLessonInProgress(enrollmentID);
            if (response.success) {
                setLessons(response.data);
                console.log("Lessons:", response.completionPercentage);
                setCompletionPercentage(response.completionPercentage);
                const firstLessonID = response.data[0]?.LessonID || null;
                setLessonId(firstLessonID);
                return { success: true, data: response.data };
            } else {
                console.error(response.message);
                return { success: false, message: response.message };
            }
        } catch (error) {
            console.error("Error fetching lessons:", error);
            return { success: false, message: error.message };
        }
    };


    return {
        lessons,
        setLessons,
        fetchLessons,
        lessonId2,
        enrollmentId,
        courseId,
        lessonId,
        completionPercentage,
    };
}

export default LearningService;