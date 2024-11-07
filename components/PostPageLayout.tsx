import React from 'react';

interface PostPageLayoutProps {
  children: React.ReactNode;
}

const PostPageLayout: React.FC<PostPageLayoutProps> = ({ children }) => {
  return (
    <div className="w-full max-w-3xl bg-white mt-6 p-8 rounded-lg shadow-lg">
      {children}
    </div>
  );
};

export default PostPageLayout;
