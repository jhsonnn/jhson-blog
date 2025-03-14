'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTags } from '@/app/store/layoutSlice';
import { RootState } from '@/app/store/index';

const fetchTags = async (): Promise<string[]> => {
  try {
    const response = await fetch('/api/notion/fetchTags', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tags: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};

const ReduxInitializer = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.layout.tags); // 기존 태그 상태 확인

  useEffect(() => {
    const initializeTags = async () => {
      if (tags.length > 0) return; //기존 태그가 있으면 API 호출 생략함

      try {
        const fetchedTags = await fetchTags();
        if (fetchedTags.length > 0) {
          dispatch(setTags(fetchedTags));
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    initializeTags();
  }, [dispatch, tags]);

  return null;
};

export default ReduxInitializer;
