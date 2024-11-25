import PanelSidebar from "@/lib/components/Navigations/Panel/PanelSidebar";

type Props = {
  children: React.ReactNode;
};

export default async function PanelLayout({ children }: Props) {
  return (
    <>
      <AuthGuardProvider>
        <PanelSidebar>{children}</PanelSidebar>
      </AuthGuardProvider>
    </>
  );
}
