import React from 'react';
import Link from 'next/link';
import { useSetRecoilState } from "recoil";
import { authModalStateAtom } from '@/atoms/authModalAtom';
type NavbarProps = {

};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalStateAtom);
  const handleClick = () => {
    setAuthModalState((prev) => ({ type: "login", isOpen: true }));
  }
  return (
    <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
      <Link href={"/"} className='flex items-center justify-center h-20'>
        <img src='/logo.png' alt="CodeMania Logo" className='h-full'></img>
      </Link>
      <div className='flex items-center'>
        <button className='bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium  
        hover:text-brand-orange hover:bg-white broder-2 border-transparent hover:border-brand-orange
        transition duration-300 ease-in-out' onClick={handleClick}>
          Sign In
        </button>
      </div>
    </div >)
}
export default Navbar; 