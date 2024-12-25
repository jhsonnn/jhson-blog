//good
// 'use client';

// import TagsMenu from '../menus/TagsMenu';
// import Profile from '../ui/profile';
// import CategoryMenu from '../menus/CategoryMenu';

// type ConditionalSidebarProps = {
//   section: 'tagsMenu' | 'menu' | 'profile';
//   categories?: string[]; // CategoryMenu에 전달할 데이터
//   tags?: string[]; // TagsMenu에 전달할 데이터
// };

// const ConditionalSidebar = ({
//   section,
//   categories = [],
//   tags = [],
// }: ConditionalSidebarProps) => {
//   if (section === 'tagsMenu') {
//     return <TagsMenu tags={tags} />;
//   }

//   if (section === 'menu') {
//     return <CategoryMenu categories={categories} />;
//   }

//   if (section === 'profile') {
//     return <Profile />;
//   }

//   return null;
// };

// export default ConditionalSidebar;
