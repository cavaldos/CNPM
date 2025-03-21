import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const { oktaAuth } = useOktaAuth();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await oktaAuth.signOut();
            navigate('/login');
        } catch (err) {
            console.error('Error during logout:', err);
        }
    };

    return { logout };
};

export default useLogout;