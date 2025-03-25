"use client";

import { useStore } from "@/lib/context/StoreContext";

const Page = () => {
  const { store } = useStore();

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        color: store.palette.color,
        background: store.palette.background,
      }}
      className="h-screen flex items-center justify-center"
    >
      About
    </div>
  );
};

export default Page;
