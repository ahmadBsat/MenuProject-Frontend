"use client";

import StoreHeader from "@/lib/components/Pages/Home/StoreHeader";
import { WHATSAPP_URI } from "@/lib/constants/variables";
import { useCart } from "@/lib/context/CartContext";
import { useStore } from "@/lib/context/StoreContext";
import { usePreference } from "@/store/account";
import { format_pricing } from "@/utils/common";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import { set } from "lodash";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const { store } = useStore();
  const { cart } = useCart();
  const { branch, currency } = usePreference();
  // All state hooks are called unconditionally
  const [data, setData] = useState({
    region: "",
    address: "",
    name: "",
    phone: "",
    orderMethod: "delivery",
    instruction: "",
  });
  const [locationLink, setLocationLink] = useState("");
  const [locationPermissionAsked, setLocationPermissionAsked] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

    useEffect(() => {
      if (!locationPermissionAsked) {
        checkLocationPermission();
      }
    }, [locationPermissionAsked]); // dependency is locationPermissionAsked
  // const [userLocation, setUserLocation] = useState<{
  //   latitude: number | null;
  //   longitude: number | null;
  //   address: string;
  //   region: string;
  // }>({
  //   latitude: null,
  //   longitude: null,
  //   address: "",
  //   region: "",
  // });
  if (!store) {
    return <div>Loading...</div>;
  }

  const currencies = { USD: "$", LBP: "LBP" };

  const get_whatsapp_message = () => {
    if (!branch.phone_number) return;
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

    const totalPrice = store.vat_exclusive
      ? cart.total_price * 1.11
      : cart.total_price;

    const formattedTotalPrice =
      currency.name === "USD"
        ? totalPrice.toFixed(2)
        : format_pricing(totalPrice * currency.rate_change);

    const is_delivery = data.orderMethod === "delivery";

    const delivery_details = is_delivery
      ? [
          "Delivery Details:",
          `- Name: ${data.name}`,
          `- Phone: ${data.phone}`,
          `- Address: ${data.address}, ${data.region}`,
          data.instruction ? `- Special Instruction: ${data.instruction}` : "",
        ]
      : [
          "I will pick up my order myself.",
          `- Name: ${data.name}`,
          `- Phone: ${data.phone}`,
        ];

    const locationLinkInfo = locationLink ? `- Location: ${locationLink}` : "";

    const message = [
      store.settings?.display_pricing
        ? "Hello, I would like to order the following:"
        : "Hello, I would like to order the following items. Please provide me with a quote.",
      product_list,
      ...delivery_details,
      locationLinkInfo,
      store.settings?.display_pricing
        ? `Total: ${formattedTotalPrice} ${currencies[currency.name]} ${
            store.vat_exclusive ? "(excl. VAT)" : "(incl. VAT)"
          }`
        : "",
      "Thank you!",
    ]
      .filter(Boolean)
      .join("\n\n");

    return `${WHATSAPP_URI}?phone=${
      branch.phone_number
    }&text=${encodeURIComponent(message)}`;
  };

  const whatsapp_uri = get_whatsapp_message();

  const handleChange = (field: string, value: string | number) => {
    const temp = { ...data };
    set(temp, field, value);
    setData(temp);
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLink(
      "https://www.google.com/maps?q=33.8547,35.8623&hl=es;z=14&output=embed"
    ); // Default Lebanon map

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        // const response = await fetch(
        //   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        // );
        // const locationData = await response.json();
        // const fetchedAddress =
        //   locationData.display_name || "Location not found";
        // const fetchedRegion = locationData.address?.city || "Unknown Region";

        // setUserLocation({
        //   latitude,
        //   longitude,
        //   address: fetchedAddress,
        //   region: fetchedRegion,
        // });

        setLocationLink(mapUrl);
      },
      (error) => {
        alert("Unable to retrieve your location: " + error.message);
      }
    );
  };

  const checkLocationPermission = async () => {
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });
      if (permission.state === "granted") {
        setLocationPermissionGranted(true);
        getCurrentLocation();
      } else if (permission.state === "prompt") {
        setLocationPermissionAsked(true);
        setShowLocationModal(true);
      }
    } catch (error) {
      console.error("Error checking location permission:", error);
    }
  };

  const handleLocationPermissionResponse = async (granted) => {
    setShowLocationModal(false);
    if (granted) {
      setLocationPermissionGranted(true);
      getCurrentLocation();
    } else {
      setLocationPermissionGranted(false);
    }
  };

  // useEffect will run when locationPermissionAsked changes


  const origin = window.location.origin;
  const backLink =
    store.custom_domain.length > 0
      ? store.custom_domain
      : origin + "/" + store.domain;

  return (
    <div
      style={{
        background: store.palette.background,
        color: store.palette.color,
      }}
      className="w-full min-h-screen h-screen flex flex-col overflow-y-auto "
    >
      <StoreHeader store={store} />

      <div className="container mx-auto flex flex-col gap-4 p-4">
        <div className="flex gap-4 items-center">
          <Button as={Link} href={backLink} color="success">
            Back
          </Button>
          <div className="text-xl font-mono">Checkout</div>
        </div>

        <div className="flex flex-col gap-3">
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
          <RadioGroup
            label="Order method"
            size="md"
            orientation="horizontal"
            className="bg-white p-2 rounded-xl w-full"
            classNames={{
              label: "text-xs text-gray-600",
            }}
            value={data.orderMethod}
            onChange={(e) => handleChange("orderMethod", e.target.value)}
          >
            <Radio value="delivery">
              <span className="text-xs">Delivery</span>
            </Radio>
            <Radio value="pickup">
              <span className="text-xs">Self Pickup</span>
            </Radio>
          </RadioGroup>

          {data.orderMethod === "delivery" && (
            <>
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
            </>
          )}

          <Button color="success" as={Link} href={whatsapp_uri}>
            Complete Order
          </Button>

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

          {/* Show message if location permission is denied */}
          {!locationPermissionGranted && (
            <div className="text-red-500">
              Unable to retrieve your location. Please try again.
            </div>
          )}

          {locationPermissionGranted && (
            <a className="text-green-500" href={locationLink} target="_blank">
              {locationLink}
            </a>
          )}

          {/* Show location modal */}
          <Modal
            isOpen={showLocationModal}
            onClose={() => setShowLocationModal(false)}
          >
            <ModalHeader>Location Permission</ModalHeader>
            <ModalBody>
              <div>We need access to your location for delivery.</div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onPress={() => handleLocationPermissionResponse(false)}
              >
                No
              </Button>
              <Button onPress={() => handleLocationPermissionResponse(true)}>
                Yes
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Page;
