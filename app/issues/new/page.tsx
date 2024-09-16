import dynamic from "next/dynamic";
import LoadingNew from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingNew />,
});

export default function NewIssue() {
  return <IssueForm />;
}
