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
    <div className="lg:mb-5">
      <input
        type="text"
        value={keyword}
        onChange={handleSearch}
        placeholder="🔎 검색어를 입력하세요"
        className="w-full px-4 py-2 text-sm dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-700 rounded-xl"
      />
    </div>
  );
};

export default SearchBar;
