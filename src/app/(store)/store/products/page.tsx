import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import ProductsTable from "@/lib/components/Pages/Store/Products/ProductsTable";
import { URLs } from "@/lib/constants/urls";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <HeaderContainer
        title="Products"
        description="Manage your products from here"
      >
        <Button as={Link} href={URLs.store.products.create} color="primary">
          Add
        </Button>
      </HeaderContainer>

      <ProductsTable />
    </>
  );
};

export default Page;
