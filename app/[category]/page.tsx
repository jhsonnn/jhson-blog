// import { fetchNotionDatabase } from "@/utils/fetchNotionDatabase";
// import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
// import { isTitleProperty, isFilesProperty } from "@/types/notionDataType";
// import Link from "next/link";
// import Post from "@/components/ui/Post";

// const CategoryPage = async ({ params }: { params: { category: string } }) => {
//   const category = params.category;

//   try {
//     // console.log(`Fetching items for category: ${category}`);

//     const items = await fetchNotionDatabase(category);

//     // console.log("Fetched items:", items);

//     if (!items || items.length === 0) {
//       console.warn(`No items found for category: ${category}`);
//       return <div>No items found for this category</div>;
//     }

//     return (
//       <div>
//         <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Items</h1>
//         <ul>
//           {items.map(({ slug, post }) => {
//             if (!post.properties) {
//               console.warn("No properties found for item", post);
//               return null;
//             }

//             //title
//             const titleProperty = post.properties.title;

//             let title = "No Title";
//             if (titleProperty && isTitleProperty(titleProperty)) {
//               title = titleProperty.title?.[0]?.plain_text || "No Title";
//             } else {
//               console.warn(
//                 "Title property not found or invalid for item",
//                 post
//               );
//             }

//             const date = post.created_time;

//             //thumbnailUrl
//             let thumbnailUrl = "/default-thumbnail.jpg";
//             const thumbnailProperty = post?.properties?.["\bthumbnailUrl"];
//             // console.log("thumbnailProperty ???: ", thumbnailProperty);

//             // thumbnailUrl 속성이 files 타입인 경우에만 접근
//             if (
//               thumbnailProperty &&
//               isFilesProperty(thumbnailProperty) &&
//               thumbnailProperty.files.length > 0
//             ) {
//               const file = thumbnailProperty.files[0];
//               if (file.type === "file") {
//                 thumbnailUrl = file.file.url;
//               }
//             }

//             // console.log("thumbnailUrl ???: ", thumbnailUrl);

//             return (
//               <li key={post.id}>
//                 <Link href={slug}>
//                   <Post
//                     title={title}
//                     slug={slug}
//                     date={date}
//                     thumbnailUrl={thumbnailUrl}
//                   />
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   } catch (error: any) {
//     console.error(
//       "Error fetching Notion database:",
//       error.message,
//       error.stack
//     );
//     return <div>Error loading items: {error.message}</div>;
//   }
// };

// // 동적 경로 생성을 위한 generateStaticParams
// export const generateStaticParams = async () => {
//   const categories = ["projects", "resume"];
//   const paths = categories.map((category) => ({
//     category,
//   }));

//   //   console.log("Generated paths:", paths);

//   return paths;
// };

// export default CategoryPage;

import { fetchNotionDatabase } from "@/utils/fetchNotionDatabase";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isTitleProperty, isFilesProperty } from "@/types/notionDataType";
import Link from "next/link";
import Post from "@/components/ui/Post";

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const category = params.category;

  try {
    console.log(`Fetching items for category: ${category}`);

    const items = await fetchNotionDatabase(category);
    // console.log("Fetched items:", items);

    if (!items || items.length === 0) {
      console.warn(`No items found for category: ${category}`);
      return <div>No items found for this category</div>;
    }

    return (
      <div>
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Items</h1>
        <ul>
          {items.map(({ slug, post }) => {
            if (!post.properties) {
              console.warn("No properties found for item", post);
              return null;
            }

            const titleProperty = post.properties.title;
            let title = "No Title";
            if (titleProperty && isTitleProperty(titleProperty)) {
              title = titleProperty.title?.[0]?.plain_text || "No Title";
            }

            const date = post.created_time;

            let thumbnailUrl = "/default-thumbnail.jpg";
            const thumbnailProperty = post?.properties?.["\bthumbnailUrl"];
            if (
              thumbnailProperty &&
              isFilesProperty(thumbnailProperty) &&
              thumbnailProperty.files.length > 0
            ) {
              const file = thumbnailProperty.files[0];
              if (file.type === "file") {
                thumbnailUrl = file.file.url;
              }
            }

            return (
              <li key={post.id}>
                <Link href={`/${category}/${slug}`}>
                  <Post
                    title={title}
                    slug={slug}
                    date={date}
                    thumbnailUrl={thumbnailUrl}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } catch (error: any) {
    console.error(
      "Error fetching Notion database:",
      error.message,
      error.stack
    );
    return <div>Error loading items: {error.message}</div>;
  }
};

// 동적 경로 생성을 위한 generateStaticParams
export const generateStaticParams = async () => {
  const categories = ["projects", "resume"];
  const paths = categories.map((category) => ({
    category,
  }));

  console.log("Generated paths:", paths);

  return paths;
};

export default CategoryPage;
