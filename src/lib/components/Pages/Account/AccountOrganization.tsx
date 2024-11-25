"use client";

import { LanguageParams } from "@/lib/types/page";
import { useOrganization } from "@/store/organization";
import { Button, Divider, Input, cn } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { OrganizationAccount } from "@/lib/types/organization";
import { USER_ROLES } from "@/lib/constants/variables";
import { useParams, usePathname, useRouter } from "next/navigation";

const AccountOrganization = ({ lang }: LanguageParams) => {
  const [current, setCurrent] = useState<OrganizationAccount | null>(null);

  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const organization = params.organization as string;

  const { organizations } = useOrganization();

  const handleChange = (value: string) => {
    const new_pathname = pathname.replace(/\/org\/[^/]+/, `/org/${value}`);

    router.push(new_pathname);
  };

  useEffect(() => {
    if (organization && organizations.length > 0) {
      const curr_org = organizations.find((o) => o._id === organization);
      setCurrent(curr_org ?? null);
    }
  }, [organization, organizations]);

  // const createOrganization = async () => {
  //   try {
  //     setLoading(true);

  //     const result = await API_ORGANIZATION.createOrganization({ name });

  //     if (result.success) {
  //       setName("");
  //       getOrganizations();
  //       toastNotify({ type: "info", message: "Organization created" });
  //       onClose();
  //     }
  //   } catch (error) {
  //     const err = error as { message: string };
  //     console.log(error);
  //     toastNotify({ type: "error", message: err.message });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div  className="flex flex-col gap-4 sm:gap-8 max-w-2xl w-full">
      {current && (
        <div className="w-full bg-primary/20 border border-primary rounded-2xl p-4 flex flex-col gap-1 leading-4">
          <p className="text-sm sm:text-base">
            Current Organization {current.organization.name}
          </p>

          <p className="text-xs sm:text-sm">
            Your are currently managing {current.organization.name} if you would
            like to switch check below.
          </p>
        </div>
      )}

      {current && current.role === USER_ROLES.OWNER && (
        <div className="flex flex-col">
          <div className="flex flex-col w-full bg-content1 rounded-2xl p-4 leading-4">
            <p className="text-base font-medium text-default-700 px-1">
              Update Organization
            </p>
            <p className="mb-3 text-sm font-normal text-default-400 px-1">
              Only the owner can update the organization.
            </p>

            <Input
              aria-label="name"
              size="lg"
              label="Name"
              placeholder="Organization Name"
              value={current?.organization.name}
              onValueChange={(val) => {
                setCurrent((state) =>
                  state
                    ? {
                        ...state,
                        organization: { ...state.organization, name: val },
                      }
                    : null
                );
              }}
            />

            <div className="flex items-center justify-end mt-4">
              <Button color="primary">Update</Button>
            </div>
          </div>

          <Divider className="mt-4 sm:mt-8" />
        </div>
      )}

      <div className="flex flex-col">
        <p className="text-base font-medium text-default-700 px-1">
          Available Organizations
        </p>
        <p className="mb-3 text-sm font-normal text-default-400 px-1">
          Organization linked with your account.
        </p>

        <div className="flex flex-col gap-3 w-full">
          {organizations.map((org, idx) => {
            const is_current = org.organization._id === organization;

            return (
              <div
                key={idx}
                className={cn(
                  is_current && "opacity-50 cursor-not-allowed",
                  "w-full bg-content1 rounded-2xl p-4 flex justify-between items-center gap-2 leading-4"
                )}
              >
                <p className="text-sm sm:text-base">{org.organization.name}</p>

                <Button
                  isDisabled={is_current}
                  color={is_current ? "success" : "primary"}
                  onClick={() => handleChange(org.organization._id)}
                >
                  {is_current ? "Current" : "Switch"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountOrganization;
