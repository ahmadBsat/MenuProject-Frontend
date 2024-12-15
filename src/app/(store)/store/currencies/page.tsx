import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import CurrenciesTable from "@/lib/components/Pages/Store/Currency/CurrencyTable";
import { URLs } from "@/lib/constants/urls";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <HeaderContainer
        title="Store Currencies"
        description="Manage your accepted currencies and rates from here"
      >
        <Button as={Link} href={URLs.store.currencies.create} color="primary">
          Add
        </Button>
      </HeaderContainer>

      <CurrenciesTable />
    </>
  );
};

export default Page;
