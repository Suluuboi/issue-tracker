"use client";
import Button from "@/app/components/form/Button";
import FormErrorMessage from "@/app/components/form/ErrorMessage";
import { IssueForm, issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiInfoCircle } from "react-icons/bi";
import SimpleMDE from "react-simplemde-editor";

export default function NewIssue() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
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
        <ErrorMessage />
        <TextField.Root placeholder="Title" {...register("title")} />

        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <FormErrorMessage>{errors.description?.message}</FormErrorMessage>

        <Button
          loading={isSubmitting}
          //disabled={errors.description || errors.title ? false : true}
        >
          Submit New Issue
        </Button>
      </form>
    </div>
  );

  function ErrorMessage() {
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

  async function onSubmit(data: IssueForm) {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured");
    }
  }
}
