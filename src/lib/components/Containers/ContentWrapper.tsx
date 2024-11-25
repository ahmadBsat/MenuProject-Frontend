import React from "react";

const ContentWrapper = ({ children }) => {
  return (
    <div className="w-full md:px-8 sm:px-6 px-4 py-3 sm:py-8 bg-secondary/20">
      {children}
    </div>
  );
};

export default ContentWrapper;
