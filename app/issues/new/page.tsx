"use client";
import FormErrorMessage from "@/app/components/FormErrorMessage";
import { IssueForm, issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
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

  return (
    <div>
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured");
          }
        })}
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

        <Button>Submit New Issue</Button>
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
}
