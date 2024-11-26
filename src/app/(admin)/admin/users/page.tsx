import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import UsersTable from "@/lib/components/Pages/User/UserTable";
import { URLs, getUrl } from "@/lib/constants/urls";
import { Button, Link } from "@nextui-org/react";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <HeaderContainer
        title="Users"
        description="Manage platform users from here"
      >
        <Button
          as={Link}
          href={getUrl(URLs.admin.users.create)}
          color="primary"
          variant="flat"
        >
          Add
        </Button>
      </HeaderContainer>

      <UsersTable />
    </div>
  );
};

export default Page;
