import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "blue" | "green" }
> = {
  CLOSED: { color: "green", label: "Closed" },
  IN_PROGRESS: { color: "blue", label: "In Progress" },
  OPEN: { color: "red", label: "Open" },
};

export default function BadgeStatus({ status }: Props) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}
