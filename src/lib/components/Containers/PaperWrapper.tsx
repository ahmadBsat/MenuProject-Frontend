import React from "react";

type WrapperProps = {
  title: string;
  description?: string;
  children: React.ReactNode | React.ReactNode[];
};

const PaperWrapper = ({ title, description, children }: WrapperProps) => {
  return (
    <section className="w-full h-full">
      <div className="flex flex-col w-full h-full items-center justify-center relative">
        <div className="w-full flex gap items-center justify-center lg:pt-44 pt-16 pb-60 terms-section">
          <div className="flex flex-col gap-6 items-center justify-center w-[770px] px-6 text-center">
            <h1 className="lg:text-5xl text-3xl font-bold leading-9 text-zinc-800">
              {title}
            </h1>

            <p className="text-gray-600">{description}</p>
          </div>
        </div>

        <div className="terms-paragraph flex flex-col gap-9 bg-white lg:w-[55%] w-full -mt-44 mb-20">
          {children}
        </div>
      </div>
    </section>
  );
};

export default PaperWrapper;
