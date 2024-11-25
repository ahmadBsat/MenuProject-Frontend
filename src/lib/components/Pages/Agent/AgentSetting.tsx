"use client";

import { AgentFormProps } from "@/lib/types/agent";
import {
  Card,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@nextui-org/react";
import { CARD_STYLE, SWITCH_STYLE } from "@/lib/constants/style";

const AgentSetting = ({
  data,
  editable,
  handleChange,
  lang,
}: AgentFormProps) => {
  return (
    <div  className="w-full flex flex-col gap-4">
      <Card shadow="none" className={CARD_STYLE}>
        <div className="text-lg sm:text-xl px-1">Settings</div>

        <Textarea
          label="Guidance Prompt"
          type="text"
          placeholder="Prompt"
          minRows={6}
          maxRows={9}
          isRequired
          required
          isDisabled={!editable}
          value={data.prompt_message}
          onValueChange={(e) => handleChange("prompt_message", e)}
        />

        <Input
          label="Swagger URL"
          type="text"
          placeholder="Swagger File URL"
          // isRequired
          // required
          isDisabled={!editable}
          value={data.swagger_url}
          onValueChange={(e) => handleChange("swagger_url", e)}
        />

        <Select
          label="Language"
          placeholder="Language"
          required
          isRequired
          isDisabled={!editable}
          disallowEmptySelection
          selectedKeys={new Set([data.language])}
          onSelectionChange={(e) => handleChange("language", Array.from(e)[0])}
        >
          <SelectItem key={"en"}>English</SelectItem>
          <SelectItem key={"fr"}>French</SelectItem>
          <SelectItem key={"ar"}>Arabic</SelectItem>
        </Select>

        <Switch
          classNames={SWITCH_STYLE}
          isDisabled={!editable}
          isSelected={data.enhanced_privacy}
          onValueChange={(val) => handleChange("enhanced_privacy", val)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Enhanced Privacy</p>
            <p className="text-sm">Enable to increase privacy.</p>
          </div>
        </Switch>

        <Switch
          classNames={SWITCH_STYLE}
          isDisabled={!editable}
          isSelected={data.is_followup}
          onValueChange={(val) => handleChange("is_followup", val)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Follow Up Questions</p>
            <p className="text-sm">
              If enabled the agent will suggest for the user a quick follow up
              questions.
            </p>
          </div>
        </Switch>

        <Switch
          classNames={SWITCH_STYLE}
          isDisabled={!editable}
          isSelected={data.is_flow_only}
          onValueChange={(val) => handleChange("is_flow_only", val)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-medium">Flows Only</p>
            <p className="text-sm">
              If enabled the agent will only be able to make request using flows
              no single actions.
            </p>
          </div>
        </Switch>
      </Card>
    </div>
  );
};

export default AgentSetting;
