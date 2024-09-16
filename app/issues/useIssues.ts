import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function useIssues() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const issuesMutation = useMutation<Issue[], Error, null>({
    mutationFn: getIssues,
    onSuccess: async (issues) => {
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
  return { getIssues: issuesMutation.mutate, loading, issues, error };

  function getIssues() {
    return prisma.issue.findMany({ orderBy: { id: "asc" } });
  }
}
