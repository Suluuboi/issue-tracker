"use client";
import { Card, Heading } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  clossed: number;
}

export default function IssueChart({ clossed, inProgress, open }: Props) {
  const data = [
    { label: "Open", value: open },

    { label: "In Progress", value: inProgress },
    { label: "Closed", value: clossed },
  ];

  return (
    <Card>
      <Heading className="mb-5">Statistics</Heading>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Bar
            dataKey={"value"}
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
