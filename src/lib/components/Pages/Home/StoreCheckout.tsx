import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { XIcon } from "lucide-react";
import { set } from "lodash";
import Link from "next/link";
import { WHATSAPP_URI } from "@/lib/constants/variables";
import { useCart } from "@/lib/context/CartContext";
import { StorePopulated } from "@/lib/types/store/store";
import { usePreference } from "@/store/account";
import { format_pricing } from "@/utils/common";

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
    orderMethod: "delivery",
    instruction: "",
  });
  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const { cart, resetCart } = useCart();
  const { branch, currency } = usePreference();
  const [locationLink, setLocationLink] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
    address: string;
    region: string;
  }>({
    latitude: null,
    longitude: null,
    address: "",
    region: "",
  });

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
      ? cart.total_price * 1.11 // Add 11% VAT if exclusive
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

    setLoadingLocation(true);

    // Show Lebanon map initially, even before the location is fetched
    const defaultMapUrl =
      "https://www.google.com/maps?q=33.8547,35.8623&hl=es;z=14&output=embed"; // Lebanon

    setLocationLink(defaultMapUrl); // Set Lebanon as default map

    // Try fetching user's location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        // Fetch location data for display
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const locationData = await response.json();

        const fetchedAddress =
          locationData.display_name || "Location not found";
        const fetchedRegion = locationData.address?.city || "Unknown Region";

        setUserLocation({
          latitude,
          longitude,
          address: fetchedAddress,
          region: fetchedRegion,
        });

        // Set map to show user's location
        setLocationLink(mapUrl);
        setLoadingLocation(false);
      },
      (error) => {
        alert("Unable to retrieve your location: " + error.message);
        setLoadingLocation(false);
      }
    );
  };

  const whatsapp_uri = get_whatsapp_message();

  const isButtonDisabled = () => {
    if (currentStep === 1) {
      return !(data.name && data.phone && data.orderMethod); // Step 1 validation
    } else if (currentStep === 3) {
      return !userLocation.latitude || !userLocation.longitude; // Step 3 validation (location)
    }
    return false; // Step 4 always enabled
  };

  const handleNextButtonClick = () => {
    if (currentStep === 4) {
      // Complete the order and reset the cart on Step 4
      resetCart({ store: store._id });
      return;
    }

    // Move to the next step or skip to Step 3 if pickup or no location
    if (currentStep === 1 && data.orderMethod === "pickup") {
      setCurrentStep(4);
      return;
    }

    if (currentStep === 1 && data.orderMethod !== "pickup") {
      setCurrentStep(2);
      return;
    }

    if (
      currentStep === 3 &&
      (!userLocation.latitude || !userLocation.longitude)
    ) {
      setCurrentStep(4); // Skip to Step 3 if no location
      return;
    } else {
      setCurrentStep(currentStep + 1);
      return;
    }
  };

  const handleBackButton = () => {
    // Only allow going back if we're past step 1
    if (currentStep > 1) {
      // If on step 2, or if on step 3 and order method is pickup, go to step 1
      if (
        currentStep === 3 ||
        (currentStep === 2 && data.orderMethod === "pickup")
      ) {
        setCurrentStep(1);
      } else {
        // Otherwise, simply go back one step
        setCurrentStep(currentStep - 1);
      }
    }
  };

  useEffect(() => {
    if (currentStep === 3) {
      getCurrentLocation();
    }
  }, [currentStep]);

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
      className="max-h-[510px] lg:max-h-[715px]"
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
        <ModalHeader
          className="flex flex-col gap-1 text-xl font-mono"
          style={{ color: store.palette.checkout_content }}
        >
          Checkout
        </ModalHeader>

        <ModalBody className="grid grid-cols-1 gap-5 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Step 1 - User Information */}
          {currentStep === 1 && (
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
          )}

          {currentStep === 2 && (
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

          {/* Step 2 - Location Information */}
          {currentStep === 3 &&
            !loadingLocation &&
            userLocation.latitude &&
            userLocation.longitude && (
              <div className="flex flex-col gap-3 min-h-[300px] h-[300px]">
                <div className="map-container min-h-[300px] h-[300px]">
                  <iframe
                    src={`https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}&hl=es;z=14&output=embed`}
                    width="100%"
                    height="300px"
                    style={{ border: "none" }}
                    allowFullScreen
                    loading="lazy"
                    aria-label="User's current location on map"
                  ></iframe>
                </div>
              </div>
            )}

          {currentStep === 3 &&
            !userLocation.latitude &&
            !userLocation.longitude &&
            loadingLocation && (
              <div className="flex flex-col gap-3">
                <div className="map-container">
                  <iframe
                    src={`https://www.google.com/maps?q=33.8547,35.8623&hl=es;z=14&output=embed`} // Default map showing Lebanon
                    width="100%"
                    height="300px"
                    style={{ border: "none" }}
                    allowFullScreen
                    loading="lazy"
                    aria-label="Default location map of Lebanon"
                  ></iframe>
                </div>
                <div className="text-center mt-2">
                  <p className="text-gray-600">
                    Showing default location (Lebanon) until we can fetch your
                    actual location.
                  </p>
                </div>
              </div>
            )}

          {currentStep === 3 &&
            !loadingLocation &&
            !userLocation.latitude &&
            !userLocation.longitude && (
              <div className="text-center">
                <p className="text-red-500">
                  Unable to fetch your location. Please check your location
                  permissions or try again.
                </p>
                <Button
                  color="primary"
                  variant="solid"
                  onClick={getCurrentLocation}
                  className="mt-4"
                  aria-label="Retry fetching location"
                >
                  Retry
                </Button>
                <Button
                  color="secondary"
                  variant="solid"
                  onClick={() => setCurrentStep(3)} // Skip to Step 3
                  className="mt-4"
                  aria-label="Skip location and proceed"
                >
                  Skip
                </Button>
              </div>
            )}

          {/* Step 3 - Checkout Summary */}
          {currentStep === 4 && (
            <div className="order-summary p-6 bg-gray-100 rounded-lg shadow-lg overflow-y-auto max-h-[100%]">
              <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>

              <div className="product-list space-y-4 mb-4">
                {cart.products.map((product) => {
                  const formattedPrice = store.settings?.display_pricing
                    ? `${
                        currency.name === "USD"
                          ? product.price.toFixed(2)
                          : format_pricing(product.price * currency.rate_change)
                      } ${currencies[currency.name]}`
                    : "";

                  const additions = product.additions
                    .map(
                      (addition) =>
                        `- ${addition.name}: ${addition.items
                          .map((item) => item.name)
                          .join(", ")}`
                    )
                    .join("\n");

                  const instructions = product.instructions
                    ? `\n - Instructions: ${product.instructions}`
                    : "";

                  return (
                    <div
                      key={product._id}
                      className="product p-4 bg-white rounded-lg shadow-sm"
                    >
                      <p className="font-semibold">
                        {product.name} (Qty: {product.quantity})
                      </p>
                      {store.settings?.display_pricing && (
                        <p className="text-sm text-gray-500">
                          Price: {formattedPrice}
                        </p>
                      )}
                      {additions && (
                        <p className="text-sm text-gray-500">
                          Additions: {additions}
                        </p>
                      )}
                      {instructions && (
                        <p className="text-sm text-gray-500">{instructions}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="total mt-6">
                <h4 className="text-lg font-semibold">
                  Total:{" "}
                  {currency.name === "USD"
                    ? cart.total_price.toFixed(2)
                    : format_pricing(
                        cart.total_price * currency.rate_change
                      )}{" "}
                  {currencies[currency.name]}
                </h4>
                {store.vat_exclusive && (
                  <p className="text-sm text-gray-500">(VAT excluded)</p>
                )}
              </div>

              <div className="delivery-details mt-6">
                {data.orderMethod === "delivery" && (
                  <div className="delivery-info p-4 bg-white rounded-lg shadow-sm">
                    <p>
                      <strong className="font-semibold">
                        Delivery Address:
                      </strong>{" "}
                      {data.address}, {data.region}
                    </p>
                    <p>
                      <strong className="font-semibold">Name:</strong>{" "}
                      {data.name}
                    </p>
                    <p>
                      <strong className="font-semibold">Phone:</strong>{" "}
                      {data.phone}
                    </p>
                    {data.instruction && (
                      <p>
                        <strong className="font-semibold">
                          Special Instructions:
                        </strong>{" "}
                        {data.instruction}
                      </p>
                    )}
                  </div>
                )}
                {data.orderMethod === "pickup" && (
                  <div className="pickup-info p-4 bg-white rounded-lg shadow-sm">
                    <p>
                      <strong className="font-semibold">
                        Pickup Information:
                      </strong>{" "}
                      {data.name}, {data.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            variant="solid"
            onPress={handleBackButton}
            className={currentStep > 1 ? "block" : "hidden"} // Hide if on Step 1
          >
            Back
          </Button>

          <Button
            color="success"
            isDisabled={isButtonDisabled()}
            as={currentStep === 4 ? Link : "button"}
            href={currentStep === 4 ? whatsapp_uri : ""}
            onPress={handleNextButtonClick}
          >
            {currentStep === 4 ? "Complete Order" : "Next"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StoreCheckout;