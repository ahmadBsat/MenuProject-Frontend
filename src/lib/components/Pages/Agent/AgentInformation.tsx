"use client";

import { AgentFormProps } from "@/lib/types/agent";
import {
  Card,
  Input,
  Select,
  SelectItem,
  SelectSection,
  Switch,
} from "@nextui-org/react";
import { CARD_STYLE, SWITCH_STYLE } from "@/lib/constants/style";
import { MODELS } from "@/lib/constants/variables";

const AgentInformation = ({
  data,
  editable,
  handleChange,
  lang,
}: AgentFormProps) => {
  return (
    <div  className="w-full flex flex-col gap-4">
      <Card shadow="none" className={CARD_STYLE}>
        <div className="text-lg sm:text-xl px-1">
          Information
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Input
            label="Name"
            type="text"
            placeholder="Name"
            isRequired
            required
            isDisabled={!editable}
            value={data.name}
            onValueChange={(e) => handleChange("name", e)}
          />

          <Select
            label="Type"
            placeholder="Type"
            required
            isRequired
            isDisabled={!editable}
            disallowEmptySelection
            selectedKeys={new Set([data.type])}
            onSelectionChange={(e) => handleChange("type", Array.from(e)[0])}
          >
            <SelectItem key={"agent"}>Agent</SelectItem>
            <SelectItem key={"informative"}>Informative</SelectItem>
          </Select>

          <Select
            label="Model"
            placeholder="Model"
            required
            isRequired
            isDisabled={!editable}
            disallowEmptySelection
            selectedKeys={new Set([data.model])}
            onSelectionChange={(e) => handleChange("model", Array.from(e)[0])}
          >
            {MODELS.map((group, idx) => {
              const last = idx + 1 === MODELS.length;
              return (
                <SelectSection
                  key={idx}
                  showDivider={!last}
                  title={group.title}
                >
                  {group.data.map((model) => {
                    return (
                      <SelectItem key={model.value} className="uppercase">
                        {model.label}
                      </SelectItem>
                    );
                  })}
                </SelectSection>
              );
            })}
          </Select>
        </div>
      </Card>

      <Card shadow="none" className={CARD_STYLE}>
        <div className="text-lg sm:text-xl px-1">Status</div>

        <Switch
          classNames={SWITCH_STYLE}
          isDisabled={!editable}
          isSelected={data.is_active}
          onValueChange={(val) => handleChange("is_active", val)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Enable Agent?</p>
            <p className="text-sm">
              If enabled you will be able to use this agent token in the chat
              configuration.
            </p>
          </div>
        </Switch>
      </Card>
    </div>
  );
};

export default AgentInformation;
