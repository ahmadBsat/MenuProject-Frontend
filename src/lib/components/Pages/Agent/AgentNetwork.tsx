"use client";

import { AgentFormProps } from "@/lib/types/agent";
import { Button, Card, Input } from "@nextui-org/react";
import { CARD_STYLE } from "@/lib/constants/style";
import { DeleteIcon } from "@/utils/icons";

const AgentNetwork = ({
  data,
  editable,
  handleChange,
  lang,
}: AgentFormProps) => {
  const removeDomain = (index: number) => {
    const temp = [...data.domains];
    temp.splice(index, 1);

    handleChange("domains", temp);
  };

  const addDomain = () => {
    const temp = data.domains ?? [];
    temp.push("");

    handleChange("domains", temp);
  };

  return (
    <div  className="w-full flex flex-col gap-4">
      <Card shadow="none" className={CARD_STYLE}>
        <div className="w-full flex flex-col gap-4">
          <div className="text-lg sm:text-xl px-1">
            Main Website
          </div>

          <Input
            label="Website"
            type="text"
            placeholder="Website"
            isDisabled={!editable}
            value={data.website}
            onValueChange={(e) => handleChange("website", e)}
          />

          <div className="flex flex-col gap-3 w-full mt-6">
            <div className="text-lg sm:text-xl px-1">
              Domain Protection
            </div>

            {data.domains?.map((domain, idx) => {
              return (
                <div key={idx} className="flex gap-2 items-center">
                  <Input
                    label="Domain"
                    type="text"
                    placeholder="Domain"
                    isRequired
                    required
                    isDisabled={!editable}
                    value={domain}
                    onValueChange={(e) => handleChange(`domains[${idx}]`, e)}
                    endContent={
                      <Button
                        isIconOnly
                        color="danger"
                        isDisabled={!editable}
                        className="text-2xl"
                        onClick={() => removeDomain(idx)}
                      >
                        <DeleteIcon />
                      </Button>
                    }
                  />
                </div>
              );
            })}

            <div>
              <Button
                color="primary"
                variant="bordered"
                isDisabled={!editable}
                className="border-dashed"
                onClick={addDomain}
              >
                Add Domain
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AgentNetwork;
