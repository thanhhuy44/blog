import MainLayout from '@/layouts/MainLayout';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import UploadApi from '@/api/upload';
import 'react-quill/dist/quill.snow.css';
import { Controller, useForm } from 'react-hook-form';
import { CircleNotch } from '@phosphor-icons/react';
import BlogApi from '@/api/blog';
import { Blog } from '@/interface';
import { useSelector } from 'react-redux';
import { AppState } from '@/redux';
import { useRouter } from 'next/router';

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'imageBlot',
];

interface FormInputs {
  title: string;
  banner: FileList;
  description: string;
  content: string;
}

function Upload() {
  const router = useRouter();
  const isLogin = useSelector((state: AppState) => state.user.isLogin);
  const user = useSelector((state: AppState) => state.user.user);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
    getValues,
  } = useForm<FormInputs>({
    defaultValues: {
      content: '',
    },
  });

  const ReactQuill = dynamic(
    async () => {
      const { default: RQ } = await import('react-quill');
      const { default: ImageUploader } = await import('quill-image-uploader');
      const { default: ImageResize } = await import('quill-image-resize');
      RQ.Quill.register('modules/imageUploader', ImageUploader);
      RQ.Quill.register('modules/imageResize', ImageResize);
      return RQ;
    },
    {
      ssr: false,
      loading: () => (
        <div className="flex items-center justify-center">
          <CircleNotch className="animate-spin" size={24} />
        </div>
      ),
    }
  );

  const onEditorChange = (value: string) => {
    setValue('content', value);
  };

  const handleUpdload = async (data: FormInputs) => {
    if (!isSubmit) {
      setIsSubmit(true);
      const bannerURL = await UploadApi.upload({ file: data.banner[0] });
      if (bannerURL) {
        const response = await BlogApi.upload({
          ...data,
          banner: bannerURL,
          author: user?._id as string,
        });
        if (response) {
          const blog = response as Blog;
          setTimeout(() => {
            router.push({
              pathname: `/blogs/${blog.slug}`,
              query: {
                id: blog._id,
              },
            });
            setIsSubmit(false);
          }, 1500);
        } else {
          setTimeout(() => {
            setIsSubmit(false);
          }, 1500);
        }
      } else {
        setTimeout(() => {
          setIsSubmit(false);
        }, 1500);
      }
    }
  };

  useEffect(() => {
    if (!isLogin && router.isReady) {
      router.replace('/login');
    }
  }, [isLogin, router.isReady]);

  useEffect(() => {
    register('content', {
      required: {
        value: true,
        message: 'This field is required!',
      },
    });
  }, [register]);

  // if (!isLogin) {
  //   router.replace('/login');

  //   return null;
  // }

  return (
    <div className="container max-w-5xl mx-auto my-28 flex flex-col gap-y-4">
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <div className="mt-1 py-3 px-4 flex items-center gap-x-3 border border-[#ccc] focus-within:border-[#333] duration-300">
          <input
            className="bg-transparent flex-1 outline-none text-xl font-semibold"
            type="text"
            id="title"
            size={1}
            placeholder=""
            {...register('title', {
              required: {
                value: true,
                message: 'This field is required.',
              },
            })}
          />
        </div>
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.title ? errors.title.message : ''}
        </p>
      </div>

      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <div className="mt-1 py-3 px-4 flex items-center gap-x-3 border border-[#ccc] focus-within:border-[#333] duration-300">
          <textarea
            className="bg-transparent flex-1 outline-none"
            id="description"
            placeholder=""
            rows={4}
            {...register('description', {
              required: {
                value: true,
                message: 'This field is required.',
              },
            })}
          />
        </div>
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.description ? errors.description.message : ''}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="banner">Banner</label>
        <div className="mt-1 py-3 px-4 flex items-center gap-x-3 border border-[#ccc] focus-within:border-[#333] duration-300">
          <input
            className="bg-transparent flex-1 outline-none"
            type="file"
            id="banner"
            size={1}
            placeholder=""
            {...register('banner', {
              required: {
                value: true,
                message: 'This field is required.',
              },
            })}
          />
        </div>
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.banner ? errors.banner.message : ''}
        </p>
      </div>

      <div className="flex flex-col gap-y-1">
        <label htmlFor="content">Content</label>
        <ReactQuill
          defaultValue={getValues('content')}
          onChange={(value) => {
            onEditorChange(value);
          }}
          modules={{
            toolbar: [
              [{ header: '1' }, { header: '2' }],
              [{ size: [] }],
              [
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'code-block',
              ],
              [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
              ],
              ['link', 'image', 'video'],
            ],
            clipboard: {
              matchVisual: false,
            },
            imageUploader: {
              upload: async (file: File) => {
                return new Promise<string>(async (resolve, reject) => {
                  try {
                    const url = await UploadApi.upload({ file });
                    if (url) {
                      resolve(url);
                    } else {
                      alert('Upload failed!');
                    }
                  } catch (error) {
                    alert('Upload failed!');
                  }
                });
                // return new Promise((resolve, reject) => {
                //   setTimeout(() => {
                //     resolve(
                //       "https://my-blog-assets.s3.us-east-005.backblazeb2.com/image_2023-11-01_09-37-41.png"
                //     );
                //   }, 10000);
                // });
              },
            },
            imageResize: {
              modules: ['Resize', 'DisplaySize', 'Toolbar'],
            },
          }}
          formats={formats}
          theme="snow"
        />
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.content ? errors.content.message : ''}
        </p>
      </div>

      <div
        onClick={handleSubmit(handleUpdload, (data) => {
          console.log(data);

          console.log(errors);
        })}
        className={`flex items-center justify-center w-full py-3 px-4 bg-[#212529] text-white select-none hover:opacity-80 duration-300 ${
          isSubmit ? 'cursor-text opacity-80' : 'cursor-pointer '
        }`}>
        {isSubmit ? (
          <CircleNotch className="animate-spin" size={24} />
        ) : (
          'Upload'
        )}
      </div>
    </div>
  );
}

Upload.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Upload;
