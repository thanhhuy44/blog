import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import { ReactElement } from "react";
import Banner from "@/assets/images/banner.png";

function BlogDetail() {
  return (
    <div className="my-32 container max-w-6xl mx-auto">
      <div className=" flex flex-col gap-y-4">
        <p className="text-[#495057] text-xs font-light leading-5">
          29.Jun.2021
        </p>
        <h1 className="text-[#212529] text-2xl font-bold leading-10">
          Aron Klein’s captivating images of the UDEA’s culture.
        </h1>
        <p className="text-[#495057] text-xs font-light leading-5">
          Many years ago, I worked for my parents who own a video production
          company.
        </p>
        <span className="w-full h-[1px] bg-[#E5E5E5]"></span>
        <p className="text-[#495057] text-xs font-light leading-5">Thanh Huy</p>

        <Image className="w-full my-16" src={Banner} alt="banner" />
      </div>
    </div>
  );
}

BlogDetail.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default BlogDetail;
