'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTags } from '@/app/store/layoutSlice';
import { fetchTags } from '@/lib/notion/api/fetchTags';

type ReduxInitializerProps = {
  currentSlug?: string;
};

const ReduxInitializer = ({ currentSlug }: ReduxInitializerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeTags = async () => {
      try {
        const fetchedTags = await fetchTags();

        if (fetchedTags && fetchedTags.length > 0) {
          dispatch(setTags(fetchedTags)); //Redux에 태그 저장
        } else {
          console.warn('No tags fetched from Notion API.');
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    initializeTags();
  }, [dispatch, currentSlug]);

  return null;
};

export default ReduxInitializer;
