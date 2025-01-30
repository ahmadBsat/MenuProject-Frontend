import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import BannerTable from "@/lib/components/Pages/Store/Banners/BannerTable";
import { URLs } from "@/lib/constants/urls";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <HeaderContainer
        title="Store Banners"
        description="Manage your banners from here"
      >
        <Button as={Link} href={URLs.store.banners.create} color="primary">
          Add
        </Button>
      </HeaderContainer>

      <BannerTable />
    </>
  );
};

export default Page;
