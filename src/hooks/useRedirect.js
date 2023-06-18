import axios from 'axios';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post('/dj-rest-auth/token/refresh/');
        // user IS logged in
        if (userAuthStatus === 'loggedIn') {
          history.push('/');
        }
      } catch (err) {
        // user is NOT logged in
        if (userAuthStatus === 'loggedOut') {
          history.push('/');
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};