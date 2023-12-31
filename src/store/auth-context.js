import React, { useState, useEffect, useCallback } from 'react'; 

let logoutTimer; 

const AuthContext = React.createContext({
  token: '', 
  isLoggedIn: false, 
  login: (token) => {}, 
  logout: () => {}
});


const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); 
  const adjExpirationTime = new Date(expirationTime).getTime(); 
  console.log(`Current Time: ${currentTime} ADJExpirationTime: ${adjExpirationTime}`)
  const remainingDuration = adjExpirationTime - currentTime; 
  return remainingDuration; 
};


const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token'); 
  const storedExpirationTime = localStorage.getItem('expirationTime'); 
  console.log(`Stored Token: ${storedToken} Stored Expiration Time: ${storedExpirationTime}`);
  const remainingTime = calculateRemainingTime(storedExpirationTime); 
  console.log(`Remaining Time: ${remainingTime}`);
  if (remainingTime <= 3600) {
    localStorage.removeItem('token'); 
    localStorage.removeItem('expirationTime'); 
    return null; 
  }

  return {
    token: storedToken, 
    duration: remainingTime
  };
};


export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken(); 
  let initialToken; 
  if (tokenData) {
    initialToken = tokenData.token; 
  }
  const [token, setToken] = useState(initialToken); 
  console.log(token); 
  const userIsLoggedIn = !!token; 

  const logoutHandler = useCallback(() => {
    setToken(null); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('expirationTime'); 
    console.log(`Logging you out now!`);
    if (logoutTimer) {
      clearTimeout(logoutTimer); 
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token); 
    localStorage.setItem('token', token); 
    localStorage.setItem('expirationTime', expirationTime); 
    // console.log(`Token: ${token} Expiration Time: ${expirationTime}`);
    // const remainingTime = calculateRemainingTime(expirationTime); 
    // console.log(`Token: ${token}, RemainingTime: ${remainingTime}`);
    // logoutTimer = setTimeout(logoutHandler, remainingTime); 
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration); 
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token, 
    isLoggedIn: userIsLoggedIn, 
    login: loginHandler, 
    logout: logoutHandler
  }
  return (
  <AuthContext.Provider value={contextValue}>
    {props.children}
  </AuthContext.Provider>
  );
};

export default AuthContext; 