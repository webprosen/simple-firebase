import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config'

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result);
                const loggedUser = result.user;
                setUser(loggedUser);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                console.log(result);
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
                console.log(result);
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
            {user ?
                <button className='btn btn-danger' onClick={handleGoogleSignOut}>Sign Out</button> :
                <>
                    <button className='btn btn-primary me-3' onClick={handleGoogleSignIn}>Google Login</button>
                    <button className='btn btn-warning' onClick={handleGithubSignIn}>Github Login</button>
                </>
            }

        </div>
    );
};

export default Login;