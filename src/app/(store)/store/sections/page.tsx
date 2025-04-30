import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import SectionTable from "@/lib/components/Pages/Store/Sections/SectionTable";
import { URLs } from "@/lib/constants/urls";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <HeaderContainer
        title="Sections"
        description="Manage your sections from here"
      >
        <Button as={Link} href={URLs.store.sections.create} color="primary">
          Add
        </Button>
      </HeaderContainer>
    <SectionTable />
    </>
  );
};

export default Page;
