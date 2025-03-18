'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTags } from '@/app/store/layoutSlice';
import { RootState } from '@/app/store/index';

const fetchTags = async (): Promise<string[]> => {
  const response = await fetch('/api/notion/fetchTags', { method: 'POST' });
  return response.ok ? await response.json() : [];
};

const ReduxInitializer = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.layout.tags);

  useEffect(() => {
    if (tags.length > 0) return; //Redux에 태그가 있으면 요청 안함

    fetchTags().then((fetchedTags) => {
      if (fetchedTags.length > 0) {
        dispatch(setTags(fetchedTags));
      }
    });
  }, [dispatch, tags]);

  return null;
};

export default ReduxInitializer;
