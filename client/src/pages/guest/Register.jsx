import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, CircularProgress, TextField, Typography } from '@mui/material';
import AuthService from '../../services/auth.service';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.userName || !formData.email || !formData.password || !formData.fullName) {
            setError('Vui lòng điền đầy đủ thông tin');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Email không hợp lệ');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            // Gửi dữ liệu đăng ký
            const response = await AuthService.register({
                userName: formData.userName,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName
            });

            setSuccess(true);

            // Chuyển hướng đến trang đăng nhập sau 2 giây
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đã xảy ra lỗi khi đăng ký';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <div>
                    <Typography variant="h4" component="h1" className="text-center font-bold text-gray-900">
                        Đăng Ký Tài Khoản
                    </Typography>
                    <Typography variant="body1" className="mt-2 text-center text-gray-600">
                        Tạo tài khoản để bắt đầu học tập trên nền tảng của chúng tôi
                    </Typography>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <Alert severity="error" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" className="mb-4">
                            Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...
                        </Alert>
                    )}

                    <div className="rounded-md shadow-sm space-y-4">
                        <TextField
                            label="Họ và tên"
                            name="fullName"
                            type="text"
                            required
                            fullWidth
                            variant="outlined"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />

                        <TextField
                            label="Tên đăng nhập"
                            name="userName"
                            type="text"
                            required
                            fullWidth
                            variant="outlined"
                            value={formData.userName}
                            onChange={handleInputChange}
                        />

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            required
                            fullWidth
                            variant="outlined"
                            value={formData.email}
                            onChange={handleInputChange}
                        />

                        <TextField
                            label="Mật khẩu"
                            name="password"
                            type="password"
                            required
                            fullWidth
                            variant="outlined"
                            value={formData.password}
                            onChange={handleInputChange}
                        />

                        <TextField
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            type="password"
                            required
                            fullWidth
                            variant="outlined"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={loading}
                            className="py-3"
                        >
                            {loading ? <CircularProgress size={24} /> : 'Đăng Ký'}
                        </Button>
                    </div>

                    <div className="text-center mt-4">
                        <Typography variant="body2">
                            Đã có tài khoản?{' '}
                            <span
                                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                onClick={() => navigate('/login')}
                            >
                                Đăng nhập ngay
                            </span>
                        </Typography>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;