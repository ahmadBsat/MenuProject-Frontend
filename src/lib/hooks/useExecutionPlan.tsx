import { useCallback } from "react";
import {
  FlowExecutionPlan,
  FlowExecutionPlanValidationError,
  FlowValidationErrorProps,
} from "../components/Pages/Flow/Execution/FlowExecutionPlan";
import { AppNode } from "../types/flow/node";
import useFlowNode from "@/store/flownodes";
import { useFlowValidation } from "../context/FlowValidationContext";
import { toast } from "sonner";

const useExecutionPlan = () => {
  const { nodes, edges } = useFlowNode();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: FlowValidationErrorProps) => {
      switch (error.type) {
        case FlowExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error("No entry point found");
          break;
        case FlowExecutionPlanValidationError.INVALID_INPUTS:
          setInvalidInputs(error.invalid_elements || []);
          toast.error("Some inputs are invalid");
          break;
        default:
          toast.error("Something went wrong");
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { execution_plan, error } = FlowExecutionPlan(
      nodes as AppNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();
    return execution_plan;
  }, [nodes, edges, handleError, clearErrors]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
