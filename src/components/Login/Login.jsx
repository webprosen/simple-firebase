import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config'

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
            .then(result => {
                setUser(null);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className='text-center'>
            {user &&
                <div className='mb-3'>
                    <h3>User: {user?.displayName}</h3>
                    <p>Email: {user?.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
            {user?
                <button className='btn btn-danger' onClick={handleGoogleSignOut}>Sign Out</button>:
                <button className='btn btn-primary' onClick={handleGoogleSignIn}>Google Login</button>
            }
            
        </div>
    );
};

export default Login;