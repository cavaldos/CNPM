import { useEffect, useState } from 'react';
// import FireBaseLoginPage from '../../components/auth/firebase/LoginPage';
// import OktaLoginPage from '../../components/auth/okta/LoginPage';
import AuthService from '../../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/features/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  console.log('User from Redux:', user);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await AuthService.getInfo(email);
      console.log('Response from server:', response.data.UserID);
      dispatch(setUser({
        UserID: response.data.UserID,
        UserName: response.data.UserName,
        Email: response.data.Email,
        FullName: response.data.FullName,
        Role: response.data.Role,
        CreatedTime: response.data.CreatedTime,
        UpdateTime: response.data.UpdateTime,
      }))


    } catch (err) {
      console.error('Lỗi khi lấy thông tin người dùng:', err);
      setError(err.response?.data?.message || 'Đã xảy ra lỗi khi lấy thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen mt-8">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập bằng Email</h2>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập địa chỉ email của bạn"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>
      </div>

      <div className="w-full max-w-md flex space-x-4">
        <div className="w-1/2">
          {/* <FireBaseLoginPage /> */}
        </div>
        <div className="w-1/2">
          {/* <OktaLoginPage /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
