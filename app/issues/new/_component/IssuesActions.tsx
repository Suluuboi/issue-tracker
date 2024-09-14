import { Button } from "@/app/components";
import Link from "next/link";

export default function IssuesActions() {
  return (
    <div className="mb-5">
      <Button>
        <Link href={"/issues/new"}>New Issue</Link>
      </Button>
    </div>
  );
}
