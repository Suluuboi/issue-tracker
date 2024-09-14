"use client";
import { Button, ErrorMessage } from "@/app/components";
import {
  IssueForm as IssueFormInterface,
  issueSchema,
} from "@/app/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiInfoCircle } from "react-icons/bi";
import SimpleMDE from "react-simplemde-editor";

export default function IssueForm({ issue }: { issue?: Issue }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormInterface>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <div>
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => await onSubmit(data))}
      >
        <ErrorMessageTop />
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button
          loading={isSubmitting}
          //disabled={errors.description || errors.title ? false : true}
        >
          {issue ? "Edit Issue" : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );

  function ErrorMessageTop() {
    return (
      <>
        {error && (
          <Callout.Root>
            <Callout.Icon>
              <BiInfoCircle />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
      </>
    );
  }

  async function onSubmit(data: IssueFormInterface) {
    try {
      setSubmitting(true);

      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured");
    }
  }
}
