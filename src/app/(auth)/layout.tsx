import { Suspense } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <section className="h-screen">
        <div className="w-full h-full">{children}</div>
      </section>
    </Suspense>
  );
}
