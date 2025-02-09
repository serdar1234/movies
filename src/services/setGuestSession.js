/* eslint-disable no-console */
import dataFetcher from './dataFetcher';

function setGuestSession() {
  const createNewGuestSession = async () => {
    try {
      // const genres = await dataFetcher.getGenres();
      const data = await dataFetcher.getSession();
      // console.table(genres);

      if (data.success) {
        // eslint-disable-next-line camelcase
        const { guest_session_id, expires_at } = data;

        localStorage.setItem('guest_session_id', guest_session_id);
        localStorage.setItem('guest_session_expires_at', expires_at);

        console.log('New Guest Session created. Session ID:', guest_session_id);
      } else {
        console.error('Failed to create a new guest session');
      }
    } catch (error) {
      console.error('Error creating guest session:', error);
    }
  };

  const checkGuestSession = () => {
    const storedSession = localStorage.getItem('guest_session_id');
    const storedExpiration = localStorage.getItem('guest_session_expires_at');

    if (storedSession && storedExpiration) {
      const now = new Date();
      const expirationDate = new Date(storedExpiration);

      // Check if the guest_session_id is not expired
      if (now < expirationDate) {
        console.log('Guest session is valid. Session ID:', storedSession);
        return;
      }
    }

    createNewGuestSession();
  };

  checkGuestSession();
}

export default setGuestSession;
