import { Status } from "@prisma/client";
import { z } from "zod";

const maxText = 65535;

const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(maxText),
  status: z.nativeEnum(Status).optional(),
});

const patchIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(maxText).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is requred.")
    .max(255)
    .optional()
    .nullable(),
  status: z.nativeEnum(Status).optional(),
});

export { issueSchema, patchIssueSchema };

export type CreateIssueForm = z.infer<typeof issueSchema>;
export type PatchIssueForm = z.infer<typeof patchIssueSchema>;
