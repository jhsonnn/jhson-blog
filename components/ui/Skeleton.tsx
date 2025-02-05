interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  slowShimmer?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
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
        width,
        height,
        borderRadius: borderRadius || undefined,
        backgroundImage:
          'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.2) 75%)',
        backgroundSize: '200% 100%',
      }}
    />
  );
};

export default Skeleton;
