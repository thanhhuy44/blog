import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#212529]">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-10">
          <h1 className="text-[#f8f9fa] text-lg font-bold leading-6">VENCE</h1>
          <div className="flex items-center gap-x-6 text-[#F8F9FA80]/50 text-xs font-medium leading-6">
            <Link href={"/about-us"}>About Us</Link>
            <Link href={"/Archive"}>Archive</Link>
            <Link href={"/contact"}>Contact</Link>
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#F8F9FA80]/50"></div>
        <div className="flex items-center justify-between py-10 text-[#F8F9FA80]/50 text-xs font-medium leading-6">
          <p>1088, North Street, Alexandria, AU</p>
          <p>© 2022, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
