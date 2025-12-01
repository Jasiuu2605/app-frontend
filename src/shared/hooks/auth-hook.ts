import { useState, useEffect, useCallback } from 'react';

type StoredUserData = {
  userId: string;
  token: string;
  expiration: string;
};

let logoutTimer: ReturnType<typeof setTimeout>;

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );

  const login = useCallback(
    (uid: string, token: string, expirationDate?: Date) => {
      setToken(token);
      setUserId(uid);

      const tokenExp =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // 1h
      setTokenExpirationDate(tokenExp);

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExp.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remaining = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remaining);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (!stored) return;

    const storedData: StoredUserData = JSON.parse(stored);

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId };
};
