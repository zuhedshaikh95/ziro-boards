import { useMutation } from "convex/react";
import { FunctionReference } from "convex/server";
import { useState } from "react";

export const useApiMutation = (mutationFun: FunctionReference<"mutation">) => {
  const [pending, setPending] = useState<boolean>(false);
  const apiMutation = useMutation(mutationFun);

  const mutate = async (payload: any) => {
    setPending(true);
    try {
      const result = await apiMutation(payload);
      return { data: result, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    } finally {
      setPending(false);
    }
  };

  return { mutate, pending };
};
