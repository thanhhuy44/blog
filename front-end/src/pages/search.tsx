import MainLayout from '@/layouts/MainLayout';
import { ReactElement, useState } from 'react';

function Search() {
  const [tabActive, setTabActive] = useState<number>(1);

  return (
    <div className="container px-2 mx-auto">
      <div className="mt-12 mb-4 flex items-center border-b border-b-secondary w-fit">
        <div
          onClick={() => setTabActive(1)}
          className={`select-none px-8 py-2 border-b-2 ${
            tabActive === 1
              ? 'border-primary bg-gray-400'
              : 'border-transparent hover:bg-gray-300'
          } cursor-pointer duration-300`}>
          Blogs
        </div>
        <div
          onClick={() => setTabActive(2)}
          className={`select-none px-8 py-2 border-b-2 ${
            tabActive === 2
              ? 'border-primary bg-gray-400'
              : 'border-transparent hover:bg-gray-300'
          } cursor-pointer duration-300`}>
          Users
        </div>
      </div>
    </div>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Search;
