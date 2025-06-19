"use Client";

const Skeleton = () => {
  const skeletonCard = Array.from({ length: 8 });
  return (
    <div className=" min-h-screen p-8 gap-10">
      <div className="space-y-8">
        <div className="flex gap-1">
          <div className="w-full h-12 bg-gray-300 rounded-md animate-pulse" />
          <div className=" m-3 p-4 flex flex-wrap gap-3 w-24 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-4 gap-6  space-y-8 place-items-center">
          {skeletonCard.map((_, index) => (
            <div
              className="bg-gray-400 rounded-xl p-4 shadow-lg space-y-8 h-[450px] w-[300px]"
              key={index}
            >
              <div className="w-full h-48 rounded animate-shimmer"></div>
              <div className="h-4 w-3/4 animate-shimmer rounded"></div>
              <div className="h-3 w-1/2 animate-shimmer rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
