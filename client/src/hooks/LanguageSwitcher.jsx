import { useSelector } from "react-redux";

function useTranslateWord(word) {
    const { language } = useSelector((state) => state.setting);

    const translateWord = (word, targetLanguage) => {
        const translation = constants.find(item => item.key === word);
        if (!translation) return word;

        if (targetLanguage === "vi") return translation.vi;
        if (targetLanguage === "en") return translation.en;

        return word;
    };

    return translateWord(word, language || "en");
}

function LanguageSwitcher(word) {
    // Đây là việc gọi custom hook, lưu ý rằng bạn cần gọi trong một React component
    // hoặc gọi trực tiếp trong một custom hook nếu cần.
    const translatedWord = useTranslateWord(word);
    return translatedWord;
}


export default LanguageSwitcher;

const constants = [
    { key: "Home", en: "Home", vi: "Trang chủ" },
    { key: "Explore", en: "Explore", vi: "Khám phá" },
    { key: "Search", en: "Search", vi: "Tìm kiếm" },
    { key: "My Courses", en: "My Courses", vi: "Khóa học của tôi" },
    { key: "coursera", en: "coursera", vi: "coursera" },
    { key: "Find amazing courses", en: "Find amazing courses", vi: "Tìm kiếm khóa học tuyệt vời" },
    { key: "Online Degrees", en: "Online Degrees", vi: "Bằng cấp trực tuyến" },
    { key: "Careers", en: "Careers", vi: "Nghề nghiệp" },
    { key: "Join for Free", en: "Join for Free", vi: "Tham gia miễn phí" },
    { key: "My Profile", en: "My Profile", vi: "Hồ sơ của tôi" },
    { key: "Settings", en: "Settings", vi: "Cài đặt" },
    { key: "Logout", en: "Logout", vi: "Đăng xuất" },
    { key: "Account", en: "Account", vi: "Tài khoản" },
    { key: "Language", en: "Language", vi: "Ngôn ngữ" },
    { key: "Theme", en: "Theme", vi: "Chủ đề" },
    { key: "Light", en: "Light", vi: "Sáng" },
    { key: "Dark", en: "Dark", vi: "Tối" },
    { key: "System", en: "System", vi: "Hệ thống" },
    { key: "Current language", en: "Current language", vi: "Ngôn ngữ hiện tại" },
    { key: "Profile", en: "Profile", vi: "Hồ sơ" },
    { key: "Retry", en: "Retry", vi: "Thử lại" },
    { key: "what do you want to learn?", en: "what do you want to learn?", vi: "Bạn muốn học gì?" },
    { key: "Popular right now", en: "Popular right now", vi: "Phổ biến hiện tại" },
    { key: "Recently viewed", en: "Recently viewed", vi: "Xem gần đây" },
    { key: "Suggested courses for you", en: "Suggested courses for you", vi: "Khóa học đề xuất cho bạn" },
    { key: "Search results for", en: "Search results for", vi: "Kết quả tìm kiếm cho" },
    { key: "No courses found", en: "No courses found", vi: "Không tìm thấy khóa học nào" },
    { key: "No courses found for keyword", en: "No courses found for keyword", vi: "Không tìm thấy khóa học nào cho từ khóa" },
    { key: "Course Detail", en: "Course Detail", vi: "Chi tiết khóa học" },
    { key: "My Learning", en: "My Learning", vi: "Quá trình học tập" },
    { key: "Learning", en: "Learning", vi: "Học tập" },
    { key: "Search courses", en: "Search courses", vi: "Tìm kiếm khóa học" },
    { key: "Course name", en: "Course name", vi: "Tên khóa học" },
    { key: "Instructor", en: "Instructor", vi: "Giảng viên" },
    { key: "Enroll now", en: "Enroll now", vi: "Đăng ký ngay" },
    { key: "Start learning", en: "Start learning", vi: "Bắt đầu học" },
    { key: "Enrolled", en: "Enrolled", vi: "Đã đăng ký" },
    { key: "Completed", en: "Completed", vi: "Hoàn thành" },
    { key: "Course progress", en: "Course progress", vi: "Tiến độ khóa học" },
    { key: "Loading your courses...", en: "Loading your courses...", vi: "Đang tải khóa học của bạn..." },
    { key: "Try again", en: "Try again", vi: "Thử lại" },
    { key: "You don't have any enrolled courses yet.", en: "You don't have any enrolled courses yet.", vi: "Bạn chưa đăng ký khóa học nào." },
    { key: "You haven't completed any courses yet.", en: "You haven't completed any courses yet.", vi: "Bạn chưa hoàn thành khóa học nào." },
    { key: "Course", en: "Course", vi: "Khóa học" },
    { key: "Enrolled on", en: "Enrolled on", vi: "Đã đăng ký vào" },
    { key: "Complete Course", en: "Complete Course", vi: "Hoàn thành khóa học" },
    { key: "Processing...", en: "Processing...", vi: "Đang xử lý..." },
    { key: "complete", en: "complete", vi: "hoàn thành" },
    { key: "My Purchases", en: "My Purchases", vi: "Đơn mua của tôi" },
    { key: "Updates", en: "Updates", vi: "Cập nhật" },
    { key: "Accomplishments", en: "Accomplishments", vi: "Thành tích" },
    { key: "Help Center", en: "Help Center", vi: "Trung tâm trợ giúp" },
    { key: "Get Coursera PLUS", en: "Get Coursera PLUS", vi: "Nâng cấp Coursera PLUS" },
    { key: "Access 10,000+ courses", en: "Access 10,000+ courses", vi: "Truy cập 10,000+ khóa học" },
    { key: "students", en: "students", vi: "học viên" },
    { key: "created_at", en: "Created at", vi: "Tạo vào" },
];
