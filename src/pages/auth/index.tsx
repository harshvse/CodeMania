import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import AuthModal from '@/components/Modals/AuthModal';
import { authModalStateAtom } from '@/atoms/authModalAtom';
import { useRecoilValue } from "recoil";
type AuthPageProps = {

};

const AuthPage: React.FC<AuthPageProps> = () => {
    const authModal = useRecoilValue(authModalStateAtom);

    return <div className='bg-gradient-to-b from-gray-600 to-gray-800 h-screen relative'>
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                <img src="/hero.png" alt="hero image" />
            </div>
            {authModal.isOpen && <AuthModal />}
        </div>
    </div>
}
export default AuthPage;