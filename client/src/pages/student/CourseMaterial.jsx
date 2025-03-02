
import LearnProcessVideo from "../../components/Learn/LearnVideo";
import LearnProcessDoc from "../../components/Learn/LearnDoc";


import LearningLayout from "../../components/Layout/student/LearningLayout";
const CourseMaterialPage = () => {
    return (
        <LearningLayout>
            <div className="flex flex-col gap-4">
                <LearnProcessVideo />
                <LearnProcessDoc />
            </div>
        </LearningLayout>
    );
}
export default CourseMaterialPage;