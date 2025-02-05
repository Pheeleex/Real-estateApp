'use client';
import { auth, db } from '@/utils/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/utils/signUpSchema';

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    getValues,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    const { email, password, username } = data;

    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res) {
        await setDoc(doc(db, 'users', res.user.uid), {
          id: res.user.uid,
          usermail: res.user.email,
        });

        localStorage.setItem('user', JSON.stringify({
          email: res.user.email,
          uid: res.user.uid,
          username: username,
        }));
        reset()
        router.push('../Dashboard');
      }else{
        if(error){
          const errorMessage = error.message || "An error occurred";
          
          if(errorMessage){
            setError("submit", {
              type: "server",
              message: errorMessage,
            });    
          } 
          console.log(errorMessage)      
        }
      }
    } catch (error) {
      console.log(error, "something went wrong")
      alert(error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          {...register("email", { required: 'Email is required' })}
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}

        <input
          {...register("username", { required: 'Username is required' })}
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            }
          })}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <input
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === getValues("password") || "Passwords must match"
          })}
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        
        <button 
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>
        
        {errors.submit && (
          <p className="text-red-500 mt-4">{errors.submit.message}</p>
        )}
        
        <div className='mt-8'>
          <p>Already have an account?
            <Link href={'./SignIn'} className='text-white'> Sign in here </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
