import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import ProductItemsTable from "@/lib/components/Pages/Store/Items/ItemTable";
import { URLs } from "@/lib/constants/urls";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <HeaderContainer
        title="Store Additional Items"
        description="Manage your products additions from here"
      >
        <Button
          as={Link}
          href={URLs.store.product_items.create}
          color="primary"
        >
          Add
        </Button>
      </HeaderContainer>

      <ProductItemsTable />
    </>
  );
};

export default Page;
