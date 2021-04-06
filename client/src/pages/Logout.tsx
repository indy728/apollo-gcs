import React, {useEffect} from 'react';
import {useLogoutMutation} from 'generated/graphql';

const Logout: React.FC = () => {
  const [logout, {client}] = useLogoutMutation();

  useEffect(() => {

    const handleLogout = async() => {

      try {
        await logout();
        // setAccessToken('');
        localStorage.setItem('token', '')
        await client.resetStore();
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