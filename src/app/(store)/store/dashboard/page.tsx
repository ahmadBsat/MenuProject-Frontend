import HeaderContainer from "@/lib/components/Containers/HeaderContainer";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <HeaderContainer
        title="Dashboard"
        description="Get an overview about the latest changes"
      />
    </div>
  );
};

export default Page;
