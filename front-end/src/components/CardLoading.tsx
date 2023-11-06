import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardLoading() {
  return (
    <SkeletonTheme>
      <div className="flex flex-col gap-y-3">
        <Skeleton className="aspect-video" />
        <Skeleton className="h-8" />
        <Skeleton className="h-3" count={2} />
      </div>
    </SkeletonTheme>
  );
}

export default CardLoading;
