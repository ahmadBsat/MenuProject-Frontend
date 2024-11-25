import React from "react";

const ComingSoon = ({ construction }: { construction: boolean }) => {
  return (
    <div className="w-full max-h-[calc(100vh-240px)] flex items-center justify-center">
      <div className="text-3xl lg:text-4xl capitalize">
        {construction ? "Under Maintenance" : "Coming Soon"}
      </div>
    </div>
  );
};

export default ComingSoon;
