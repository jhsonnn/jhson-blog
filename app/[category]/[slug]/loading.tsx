import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="post-content-layout">
      <div className="mb-10">
        <Skeleton height="2rem" width="60%" className="rounded-xl mb-6" />
        <Skeleton height="1.5rem" width="80%" className="rounded-xl mb-4" />
        <Skeleton height="1.5rem" width="100%" className="rounded-xl mb-4" />
        <Skeleton height="1.5rem" width="40%" className="rounded-xl mb-4" />
        <Skeleton height="1.5rem" width="70%" className="rounded-xl mb-4" />
      </div>
      <div className="mb-10">
        <Skeleton height="2rem" width="50%" className="rounded-xl mb-6" />
        <Skeleton height="20rem" width="40%" className="rounded-xl mb-4" />
      </div>
      <div className="mb-10">
        <Skeleton height="2rem" width="60%" className="rounded-xl mb-6" />
        <Skeleton height="1.5rem" width="30%" className="rounded-xl mb-4" />
        <Skeleton height="1.5rem" width="70%" className="rounded-xl mb-4" />
        <Skeleton height="1.5rem" width="90%" className="rounded-xl mb-4" />
        <Skeleton height="1.5rem" width="70%" className="rounded-xl mb-4" />
      </div>
    </div>
  );
}
