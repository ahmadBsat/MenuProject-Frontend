import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import StoresTable from "@/lib/components/Pages/Store/StoreTable";
import { URLs, getUrl } from "@/lib/constants/urls";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <HeaderContainer
        title="Stores"
        description="Manage platform stores from here"
      >
        <div className="flex items-center gap-2">
          <Button
            as={Link}
            variant="flat"
            color="primary"
            href={getUrl(URLs.admin.stores.create)}
          >
            Add
          </Button>
        </div>
      </HeaderContainer>

      <StoresTable />
    </div>
  );
};

export default Page;
