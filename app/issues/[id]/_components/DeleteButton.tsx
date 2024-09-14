import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

export default function DeleteButton({ issueId }: { issueId: number }) {
  return (
    <Button color="red">
      <FaPencil />
      <Link href={`/issues/${issueId}/edit`}>Delete Issue</Link>
    </Button>
  );
}
