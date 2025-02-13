/* eslint-disable no-console */
import DataFetcher from './DataFetcher';

function setGuestSession() {
  const createNewGuestSession = async () => {
    try {
      const data = await DataFetcher.getSession();
      console.log(data);

      if (data.success) {
        // eslint-disable-next-line camelcase
        const { guest_session_id, expires_at } = data;

        localStorage.setItem('guest_session_id', guest_session_id);
        localStorage.setItem('guest_session_expires_at', expires_at);
        localStorage.removeItem('myRatings');

        console.log('New Guest Session created. Session ID:', guest_session_id);
      } else {
        console.error('Failed to create a new guest session');
      }
    } catch (error) {
      console.error('Error creating guest session:', error);
    }
  };

  const checkGuestSession = async () => {
    const storedSession = localStorage.getItem('guest_session_id');
    const storedExpiration = localStorage.getItem('guest_session_expires_at');

    if (storedSession && storedExpiration) {
      const now = new Date();
      const expirationDate = new Date(storedExpiration);

      if (now < expirationDate) {
        console.log('Guest session is valid. Session ID:', storedSession);
        return;
      }
    }

    await createNewGuestSession();
  };

  checkGuestSession();
}

export default setGuestSession;
