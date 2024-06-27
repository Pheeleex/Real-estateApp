'use client';
import { auth, db } from '@/utils/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      
      if (res) {
        console.log({ res });
        sessionStorage.setItem('user', true);
        setEmail('');
        setPassword('');

        await setDoc(doc(db, 'users', res.user.uid), {
          id: res.user.uid,
          username: res.user.displayName,
          usermail: res.user.email // Fixed this to res.user.email since username might not be present
        });

        localStorage.setItem('user', JSON.stringify({ email: res.user.email, 
          uid: res.user.uid,username: res.user.displayName }));
        router.push('../Dashboard')
      } else {
        console.error('No response from createUserWithEmailAndPassword');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
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
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 mt-4">{error.message}</p>}
        <div className='mt-8'>
          <p>Already have an account?
            <Link href={'./SignIn'}
              className='text-white'
              > Sign in here </Link>
          </p></div>
      </div>
    </div>
  );
};

export default SignUp;
