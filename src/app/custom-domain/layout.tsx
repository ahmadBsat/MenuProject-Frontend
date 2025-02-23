import { CartProvider } from "@/lib/context/CartContext";
import { StoreProvider } from "@/lib/context/StoreContext";
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
          <StoreProvider>
            <CartProvider>{children}</CartProvider>
          </StoreProvider>
        </div>
      </section>
    </Suspense>
  );
}
