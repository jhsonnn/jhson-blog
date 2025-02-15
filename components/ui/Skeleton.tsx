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
      className={`relative overflow-hidden bg-neutral-200 dark:bg-neutral-700 ${
        slowShimmer ? 'animate-shimmer-slow' : 'animate-shimmer'
      } ${className}`}
      style={{
        borderRadius: borderRadius || undefined,
        backgroundImage:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.2) 75%)',
        backgroundSize: '200% 100%',
      }}
    />
  );
};

export default Skeleton;
