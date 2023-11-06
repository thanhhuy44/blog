import CommentApi from '@/api/comment';
import { Comment, User } from '@/interface';
import { AppState } from '@/redux';
import { Heart, PaperPlaneRight } from '@phosphor-icons/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Comment({ comment }: { comment: Comment }) {
  const isLogin = useSelector((state: AppState) => state.user.isLogin);
  const user = useSelector((state: AppState) => state.user.user);
  const [mount, setMount] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const [data, setData] = useState<Comment>(comment);
  const [value, setValue] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const author = data.author as User;

  const handleReply = async () => {
    if (value.trim() === '') {
      return;
    }
    setIsSubmit(true);
    const comment = await CommentApi.create({
      author: user?._id as string,
      blog: data.blog as string,
      content: value,
      parent: data._id,
    });
    if (comment) {
      setTimeout(() => {
        setData({
          ...data,
          children: [comment, ...(data.children as Comment[])],
        });
        setReply(false);
        setValue('');
        setIsSubmit(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setIsSubmit(false);
      }, 1500);
    }
  };

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    mount && (
      <div className="flex items-start gap-x-4 w-full">
        <Image src={author.avatar} alt="avatar" fill className="!static !w-8" />
        <div className="flex-1 block overflow-hidden">
          <div className="flex-1 max-w-full flex flex-col gap-y-1">
            <p className="leading-8 font-semibold">{author.fullname}</p>
            <span className="font-normal text-[#333] break-words inline-block">
              {data.content}
            </span>
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                {data.like_count > 0 && <p>{data.like_count}</p>}
                <Heart
                  size={24}
                  className="cursor-pointer hover:text-red-400"
                />
              </div>
              <div
                onClick={() => {
                  setReply((prev) => !prev);
                }}
                className="hover:underline cursor-pointer select-none">
                <p>Reply</p>
              </div>
            </div>
            {reply ? (
              isSubmit ? (
                <p className="text-center">...is reply...</p>
              ) : (
                <div className="flex items-center gap-x-3 my-2">
                  <Image
                    fill
                    alt="avatar"
                    src={user?.avatar as string}
                    className="!static !w-8 aspect-square rounded-full"
                  />
                  <div className="flex-1 flex items-center py-1 px-2 border focus-within:outline-0 focus-within:border-[#333] duration-300">
                    <input
                      type="text"
                      placeholder="Reply comment..."
                      className="flex-1 focus:outline-0 bg-transparent"
                      value={value}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          handleReply();
                        }
                      }}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                    <PaperPlaneRight
                      onClick={handleReply}
                      size={20}
                      weight="fill"
                      className={`${
                        value.trim() !== '' ? 'cursor-pointer' : 'opacity-40'
                      } text-[#141416] `}
                    />
                  </div>
                </div>
              )
            ) : null}

            {data.children?.length ? (
              <div className="flex flex-col gap-y-2 mt-2">
                {data.children.map((child, index) => {
                  const childComment = child as Comment;
                  const childAuthor = childComment.author as User;
                  return (
                    <div
                      className="flex items-start gap-x-4 w-full"
                      key={index}>
                      <Image
                        src={childAuthor.avatar}
                        alt="avatar"
                        fill
                        className="!static !w-8"
                      />
                      <div className="flex-1 block overflow-hidden">
                        <p className="font-semibold">{childAuthor.fullname}</p>
                        <span className="font-normal text-[#333] break-words inline-block">
                          {childComment.content}
                        </span>
                        <div className="flex items-center gap-x-4">
                          <div className="flex items-center gap-x-2">
                            {data.like_count > 0 && <p>{data.like_count}</p>}
                            <Heart
                              size={24}
                              className="cursor-pointer hover:text-red-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  );
}

export default Comment;
