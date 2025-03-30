//수동 revalidation
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await res.revalidate('/'); //전체 페이지 강제 갱신
//     return res.json({ revalidated: true });
//   } catch (err) {
//     return res.status(500).send('Error revalidating');
//   }
// }
