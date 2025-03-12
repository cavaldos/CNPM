import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";

const InstructorPage = () => {
  const navigate = useNavigate();

  // Các khóa học gần đây (giả lập dữ liệu)
  const recentCourses = [
    { id: 1, title: "Introduction to Web Development", students: 120, status: "Published" },
    { id: 2, title: "Advanced JavaScript Programming", students: 85, status: "Draft" }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Typography variant="h4" component="h1" className="mb-8 text-gray-800">
        Instructor Dashboard
      </Typography>

      {/* Action cards */}
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12} md={3}>
          <Card
            className="p-6 h-full cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/create-course")}
          >
            <div className="flex flex-col items-center text-center h-full justify-center space-y-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <AddIcon fontSize="large" className="text-blue-600" />
              </div>
              <Typography variant="h6" className="font-semibold">
                Tạo khóa học
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Bắt đầu tạo khóa học mới và chia sẻ kiến thức của bạn với học viên
              </Typography>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            className="p-6 h-full cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/my-courses")}
          >
            <div className="flex flex-col items-center text-center h-full justify-center space-y-4">
              <div className="bg-green-100 p-4 rounded-full">
                <SchoolIcon fontSize="large" className="text-green-600" />
              </div>
              <Typography variant="h6" className="font-semibold">
                Quản lý khóa học
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Xem và quản lý các khóa học đã tạo, theo dõi hiệu suất
              </Typography>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            className="p-6 h-full cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/messages")}
          >
            <div className="flex flex-col items-center text-center h-full justify-center space-y-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <MessageIcon fontSize="large" className="text-purple-600" />
              </div>
              <Typography variant="h6" className="font-semibold">
                Tin nhắn
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Tương tác với học viên, trả lời câu hỏi và cung cấp hỗ trợ
              </Typography>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card
            className="p-6 h-full cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate("/profile")}
          >
            <div className="flex flex-col items-center text-center h-full justify-center space-y-4">
              <div className="bg-amber-100 p-4 rounded-full">
                <PersonIcon fontSize="large" className="text-amber-600" />
              </div>
              <Typography variant="h6" className="font-semibold">
                Hồ sơ cá nhân
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Quản lý thông tin cá nhân, cài đặt tài khoản và bảo mật
              </Typography>
            </div>
          </Card>
        </Grid>
      </Grid>

      {/* Recent courses section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" component="h2" className="text-gray-800">
            Khóa học gần đây
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/my-courses")}
          >
            Xem tất cả
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên khóa học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.students}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${course.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="text" color="primary" size="small">
                      Chỉnh sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics summary */}
      <div>
        <Typography variant="h5" component="h2" className="text-gray-800 mb-4">
          Tổng quan hoạt động
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className="p-4">
              <Typography variant="h6" className="text-gray-600 mb-1">Tổng số học viên</Typography>
              <Typography variant="h4" className="font-bold">205</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="p-4">
              <Typography variant="h6" className="text-gray-600 mb-1">Xếp hạng trung bình</Typography>
              <Typography variant="h4" className="font-bold">4.8/5.0</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="p-4">
              <Typography variant="h6" className="text-gray-600 mb-1">Tin nhắn chưa đọc</Typography>
              <Typography variant="h4" className="font-bold">12</Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default InstructorPage;
