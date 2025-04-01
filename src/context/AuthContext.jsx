import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context with a default value
const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          // You might want to validate the token with your backend here
          setToken(storedToken);
          
          // Mock user data - replace this with actual user data from your API
          setUser({
            _id: 'tempId',
            name: 'User',
            email: 'user@example.com'
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      loading
    }),
    [user, token, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the context itself in case it's needed
export { AuthContext };
