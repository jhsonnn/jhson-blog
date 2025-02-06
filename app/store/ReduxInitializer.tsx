// 'use client';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setTags } from '@/app/store/layoutSlice';
// import { fetchTags } from '@/lib/notion/api/fetchTags';

// type ReduxInitializerProps = {
//   currentSlug?: string;
// };

// const ReduxInitializer = ({ currentSlug }: ReduxInitializerProps) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const initializeTags = async () => {
//       try {
//         const fetchedTags = await fetchTags();

//         if (fetchedTags && fetchedTags.length > 0) {
//           dispatch(setTags(fetchedTags)); //Redux에 태그 저장
//         } else {
//           console.warn('No tags fetched from Notion API.');
//         }
//       } catch (error) {
//         console.error('Error fetching tags:', error);
//       }
//     };

//     initializeTags();
//   }, [dispatch, currentSlug]);

//   return null;
// };

// export default ReduxInitializer;

// //ISR 테스트
// import fetchTags from '@/lib/notion/api/fetchTags'; // ✅ `fetchTags` 가져오기 수정

// const initializeTags = async () => {
//   try {
//     const tags = await fetchTags();
//     console.log('Fetched tags:', tags);
//   } catch (error) {
//     console.error('Error fetching tags:', error);
//   }
// };

//ISR 테스트
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
        console.log('Fetching tags...');
        const fetchedTags = await fetchTags();
        console.log('Fetched tags:', fetchedTags);

        if (fetchedTags.length > 0) {
          dispatch(setTags(fetchedTags));
        } else {
          console.warn('No tags fetched from Notion API.');
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
