import Image from 'next/image';
import { ReactNode } from 'react';
import Banner from '@/assets/images/banner-auth.gif';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux';
import { useRouter } from 'next/router';

function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  console.log(
    '🚀 ~ file: AuthLayout.tsx:10 ~ AuthLayout ~ router:',
    router.pathname
  );
  const isLogin = useSelector((state: AppState) => state.user.isLogin);

  if (isLogin && router.pathname !== '/change-password') {
    router.replace('/');
    return null;
  }

  return (
    <div className="grid grid-cols-2 h-screen overflow-hidden">
      <div className="flex items-center justify-center overflow-y-auto px-4">
        {children}
      </div>
      <div className="h-screen overflow-hidden">
        <Image
          className="h-full w-full object-cover object-center"
          src={Banner}
          alt="banner"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
