import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import InstructorService from "../../services/instructor.service";
import { Card } from "@mui/material";
import Reviews from "./Reviews";

const CourseReport = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseEnrollments = async () => {
      try {
        setLoading(true);
        const response = await InstructorService.getAllStudentByCourseID(courseId);
        console.log("Course data:", response);
        if (response.data) {

          setEnrollments(response.data);
          setError(null);
        } else {
          setError("Không tìm thấy thông tin khóa học.");
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Không thể tải danh sách học viên. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseEnrollments();
    }
  }, [courseId]);

  const handleBack = () => navigate("/my-courses");

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Báo cáo tiến độ</h1>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
            onClick={handleBack}
          >
            <ArrowLeft size={20} /> Quay lại
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 size={40} className="animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : (
        <>
          <Card className="p-4 bg-blue-50 border border-blue-200">

            <div class="pl-2">
              <div class="flex justify-between mb-1">
                <span class="text-lg font-medium dark:text-white">Tổng số học viên: {enrollments.length}</span>
              </div>
            </div>

            <div class="p-2">
              <div class="flex justify-between mb-1">
                <span class="text-base font-medium dark:text-white">Tổng số học viên đang học: {enrollments.filter(e => e.EnrollmentStatus == "Enrolled").length}</span>
                <span class="text-base font-medium text-blue-700 dark:text-white">{(enrollments.filter(e => e.EnrollmentStatus == "Enrolled").length / enrollments.length * 100).toPrecision(2) + '%'}</span>
              </div>
              <div class="w-full h-6 bg-gray-300 rounded-full dark:bg-gray-700">
                <div class="h-6 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: enrollments.filter(e => e.EnrollmentStatus == "Enrolled").length / enrollments.length * 100 + '%' }}></div>
              </div>
            </div>

            <div class="p-2">
              <div class="flex justify-between mb-1">
                <span class="text-base font-medium dark:text-white">Tổng số học viên đã hoàn tất khóa học: {enrollments.filter(e => e.EnrollmentStatus == "Completed").length}</span>
                <span class="text-base font-medium text-blue-700 dark:text-white">{(enrollments.filter(e => e.EnrollmentStatus == "Completed").length / enrollments.length * 100).toPrecision(2) + '%'}</span>
              </div>
              <div class="w-full h-6 bg-gray-300 rounded-full dark:bg-gray-700">
                <div class="h-6 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: enrollments.filter(e => e.EnrollmentStatus == "Completed").length / enrollments.length * 100 + '%' }}></div>
              </div>
            </div>

            <div class="p-2">
              <div class="flex justify-between mb-1">
                <span class="text-base font-medium dark:text-white">Tổng số học viên hủy khóa học: {enrollments.filter(e => e.EnrollmentStatus == "Dropped").length}</span>
                <span class="text-base font-medium text-blue-700 dark:text-white">{(enrollments.filter(e => e.EnrollmentStatus == "Dropped").length / enrollments.length * 100).toPrecision(2) + '%'}</span>
              </div>
              <div class="w-full h-6 bg-gray-300 rounded-full dark:bg-gray-700">
                <div class="h-6 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: enrollments.filter(e => e.EnrollmentStatus == "Dropped").length / enrollments.length * 100 + '%' }}></div>
              </div>
            </div>

          </Card>
          <Reviews data={enrollments.filter(e => e.Review != null)}>
          </Reviews>
        </>
      )}
    </div>
  );
}

export default CourseReport;