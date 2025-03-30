import Link from 'next/link';
import React from 'react';

const Contact = () => {
  return (
    <div className="mb-3">
      <div className="font-bold text-base mb-3">Contact</div>

      <div className="bg-white dark:bg-neutral-700 p-3 rounded-2xl shadow-md">
        <ul>
          <li>
            <Link
              href="https://github.com/jhsonnn"
              target="_blank" //새 탭
              rel="noopenr noreferrer" //안전한 새 탭(보안강화)
              className="block text-sm text-neutral-700 dark:text-neutral-400 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-2xl"
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href="mailto:jihyeongson13@gmail.com"
              className="block text-sm text-neutral-700 dark:text-neutral-400 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-2xl"
            >
              E-mail
            </Link>
          </li>
          <li>
            <Link
              href="https://velog.io/@jhsonnn/posts"
              target="_blank"
              rel="noopenr noreferrer"
              className="block text-sm text-neutral-700 dark:text-neutral-400 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-2xl"
            >
              Velog
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
