"use client";

import {
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
            startContent={
              <span className="text-sm text-default-400">fmcshops.com/</span>
            }
            onValueChange={(e) => handleChange("domain", e)}
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
            startContent={<span className="text-sm text-default-400">%</span>}
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
            <p className="text-sm">Enable to display sections on the website</p>
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
              Enable to display the logo as the default picture for the product
            </p>
          </div>
        </Switch>

        <Switch
          classNames={SWITCH_STYLE}
          isDisabled={!editable}
          isSelected={data?.settings?.display_pricing}
          onValueChange={(val) => handleChange("settings.display_pricing", val)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Display Pricing</p>
            <p className="text-sm">Enable to display the products pricing</p>
          </div>
        </Switch>

        <div>
          <div className="text-lg sm:text-xl ">Header</div>

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

          <Divider className="my-5" />

          <div className="text-lg sm:text-xl ">Main Content</div>

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
                onChange={(e) => handleChange("palette.color", e.target.value)}
              />
            </div>
          </div>

          <Divider className="my-5" />

          <div className="text-lg sm:text-xl ">Category</div>

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
                onChange={(c) => handleChange("palette.category_background", c)}
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

          <Divider className="my-5" />

          <div className="text-lg sm:text-xl ">Button and Border</div>

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
                onChange={(e) => handleChange("palette.border", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg">Clear Cart Font Color</p>{" "}
              <HexColorPicker
                color={data.palette.clear_button_color}
                onChange={(c) => handleChange("palette.clear_button_color", c)}
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

          <Divider className="my-5" />

          <div className="text-lg sm:text-xl ">Checkout</div>

          <div className="mt-2 grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            <div className="flex flex-col gap-2">
              <p className="text-lg">Checkout Background</p>{" "}
              <HexColorPicker
                color={data.palette.checkout_background}
                onChange={(c) => handleChange("palette.checkout_background", c)}
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
        </div>
      </Card>
    </div>
  );
};

export default StoreInformation;
