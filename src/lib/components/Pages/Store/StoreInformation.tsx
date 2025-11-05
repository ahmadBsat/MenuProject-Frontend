"use client";

import {
  Accordion,
  AccordionItem,
  Autocomplete,
  AutocompleteItem,
  Card,
  Divider,
  Input,
  Switch,
} from "@nextui-org/react";
import { CARD_STYLE, SWITCH_STYLE } from "@/lib/constants/style";
import { useEffect, useState } from "react";
import { User } from "@/lib/types/user/user";
import { handleServerError } from "@/lib/api/_axios";
import { toast } from "sonner";
import { API_USER } from "@/lib/services/user/user_service";
import { HexColorPicker } from "react-colorful";
import { StoreForm } from "@/lib/types/store/store";
import { NestedKeyOf } from "@/lib/types/common";
import { Settings } from "lucide-react";

const StoreInformation = ({
  data,
  editable,
  handleChange,
}: {
  data: StoreForm;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (field: NestedKeyOf<StoreForm>, value: any) => void;
  editable: boolean;
}) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    setLoading(true);

    try {
      const res = await API_USER.getAllUsers();
      setUsers(res.data);
    } catch (error) {
      handleServerError(error, (msg) => {
        toast.error(`${msg}`);
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [error, setError] = useState("");

  const isValidSubdomain = (value) => {
    const regex = /^(?!-)[a-z0-9-]+(?<!-)$/;
    return regex.test(value);
  };

  const handleDomainValueChange = (key, value) => {
    const cleanedValue = value.toLowerCase();

    if (!isValidSubdomain(cleanedValue)) {
      setError(
        "Only lowercase letters, numbers, and hyphens are allowed. No spaces or special characters."
      );
    } else {
      setError("");
    }

    handleChange(key, cleanedValue);
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-5">
      <Card shadow="none" className={CARD_STYLE}>
        <div className="text-lg sm:text-xl px-1">Information</div>

        <div className="flex flex-col gap-4 w-full">
          <Input
            label="Name"
            type="text"
            placeholder="Descriptive name for the store..."
            isRequired
            required
            isDisabled={!editable}
            value={data.name}
            onValueChange={(e) => handleChange("name", e)}
          />

          <Input
            label="Domain"
            type="text"
            placeholder="Store domain address"
            isRequired
            required
            isDisabled={!editable}
            value={data.domain}
            isInvalid={!!error}
            errorMessage={error}
            endContent={
              <span className="text-sm text-default-400">.fmcshops.com</span>
            }
            onValueChange={(e) => handleDomainValueChange("domain", e)}
          />

          <Input
            label="Custom Domain"
            type="text"
            placeholder="Store custom domain address"
            isDisabled={!editable}
            value={data.custom_domain}
            onValueChange={(e) => handleChange("custom_domain", e)}
          />

          <Autocomplete
            label="Owner"
            isLoading={loading}
            placeholder="Select a user as owner"
            required
            isRequired
            isDisabled={!editable}
            selectedKey={data.owner}
            onSelectionChange={(e) => handleChange("owner", e?.toString())}
          >
            {users.map((item) => {
              return (
                <AutocompleteItem key={item._id}>
                  {`${item.firstname} ${item.lastname}`}
                </AutocompleteItem>
              );
            })}
          </Autocomplete>
        </div>

        <Input
          label="Renewal Cost"
          type="text"
          placeholder="Store renewal cost"
          isRequired
          required
          isDisabled={!editable}
          value={data.renewal_cost.toString()}
          startContent={<span className="text-sm text-default-400">$</span>}
          onValueChange={(e) => handleChange("renewal_cost", Number(e))}
        />

        <Input
          label="Store Label"
          type="text"
          placeholder="Store Label Value..."
          isRequired
          required
          isDisabled={!editable}
          value={data.store_label}
          onValueChange={(e) => handleChange("store_label", e)}
        />
        <Accordion variant="light">
          <AccordionItem
            key={1}
            title="Check store settings"
            subtitle="Configuration for the store"
            indicator={<Settings size={24} />}
            classNames={{
              title: "text-xl font-semibold",
              content: "flex flex-col gap-4",
            }}
          >
            <Switch
              classNames={SWITCH_STYLE}
              isDisabled={!editable}
              isSelected={data.vat_exclusive}
              onValueChange={(val) => handleChange("vat_exclusive", val)}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">VAT Exclusive</p>
                <p className="text-sm">
                  Enable to add VAT to the total of the cart.
                </p>
              </div>
            </Switch>
            {data.vat_exclusive && (
              <Input
                label="VAT Percentage"
                type="text"
                placeholder="VAT Amount Percentage"
                isRequired
                required
                isDisabled={!editable}
                value={data.vat_percentage?.toString()}
                startContent={
                  <span className="text-sm text-default-400">%</span>
                }
                onValueChange={(e) => handleChange("vat_percentage", Number(e))}
              />
            )}
            <Switch
              classNames={SWITCH_STYLE}
              isDisabled={!editable}
              isSelected={data.is_active}
              onValueChange={(val) => handleChange("is_active", val)}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Store Enabled</p>
                <p className="text-sm">
                  Enable to make this store accessible for visitors
                </p>
              </div>
            </Switch>
            <Switch
              classNames={SWITCH_STYLE}
              isDisabled={!editable}
              isSelected={data.watermark}
              onValueChange={(val) => handleChange("watermark", val)}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Watermark</p>
                <p className="text-sm">
                  Enable to display watermark on the website
                </p>
              </div>
            </Switch>
            <Switch
              classNames={SWITCH_STYLE}
              isDisabled={!editable}
              isSelected={data.use_sections}
              onValueChange={(val) => handleChange("use_sections", val)}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Section</p>
                <p className="text-sm">
                  Enable to display sections on the website
                </p>
              </div>
            </Switch>
            <Switch
              classNames={SWITCH_STYLE}
              isDisabled={!editable}
              isSelected={data.logoDefault}
              onValueChange={(val) => handleChange("logoDefault", val)}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Logo Default picture</p>
                <p className="text-sm">
                  Enable to display the logo as the default picture for the
                  product
                </p>
              </div>
            </Switch>
            <Switch
              classNames={SWITCH_STYLE}
              isDisabled={!editable}
              isSelected={data?.settings?.display_pricing}
              onValueChange={(val) =>
                handleChange("settings.display_pricing", val)
              }
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Display Pricing</p>
                <p className="text-sm">
                  Enable to display the products pricing
                </p>
              </div>
            </Switch>
            <Switch
              classNames={SWITCH_STYLE}
              isDisabled={!editable}
              isSelected={data?.settings?.allow_branch_cart_modifications}
              onValueChange={(val) =>
                handleChange("settings.allow_branch_cart_modifications", val)
              }
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Allow branch cart modification</p>
                <p className="text-sm">
                  Enable to allow users to disable the cart from different
                  branches
                </p>
              </div>
            </Switch>
          </AccordionItem>
        </Accordion>
        <Divider className="my-1" />
        <div className="text-lg sm:text-xl px-1">Color Settings</div>
        <Accordion variant="light">
          <AccordionItem
            key={2}
            title="Header color settings"
            subtitle="Header color configuration"
            indicator={<Settings size={24} />}
            classNames={{
              title: "text-xl font-semibold",
              content: "flex flex-col gap-4",
            }}
          >
            <div className="mt-2 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg">Header Background Color</p>{" "}
                <HexColorPicker
                  color={data.palette.header_background}
                  onChange={(c) => handleChange("palette.header_background", c)}
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Header Background Color"
                  className="w-[200px]"
                  value={data.palette.header_background}
                  onChange={(e) =>
                    handleChange("palette.header_background", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Header Text Color</p>{" "}
                <HexColorPicker
                  color={data.palette.header_text_color}
                  onChange={(c) => handleChange("palette.header_text_color", c)}
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Header Text Color"
                  className="w-[200px]"
                  value={data.palette.header_text_color}
                  onChange={(e) =>
                    handleChange("palette.header_text_color", e.target.value)
                  }
                />
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key={3}
            title="Main content color settings"
            subtitle="Background, pricing and font color configuration"
            indicator={<Settings size={24} />}
            classNames={{
              title: "text-xl font-semibold",
              content: "flex flex-col gap-4",
            }}
          >
            <div className="mt-2 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg">Background Color</p>{" "}
                <HexColorPicker
                  color={data.palette.background}
                  onChange={(c) => handleChange("palette.background", c)}
                />
                <Input
                  label=""
                  type="text"
                  placeholder="Background Color"
                  className="w-[200px]"
                  value={data.palette.background}
                  onChange={(e) =>
                    handleChange("palette.background", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg">Pricing Color</p>{" "}
                <HexColorPicker
                  color={data.palette.price_color}
                  onChange={(c) => handleChange("palette.price_color", c)}
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Pricing Color"
                  className="w-[200px]"
                  value={data.palette.price_color}
                  onChange={(e) =>
                    handleChange("palette.price_color", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Font Color</p>{" "}
                <HexColorPicker
                  color={data.palette.color}
                  onChange={(c) => handleChange("palette.color", c)}
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Font Color"
                  className="w-[200px]"
                  value={data.palette.color}
                  onChange={(e) =>
                    handleChange("palette.color", e.target.value)
                  }
                />
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key={4}
            title="Category color settings"
            subtitle="Category font and background color configuration"
            indicator={<Settings size={24} />}
            classNames={{
              title: "text-xl font-semibold",
              content: "flex flex-col gap-4",
            }}
          >
            <div className="mt-2 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg">Category Font Color</p>{" "}
                <HexColorPicker
                  color={data.palette.category_color}
                  onChange={(c) => handleChange("palette.category_color", c)}
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Category Font Color"
                  className="w-[200px]"
                  value={data.palette.category_color}
                  onChange={(e) =>
                    handleChange("palette.category_color", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Category Background</p>{" "}
                <HexColorPicker
                  color={data.palette.category_background}
                  onChange={(c) =>
                    handleChange("palette.category_background", c)
                  }
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Category Background"
                  className="w-[200px]"
                  value={data.palette.category_background}
                  onChange={(e) =>
                    handleChange("palette.category_background", e.target.value)
                  }
                />
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key={5}
            title="Button and Border color settings"
            subtitle="Button font and border color configuration"
            indicator={<Settings size={24} />}
            classNames={{
              title: "text-xl font-semibold",
              content: "flex flex-col gap-4",
            }}
          >
            <div className="mt-2 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg">Buttons Font Color</p>{" "}
                <HexColorPicker
                  color={data.palette.primary}
                  onChange={(c) => handleChange("palette.primary", c)}
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Buttons Font Color"
                  className="w-[200px]"
                  value={data.palette.primary}
                  onChange={(e) =>
                    handleChange("palette.primary", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Border Color</p>{" "}
                <HexColorPicker
                  color={data.palette.border}
                  onChange={(c) => handleChange("palette.border", c)}
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Border Color"
                  className="w-[200px]"
                  value={data.palette.border}
                  onChange={(e) =>
                    handleChange("palette.border", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Clear Cart Font Color</p>{" "}
                <HexColorPicker
                  color={data.palette.clear_button_color}
                  onChange={(c) =>
                    handleChange("palette.clear_button_color", c)
                  }
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Clear Cart Font Color"
                  className="w-[200px]"
                  value={data.palette.clear_button_color}
                  onChange={(e) =>
                    handleChange("palette.clear_button_color", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Clear Cart Background Color</p>{" "}
                <HexColorPicker
                  color={data.palette.clear_button_background}
                  onChange={(c) =>
                    handleChange("palette.clear_button_background", c)
                  }
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Clear Cart Background Color"
                  className="w-[200px]"
                  value={data.palette.clear_button_background}
                  onChange={(e) =>
                    handleChange(
                      "palette.clear_button_background",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key={6}
            title="Checkout color settings"
            subtitle="Checkout background and color configuration"
            indicator={<Settings size={24} />}
            classNames={{
              title: "text-xl font-semibold",
              content: "flex flex-col gap-4",
            }}
          >
            <div className="mt-2 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg">Checkout Background</p>{" "}
                <HexColorPicker
                  color={data.palette.checkout_background}
                  onChange={(c) =>
                    handleChange("palette.checkout_background", c)
                  }
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Checkout Background"
                  className="w-[200px]"
                  value={data.palette.checkout_background}
                  onChange={(e) =>
                    handleChange("palette.checkout_background", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Checkout Content Color</p>{" "}
                <HexColorPicker
                  color={data.palette.checkout_content}
                  onChange={(c) => handleChange("palette.checkout_content", c)}
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Checkout Content"
                  className="w-[200px]"
                  value={data.palette.checkout_content}
                  onChange={(e) =>
                    handleChange("palette.checkout_content", e.target.value)
                  }
                />
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key={7}
            title="Section color settings"
            subtitle="Section background and color configuration"
            indicator={<Settings size={24} />}
            classNames={{
              title: "text-xl font-semibold",
              content: "flex flex-col gap-4",
            }}
          >
            <div className="mt-2 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg">Section Background</p>{" "}
                <HexColorPicker
                  color={data.palette.section_background}
                  onChange={(c) =>
                    handleChange("palette.section_background", c)
                  }
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Section Background color"
                  className="w-[200px]"
                  value={data.palette.section_background}
                  onChange={(e) =>
                    handleChange("palette.section_background", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Section Font Color</p>{" "}
                <HexColorPicker
                  color={data.palette.section_color}
                  onChange={(c) => handleChange("palette.section_color", c)}
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Section Color"
                  className="w-[200px]"
                  value={data.palette.section_color}
                  onChange={(e) =>
                    handleChange("palette.section_color", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Active Section Background</p>{" "}
                <HexColorPicker
                  color={data.palette.active_section_background}
                  onChange={(c) =>
                    handleChange("palette.active_section_background", c)
                  }
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Active Section Background color"
                  className="w-[200px]"
                  value={data.palette.active_section_background}
                  onChange={(e) =>
                    handleChange(
                      "palette.active_section_background",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg">Active Section Font Color</p>{" "}
                <HexColorPicker
                  color={data.palette.active_section_color}
                  onChange={(c) =>
                    handleChange("palette.active_section_color", c)
                  }
                />{" "}
                <Input
                  label=""
                  type="text"
                  placeholder="Active Section Color"
                  className="w-[200px]"
                  value={data.palette.active_section_color}
                  onChange={(e) =>
                    handleChange("palette.active_section_color", e.target.value)
                  }
                />
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default StoreInformation;
