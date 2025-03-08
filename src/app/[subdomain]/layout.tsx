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
      <StoreProvider>
        <CartProvider>{children}</CartProvider>
      </StoreProvider>
    </Suspense>
  );
}
