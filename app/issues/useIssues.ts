/**** This Hook oly woks for client components as it uses react query */

import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { PatchIssueForm } from "../_lib/validationSchema";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

export default function useIssues() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const issuesMutation = useMutation<Issue[], Error, null>({
    mutationFn: getIssues,
    mutationKey: ["issues"],
    onSuccess: async (issues) => {
      setLoading(false);
      setIssues(issues);
    },
    onError: (error) => {
      setError(error);
    },
    onMutate() {
      setError(null);
      setLoading(true);
    },
  });

  const patchIssue = useMutation<
    AxiosResponse<Issue>,
    Error,
    { id: string; data: PatchIssueForm }
  >({
    mutationFn: ({ data, id }) => updateIssue(id, data),
    onSuccess: async () => {
      setLoading(false);
    },
    onError: () => {
      toast.error("Changes could not be saved.");
      setError(error);
    },
    onMutate() {
      setError(null);
      setLoading(true);
    },
  });

  return {
    getIssues: issuesMutation.mutate,
    updateIssue: patchIssue.mutate,
    loading,
    issues,
    error,
  };

  function getIssues() {
    return prisma.issue.findMany({ orderBy: { id: "asc" } });
  }

  async function updateIssue(id: string, data: PatchIssueForm) {
    const res = await axios.patch<Issue>(`/api/issues/${id}`, data);
    return res;
  }
}
