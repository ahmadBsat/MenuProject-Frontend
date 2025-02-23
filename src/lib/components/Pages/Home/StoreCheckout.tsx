"use client";

import { WHATSAPP_URI } from "@/lib/constants/variables";
import { useCart } from "@/lib/context/CartContext";
import { StorePopulated } from "@/lib/types/store/store";
import { usePreference } from "@/store/account";
import { format_pricing } from "@/utils/common";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  Textarea,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { set } from "lodash";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const StoreCheckout = ({
  isOpen,
  onOpenChange,
  store,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  store: StorePopulated;
}) => {
  const [data, setData] = useState({
    region: "",
    address: "",
    name: "",
    phone: "",
    instruction: "",
  });

  const { cart, resetCart } = useCart();
  const { branch, currency } = usePreference();

  const currencies = { USD: "$", LBP: "LBP" };

  const get_whatsapp_message = () => {
    if (!branch.phone_number) return;

    // check if user data is complete
    const is_user_data_complete = Object.entries(data).every(
      ([key, value]) => key === "instruction" || value
    );

    if (!is_user_data_complete) {
      return "Please fill in all the required fields before placing the order.";
    }

    // build the product list message with additions
    const product_list = cart.products
      .map((product) => {
        const additions = product.additions
          .map(
            (addition) =>
              `  - ${addition.name}: ${addition.items
                .map((item) => item.name)
                .join(", ")}`
          )
          .join("\n");

        const formatted_price = store.settings?.display_pricing
          ? `${
              currency.name === "USD"
                ? product.price.toFixed(2)
                : format_pricing(product.price * currency.rate_change)
            } ${currencies[currency.name]}`
          : "";

        const instructions = product.instructions
          ? ` \n - Instructions: ${product.instructions}`
          : "";

        return `- ${product.name} (Qty: ${product.quantity}${
          store.settings?.display_pricing ? `, Price: ${formatted_price}` : ""
        })${additions ? `\n${additions}` : ""}${instructions}`;
      })
      .join("\n\n");

    // Calculate total price (apply VAT if exclusive)
    const totalPrice = store.vat_exclusive
      ? cart.total_price * 1.11 // Add 11% VAT if exclusive
      : cart.total_price;

    const formattedTotalPrice =
      currency.name === "USD"
        ? totalPrice.toFixed(2)
        : format_pricing(totalPrice * currency.rate_change);

    // Build the message
    const message = `Hello, I would like to order the following:\n\n${productList}\n\nDelivery Details:\n- Name: ${
      data.name
    }\n- Phone: ${data.phone}\n- Address: ${data.address}, ${data.region} ${
      data.instruction ? ` \n- Special Instruction: ${data.instruction}` : ""
    }\n\nTotal: ${formattedTotalPrice} ${currencies[currency.name]} ${
      store.vat_exclusive ? "(incl. VAT)" : ""
    }\n\nThank you!`;
    // build the message
    const message = [
      store.settings?.display_pricing
        ? "Hello, I would like to order the following:"
        : "Hello, I would like to order the following items. Please provide me with a quote.",

      product_list,
      "Delivery Details:",
      `- Name: ${data.name}`,
      `- Phone: ${data.phone}`,
      `- Address: ${data.address}, ${data.region}`,
      data.instruction ? `- Special Instruction: ${data.instruction}` : "",
      "Thank you!",
    ]
      .filter(Boolean)
      .join("\n\n");

    return `${WHATSAPP_URI}?phone=${
      branch.phone_number
    }&text=${encodeURIComponent(message)}`;
  };

  const handleChange = (field: string, value: string | number) => {
    const temp = { ...data };
    set(temp, field, value);
    setData(temp);
  };

  const whatsapp_uri = get_whatsapp_message();

  return (
    <Modal
      size="3xl"
      isOpen={isOpen}
      placement="auto"
      scrollBehavior="inside"
      onOpenChange={onOpenChange}
      style={{
        backgroundColor: store.palette.checkout_background || "white",
      }}
      className="max-h-[400px] lg:max-h-[715px]"
      closeButton={
        <div
          style={{
            color: store.palette.checkout_content,
          }}
        >
          <XIcon size={20} />
        </div>
      }
      classNames={{
        base: `bg-[${store.palette?.checkout_background?.replace("#", "\\#")}]`,
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              className="flex flex-col gap-1 text-xl font-mono"
              style={{ color: store.palette.checkout_content }}
            >
              Checkout
            </ModalHeader>

            <ModalBody className="grid grid-cols-1 gap-5">
              <div className="flex flex-col gap-3 container mx-auto">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  value={data.name}
                  classNames={{
                    inputWrapper: "bg-white",
                  }}
                  onValueChange={(v) => handleChange("name", v)}
                />

                <Input
                  isRequired
                  label="Phone Number"
                  placeholder="Phone Number"
                  type="number"
                  variant="bordered"
                  maxLength={8}
                  startContent={
                    <div
                      className="text-sm font-bold"
                      style={{ color: store.palette.checkout_content }}
                    >
                      +961
                    </div>
                  }
                  value={data.phone}
                  classNames={{
                    inputWrapper: "bg-white",
                  }}
                  onValueChange={(v) => {
                    const maxLength = 8;
                    if (v.length <= maxLength) {
                      handleChange("phone", v);
                    }
                  }}
                />

                <Input
                  isRequired
                  label="Area/Region"
                  placeholder="Area/Region"
                  variant="bordered"
                  value={data.region}
                  classNames={{
                    inputWrapper: "bg-white",
                  }}
                  onValueChange={(v) => handleChange("region", v)}
                />

                <Input
                  isRequired
                  label="Address"
                  placeholder="Enter your address"
                  variant="bordered"
                  value={data.address}
                  classNames={{
                    inputWrapper: "bg-white",
                  }}
                  onValueChange={(v) => handleChange("address", v)}
                />
                <Textarea
                  label="Special Instruction"
                  placeholder="Enter your special instruction"
                  variant="bordered"
                  value={data.instruction}
                  classNames={{
                    inputWrapper: "bg-white",
                  }}
                  onValueChange={(v) => handleChange("instruction", v)}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="primary" variant="solid" onPress={onClose}>
                Close
              </Button>
              <Button
                color="success"
                isDisabled={
                  !Object.entries(data).every(
                    ([key, value]) => key === "instruction" || value
                  )
                }
                as={Link}
                href={whatsapp_uri}
                onClick={async () => {
                  await resetCart({ store: store._id });
                }}
              >
                Order
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default StoreCheckout;
