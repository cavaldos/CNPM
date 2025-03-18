import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const oktaAuth = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra xem oktaAuth có tồn tại không
  const auth = oktaAuth?.oktaAuth;
  const authState = oktaAuth?.authState;

  const login = async () => {
    if (auth) {
      try {
        await auth.signInWithRedirect();
      } catch (error) {
        console.error('Lỗi đăng nhập:', error);
      }
    } else {
      console.error('Okta Auth chưa được khởi tạo');
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (authState?.isAuthenticated && auth) {
          const userClaims = await auth.getUser();
          setUserInfo(userClaims);
          console.log('User Info:', userClaims);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      } finally {
        setLoading(false);
      }
    };

    if (authState !== undefined) {
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, [authState, auth]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      {!authState || !authState.isAuthenticated ? (
        <button className="login-button" onClick={login}>Login with Okta</button>
      ) : (
        <div className="user-info-container">
          <h2>Đăng nhập thành công!</h2>
          <h3>Thông tin người dùng:</h3>
          <div className="user-info">
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
