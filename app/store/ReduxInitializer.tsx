'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTags } from '@/app/store/layoutSlice';

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

  useEffect(() => {
    const initializeTags = async () => {
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
  }, [dispatch]);

  return null;
};

export default ReduxInitializer;
