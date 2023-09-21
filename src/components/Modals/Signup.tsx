import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from "recoil";
import { auth } from '@/firebase/firebase';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { authModalStateAtom } from '@/atoms/authModalAtom';
import { Router, useRouter } from 'next/router';
import { toast } from 'react-toastify';
type SignupProps = {

};

const Signup: React.FC<SignupProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalStateAtom);
    const router = useRouter();
    const handleClick = (type: 'login' | 'register' | 'forgotPassword') => {
        setAuthModalState((prev) => ({ ...prev, type }))
    };
    const [inputs, setInput] = useState({ email: '', username: '', password: '' });
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password || !inputs.username) {
            toast.error("Some fields are empty", { position: 'top-center', autoClose: 3000, theme: 'dark' });
            return;
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser) return;
            router.push('/');
        } catch (e: any) {
            toast.error(e.message, { position: 'top-center', autoClose: 3000, theme: 'dark' });
        }
    }

    useEffect(() => {
        if (error) toast.error(error.message, { position: 'top-center', autoClose: 3000, theme: 'dark' });
    }, [error])

    return (<form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
        <h3 className='text-xl font-medium text-white'>Register to CodeMania</h3>
        <div>
            <label htmlFor="email" className='text-sm font-medium block mb-2 text-gray-300'>
                Email Address
            </label>
            <input onChange={handleChangeInput} type="email" name='email' id='email' className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='name@company.com' />
        </div>
        <div>
            <label htmlFor="username" className='text-sm font-medium block mb-2 text-gray-300'>
                Username
            </label>
            <input onChange={handleChangeInput} type="text" name='username' id='username' className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder="harshvse" />
        </div>
        <div>
            <label htmlFor="password" className='text-sm font-medium block mb-2 text-gray-300'>
                Password
            </label>
            <input onChange={handleChangeInput} type="password" name='password' id='password' className='
        border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        bg-gray-600 border-gray-500 placeholder-gray-400 text-white' placeholder='********' />
        </div>
        <button type='submit' className='w-full text-white focus:ring-blue-300 font-medium rounded-lg 
    text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'>
            {loading ? "Registering..." : "Register"}
        </button>

        <div className='text-sm font-medium text-gray-500'>
            Already have an account?{" "}
            <a href="#" className='text-blue-700 hover:underline' onClick={() => handleClick("login")}>
                Login
            </a>
        </div>
    </form>)
}
export default Signup;