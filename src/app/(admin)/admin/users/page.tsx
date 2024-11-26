import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import UsersTable from "@/lib/components/Pages/User/UserTable";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <HeaderContainer
        title="Users"
        description="Manage platform users from here"
      />

      <UsersTable />
    </div>
  );
};

export default Page;
