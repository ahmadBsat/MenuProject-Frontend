import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import BranchesTable from "@/lib/components/Pages/Store/Branch/BranchTable";
import { URLs } from "@/lib/constants/urls";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <HeaderContainer
        title="Store Branches"
        description="Manage your branches from here"
      >
        <Button as={Link} href={URLs.store.branch.create} color="primary">
          Add
        </Button>
      </HeaderContainer>

      <BranchesTable />
    </>
  );
};

export default Page;
