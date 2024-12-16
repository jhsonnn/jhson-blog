import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function PostContentLayout({ children }: LayoutProps) {
  return <div className="post-content-page">{children}</div>;
}
