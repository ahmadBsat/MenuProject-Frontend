import { CartProvider } from "@/lib/context/CartContext";
import { Suspense } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <section>
        <div className="w-full h-full">
          <CartProvider>{children}</CartProvider>
        </div>
      </section>
    </Suspense>
  );
}
