'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Profile = () => {
  const textLines = [
    `안녕하세요!`,
    `게임회사 주니어 개발PM에서`,
    `웹 프론트엔드 개발자로 전향을 준비하고 있는`,
    `'손지형'입니다.`,
  ];

  const [displayText, setDisplayText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === textLines[lineIndex].length) {
      typingSpeed = 1000; //한 줄 다 입력되면 잠시 대기
      setTimeout(() => setIsDeleting(true), typingSpeed);
    }

    if (isDeleting && charIndex === 0) {
      typingSpeed = 500; //한 줄을 다 지웠을 때 잠시 대기
      setTimeout(() => {
        setIsDeleting(false);
        setLineIndex((prevIndex) => (prevIndex + 1) % textLines.length);
      }, typingSpeed);
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        (prev) =>
          isDeleting
            ? prev.slice(0, -1) //글자 하나씩 삭제
            : textLines[lineIndex].slice(0, charIndex + 1) //글자 하나씩 추가
      );
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="mb-6">
      <div className="font-bold text-base mb-3">Profile</div>
      <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-2xl shadow-md">
        <div className="text-sm mb-8">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayText}
          </motion.span>
          <motion.span
            animate={{ opacity: cursorVisible ? 1 : 0 }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="ml-1"
          >
            |
          </motion.span>
        </div>
        <div className="flex justify-center">
          <div className="relative w-40 h-40 overflow-hidden rounded-full mb-3">
            <Image
              src={'/images/profile/profile_image.jpg'}
              layout="fill"
              objectFit="cover"
              alt="profile image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
