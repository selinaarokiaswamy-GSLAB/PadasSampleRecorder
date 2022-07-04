import { useState, useRef, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import AuthContext from '../../store/auth-context'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

const AuthForm = () => {
  const navigate = useNavigate(); 
  const emailInputRef = useRef(); 
  const passwordInputRef = useRef(); 

  const authCtx = useContext(AuthContext); 
  const [isLogin, setIsLogin] = useState(true); 
  const [isLoading, setIsLoading] = useState(false); 
  
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault(); 
    const enteredEmail = emailInputRef.current.value; 
    const enteredPassword = passwordInputRef.current.value; 

    //optionally validation: 

    setIsLoading(true); 
    let url; 
    let body; 
    
    if (isLogin) {
      url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/signin`;
      body = {
        'username': enteredEmail, 
        'password': enteredPassword
      }
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`;
      body = {
        'username': enteredEmail, 
        'email': enteredEmail, 
        'password': enteredPassword
      }
    }
    fetch(url, {
      method: 'POST', 
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).then(res => {
      setIsLoading(false); 
      if (res.ok) {
        if (isLogin) {
          res.json().then(data => {
            console.log(data.expiresIn); 
            const expirationTime = new Date((new Date().getTime() + (+data.expiresIn))).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
            authCtx.login(data.accessToken, expirationTime.toISOString()); 
            navigate('/', { replace: true }); 
          });  
        } else {
          res.json().then(() => {
            alert("User registered successfully! Please login now.");
            emailInputRef.current.value = ""; 
            passwordInputRef.current.value = ""; 
            switchAuthModeHandler();        
            navigate('/auth', { replace: true }); 
          })
        }
      } else {
        res.json().then(data => {
          // show an error modal 
          let errorMessage = 'Authentication Failed!'; 
          if (data && data.message) {
            errorMessage = data.message; 
          }
          alert(errorMessage); 
        });
      }
    })
    .catch(err => {
      alert(err.message); 
    });
  }

  return (
    <section>
      <h1>{isLogin? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <TextField
          label="Email" 
          id="email"
          name="email"
          helperText="Enter email ID"
          inputRef={emailInputRef}
        />
        <TextField 
          label="Password" 
          id="password" 
          name="password"
          helperText="Enter Password"
          type="password"
          inputRef={passwordInputRef}
        />
        {!isLoading && <Button type="submit" variant="contained">{isLogin ? 'Login' : 'Create Account'}</Button>}
        {isLoading && <p>Sending Request...</p>}
        <Button
          onClick={switchAuthModeHandler} 
        >
          {isLogin ? 'Create new account' : 'Login with existing acount'}
        </Button>
      </form>
    </section>
  );
};


export default AuthForm; 