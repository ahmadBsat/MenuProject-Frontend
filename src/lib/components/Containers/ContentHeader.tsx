import React from "react";

type Props = {
  title: string;
  description: string;
};

const ContentHeader = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col py-6 px-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm font-medium">{description}</p>
    </div>
  );
};

export default ContentHeader;
