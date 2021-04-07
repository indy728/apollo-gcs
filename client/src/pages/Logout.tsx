import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useLogoutMutation} from 'generated/graphql';
import { clearAuth } from 'my-util';

const Logout: React.FC = () => {
  const [logout, {client}] = useLogoutMutation();
  const history = useHistory();

  useEffect(() => {

    const handleLogout = async() => {

      try {
        await logout();
        clearAuth();
        await client.resetStore();
        history.push('/auth')
      } catch (err) {
        console.log(err.message)
      }
    }

    handleLogout();
    // logout();
    // dispatch(setAccessToken(""))
    // client.resetStore();
  }, []);

  return <div>...logging out</div>
}

export default Logout;