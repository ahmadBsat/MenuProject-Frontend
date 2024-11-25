"use client";

import { AgentFormProps } from "@/lib/types/agent";
import { Card, Slider } from "@nextui-org/react";
import { CARD_STYLE } from "@/lib/constants/style";

const AgentVariables = ({
  data,
  editable,
  handleChange,
  lang,
}: AgentFormProps) => {
  return (
    <div
      
      className="w-full flex flex-col gap-4 max-w-full md:max-w-[70%]"
    >
      <Card shadow="none" className={CARD_STYLE}>
        <div className="text-lg sm:text-xl px-1 mb-6">
          <p>Thresholds</p>
          <p className="text-default-400 text-base">
            Control the score required for the documents as context for agent.
          </p>
        </div>

        <div className="flex flex-col gap-1 px-1">
          <p>
            Action Threshold{" "}
            <span className="italic text-default-400 text-small mb-1 px-2">
              {(data.variables.thresholds.actions * 100).toFixed(0)}%
            </span>
          </p>
          <Slider
            isDisabled={!editable}
            maxValue={1}
            minValue={0.2}
            showSteps={false}
            step={0.01}
            value={data.variables.thresholds.actions}
            onChange={(e) => handleChange("variables.thresholds.actions", e)}
            classNames={{ thumb: "shadow-none" }}
          />
        </div>

        <div className="flex flex-col gap-1 px-1">
          <p>
            Flow Threshold{" "}
            <span className="italic text-default-400 text-small mb-1 px-2">
              {(data.variables.thresholds.flows * 100).toFixed(0)}%
            </span>
          </p>
          <Slider
            maxValue={1}
            minValue={0.2}
            showSteps={false}
            step={0.01}
            value={data.variables.thresholds.flows}
            onChange={(e) => handleChange("variables.thresholds.flows", e)}
            classNames={{ thumb: "shadow-none" }}
          />
        </div>

        <div className="flex flex-col gap-1 px-1">
          <p>
            Knowledge Threshold{" "}
            <span className="italic text-default-400 text-small mb-1 px-2">
              {(data.variables.thresholds.knowledge * 100).toFixed(0)}%
            </span>
          </p>
          <Slider
            maxValue={1}
            minValue={0.2}
            showSteps={false}
            step={0.01}
            value={data.variables.thresholds.knowledge}
            onChange={(e) => handleChange("variables.thresholds.knowledge", e)}
            classNames={{ thumb: "shadow-none" }}
          />
        </div>

        <div className="flex flex-col gap-1 px-1">
          <p>
            Forbidden Topic Threshold{" "}
            <span className="italic text-default-400 text-small mb-1 px-2">
              {(data.variables.thresholds.topics * 100).toFixed(0)}%
            </span>
          </p>
          <Slider
            maxValue={1}
            minValue={0.2}
            showSteps={false}
            step={0.01}
            value={data.variables.thresholds.topics}
            onChange={(e) => handleChange("variables.thresholds.topics", e)}
            classNames={{ thumb: "shadow-none" }}
          />
        </div>

        <div className="flex flex-col gap-1 px-1">
          <p>
            Help Article Threshold{" "}
            <span className="italic text-default-400 text-small mb-1 px-2">
              {(data.variables.thresholds.articles * 100).toFixed(0)}%
            </span>
          </p>
          <Slider
            maxValue={1}
            minValue={0.2}
            showSteps={false}
            step={0.01}
            value={data.variables.thresholds.articles}
            onChange={(e) => handleChange("variables.thresholds.articles", e)}
            classNames={{ thumb: "shadow-none" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default AgentVariables;
