import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

export default function EditButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <FaPencil />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
}
