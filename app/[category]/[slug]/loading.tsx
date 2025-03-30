//content page 스켈레톤
import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="post-content-layout">
      <div className="mb-4 md:mb-6">
        <Skeleton className="w-1/12 h-6 rounded-xl mb-3" />
      </div>
      <div>
        <Skeleton className="w-2/3 h-10 rounded-xl mb-4 md:mb-5 lg:mb-6" />
        <Skeleton className="w-1/4 h-4 rounded-xl mb-2 md:mb-3 lg:mb-4" />
        <Skeleton className="w-1/12 h-5 rounded-xl mb-2 md:mb-3 lg:mb-4" />
        <Skeleton className="w-4/6 h-80 rounded-xl mb-10" />
      </div>

      <div className="md:mb-8 lg:mb-10">
        <Skeleton className="w-3/5 h-8 rounded-xl mb-4 md:mb-5 lg:mb-6" />
        <Skeleton className="w-4/5 h-6 rounded-xl mb-2 md:mb-3 lg:mb-4" />
        <Skeleton className="w-full h-6 rounded-xl mb-2 md:mb-3 lg:mb-4" />
        <Skeleton className="w-2/5 h-6 rounded-xl mb-2 md:mb-3 lg:mb-4" />
        <Skeleton className="w-3/5 h-6 rounded-xl mb-2 md:mb-3 lg:mb-4" />
      </div>

      <div className="md:mb-8 lg:mb-10">
        <Skeleton className="w-1/2 h-8 rounded-xl mb-4 md:mb-5 lg:mb-6" />
        <Skeleton className="w-2/5 h-[13rem] md:h-[15rem] rounded-xl mb-3 md:mb-3 lg:mb-4" />
      </div>

      <div className="md:mb-8 lg:mb-10">
        <Skeleton className="w-3/5 h-8 rounded-xl mb-4 md:mb-5 lg:mb-6" />
        <Skeleton className="w-1/3 h-6 rounded-xl mb-2 md:mb-3 lg:mb-4" />
        <Skeleton className="w-3/4 h-6 rounded-xl mb-2 md:mb-3 lg:mb-4" />
        <Skeleton className="w-5/6 h-6 rounded-xl mb-2 md:mb-3 lg:mb-4" />
        <Skeleton className="w-3/5 h-6 rounded-xl mb-2 md:mb-3 lg:mb-4" />
      </div>
    </div>
  );
}
