'use client'
import { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/utils/Firebase'; // Import Firestore
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore methods
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            sessionStorage.setItem('user', JSON.stringify(userData));
            router.push('/');
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
        }
      };

      fetchUserProfile();
    }
  }, [user, router]);

  useEffect(() => {
    if (error) {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        router.push('/sign-up');  // Redirect to sign-up page if user not found
      } else {
        setErrorMessage('Failed to sign in. Please try again.');
      }
    }
  }, [error, router]);

  const handleSignIn = async () => {
    setErrorMessage('');  // Clear any existing error messages
    await signInWithEmailAndPassword(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign In
        </button>
        <div className='mt-8'>
          <p>New User?
            <Link href={'./SignUp'}
              className='text-white'
              > Create an Account here </Link>
          </p></div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignIn;
