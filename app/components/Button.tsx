import { ComponentProps, ReactNode } from "react";
import { Flex, Button as ThemeButton } from "@radix-ui/themes";

type ButtonProps = ComponentProps<typeof ThemeButton>;

interface Props extends ButtonProps {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  loading = false,
  disabled = false,
  ...props
}: Props) {
  return (
    <ThemeButton disabled={loading || disabled} {...props}>
      <Flex direction={"row"} gap={"2"}>
        {loading && (
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        )}
        <Flex align={"center"} gapX={"2"}>
          {children}
        </Flex>
      </Flex>
    </ThemeButton>
  );
}
