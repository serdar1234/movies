/* eslint-disable no-console */
import FetchData from './FetchData';

function SetSession() {
  const createNewGuestSession = async () => {
    try {
      const data = await FetchData.getSession();

      if (data.success) {
        const { guest_session_id: guestSessionID, expires_at: expiresAt } = data;

        localStorage.setItem('guestSessionID', guestSessionID);
        localStorage.setItem('guestSessionExpiresAt', expiresAt);
        localStorage.removeItem('myRatings');
      } else {
        console.error('Failed to create a new guest session');
      }
    } catch (error) {
      console.error('Error creating guest session:', error);
    }
  };

  const checkGuestSession = async () => {
    const storedSession = localStorage.getItem('guestSessionID');
    const storedExpiration = localStorage.getItem('guestSessionExpiresAt');

    if (storedSession) {
      const now = new Date();
      const expirationDate = new Date(storedExpiration);

      if (now < expirationDate) {
        return;
      }
    }

    await createNewGuestSession();
  };

  checkGuestSession();
}

export default SetSession;
