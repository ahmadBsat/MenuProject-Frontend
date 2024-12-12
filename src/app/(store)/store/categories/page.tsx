import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import CategoriesTable from "@/lib/components/Pages/Store/Category/CategoryTable";
import { URLs } from "@/lib/constants/urls";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <HeaderContainer
        title="Store Categories"
        description="Manage your menu categories from here"
      >
        <Button as={Link} href={URLs.store.category.create} color="primary">
          Add
        </Button>
      </HeaderContainer>

      <CategoriesTable />
    </>
  );
};

export default Page;
