import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-[#212529]">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between py-10 gap-4">
          <h1 className="text-[#f8f9fa] text-lg font-bold leading-6">
            SPOSTLESS
          </h1>
          <div className="flex items-center gap-x-6 text-[#F8F9FA80]/50 text-xs font-medium leading-6">
            <Link href={''}>
              <span>About Us</span>
            </Link>
            <Link href={''}>
              <span>Archive</span>
            </Link>
            <Link href={''}>
              <span>Contact</span>
            </Link>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#F8F9FA80]/50"></div>
        <div className="flex flex-col sm:flex-row text-center sm:text-left items-center justify-between py-10 text-[#F8F9FA80]/50 text-xs font-medium leading-6">
          <p>222 Hoang Dieu 2, Thu Duc District, Ho Chi Minh City</p>
          <p>© 2023, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
