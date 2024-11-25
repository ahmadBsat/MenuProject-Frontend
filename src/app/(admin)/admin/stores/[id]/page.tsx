import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import StoresTable from "@/lib/components/Pages/Store/StoreTable";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <HeaderContainer
        title="Stores"
        description="Manage platform stores from here"
      />

      <StoresTable />
    </div>
  );
};

export default Page;
