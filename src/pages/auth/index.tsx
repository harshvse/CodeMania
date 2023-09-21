import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import AuthModal from '@/components/Modals/AuthModal';
import { authModalStateAtom } from '@/atoms/authModalAtom';
import { useRecoilValue } from "recoil";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
type AuthPageProps = {

};

const AuthPage: React.FC<AuthPageProps> = () => {
    const authModal = useRecoilValue(authModalStateAtom);
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(true);
    useEffect(() => {
        if (user) router.push('/');
        if (!loading && !user) setPageLoading(false);
        console.log(pageLoading);
    }, [user, router, loading])
    return <div className='bg-gradient-to-b from-gray-600 to-gray-800 h-screen relative'>
        {!pageLoading && (
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                    <img src="/hero.png" alt="hero image" />
                </div>
                {authModal.isOpen && <AuthModal />}
            </div>)}
    </div>
}
export default AuthPage;