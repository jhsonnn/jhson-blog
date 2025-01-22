// // 'use client';

// // import React, { useState } from 'react';

// // const SearchBar = () => {
// //   const [keyword, setKeyword] = useState('');

// //   return (
// //     <div className="w-full pb-4">
// //       <input
// //         type="text"
// //         value={keyword}
// //         onChange={(e) => setKeyword(e.target.value)}
// //         placeholder="🔎 검색어를 입력하세요"
// //         className="w-full px-4 py-2 text-sm dark:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-700 rounded-xl"
// //       />
// //     </div>
// //   );
// // };

// // export default SearchBar;

// //검색 test
// 'use client';

// import React, { useState } from 'react';

// interface SearchBarProps {
//   onSearch: (keyword: string) => void;
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
//   const [keyword, setKeyword] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setKeyword(value);
//     onSearch(value); // 상위 컴포넌트로 검색어 전달
//   };

//   return (
//     <div className="w-full pb-4">
//       <input
//         type="text"
//         value={keyword}
//         onChange={handleInputChange}
//         placeholder="🔎 검색어를 입력하세요"
//         className="w-full px-4 py-2 text-sm dark:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-700 rounded-xl"
//       />
//     </div>
//   );
// };

// export default SearchBar;

// 'use client';

// import React, { useState } from 'react';

// interface SearchBarProps {
//   onSearch: (keyword: string) => void; // onSearch를 필수 prop으로 정의
// }

// const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
//   const [keyword, setKeyword] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setKeyword(value);
//     onSearch(value); // 입력 변경 시 onSearch 콜백 호출
//   };

//   return (
//     <div className="w-full pb-4">
//       <input
//         type="text"
//         value={keyword}
//         onChange={handleChange}
//         placeholder="🔎 검색어를 입력하세요"
//         className="w-full px-4 py-2 text-sm dark:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-700 rounded-xl"
//       />
//     </div>
//   );
// };

// export default SearchBar;

// components/SearchBar.tsx

'use client';

import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword } from '@/app/store/searchSlice';
import { RootState } from '@/app/store';

const SearchBar = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.search.keyword);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  return (
    <input
      type="text"
      value={keyword}
      onChange={handleSearch}
      placeholder="🔎 검색어를 입력하세요"
      className="w-full px-4 py-2 text-sm border rounded"
    />
  );
};

export default SearchBar;
