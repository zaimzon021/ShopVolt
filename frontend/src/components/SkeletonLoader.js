export const SkeletonLoader = ({ type = "product-card" }) => {
  if (type === "product-card") {
    return (
      <div className="bg-card rounded-lg overflow-hidden animate-pulse">
        <div className="aspect-square bg-muted"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
          <div className="h-6 bg-muted rounded w-1/3"></div>
        </div>
      </div>
    );
  }
  return null;
};
