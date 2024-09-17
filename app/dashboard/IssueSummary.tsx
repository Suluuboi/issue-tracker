import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  clossed: number;
}

export default function IssueSummary({ clossed, inProgress, open }: Props) {
  const containers: StatusLink[] = [
    { label: "Open", value: open, status: "OPEN" },
    { label: "Closed", value: clossed, status: "CLOSED" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
  ];
  return (
    <Flex gap={"4"}>
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction={"column"} p={"2"}>
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size={"5"} className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

interface StatusLink {
  label: string;
  value: number;
  status: Status;
}
