import Link from 'next/link';

interface Props {
  data?: any;
  direction?: 'col' | 'row';
}

function Card({ direction }: Props) {
  return (
    <div
      className={`w-full flex gap-8 ${
        direction === 'row' ? 'flex-row' : 'flex-col'
      }`}>
      <div
        className={`relative ${
          direction === 'row' ? 'aspect-square w-4/12' : 'aspect-video w-full'
        }`}>
        <img
          src="https://bigwalldecor.com/wp-content/uploads/2023/04/Lionel-Messi-Illustration-Wall-Art.jpg"
          alt="thumbnail"
          className={`rounded object-center ${
            direction === 'row' ? 'aspect-square' : 'w-full aspect-video'
          }`}
        />
        <div className="absolute top-8 right-8 px-4 bg-[#2125294D]/30 text-[#f8f9fa] text-center text-[8px] font-bold leading-5">
          Sport
        </div>
      </div>
      <div className={`flex-1 w-full flex flex-col gap-y-4`}>
        <p className="text-[#495057] text-xs font-light leading-5">
          28/06/2001
        </p>
        <Link
          href={'#'}
          className="text-[#212529] text-2xl font-bold leading-10">
          The 20 best creative & strong handmade of 2022
        </Link>
        <p className="text-[#495057] text-xs font-light leading-5">
          Many years ago, I worked for my parents who own a video production
          company.
        </p>
        <span className="w-full h-[1px] bg-[#e5e5e5]"></span>
        <p className="text-[#495057] text-xs font-light leading-5">
          By: Peter Rowardson
        </p>
      </div>
    </div>
  );
}

export default Card;
