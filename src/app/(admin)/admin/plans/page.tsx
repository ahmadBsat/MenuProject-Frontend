import HeaderContainer from "@/lib/components/Containers/HeaderContainer";
import PlansTable from "@/lib/components/Pages/Plan/PlanTable";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <HeaderContainer
        title="Plans"
        description="Manage platform stores renewals"
      />

      <PlansTable />
    </div>
  );
};

export default Page;
