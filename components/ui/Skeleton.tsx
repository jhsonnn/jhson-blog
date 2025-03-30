interface SkeletonProps {
  borderRadius?: string;
  className?: string;
  slowShimmer?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  borderRadius,
  className = '',
  slowShimmer = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-neutral-400 dark:bg-neutral-700
        ${slowShimmer ? 'animate-shimmer-slow' : 'animate-shimmer'}
        ${className}`}
      style={{
        borderRadius: borderRadius || undefined,
        backgroundImage:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.5) 100%)',
        backgroundSize: '200% 100%',
        animationDuration: slowShimmer ? '3.5s' : '3s',
      }}
    />
  );
};

export default Skeleton;
