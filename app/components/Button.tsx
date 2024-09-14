import { ReactNode } from "react";
import { Button as ThemeButton } from "@radix-ui/themes";

interface Props {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  loading = false,
  disabled = false,
}: Props) {
  return (
    <ThemeButton disabled={loading || disabled}>
      <>
        {loading && (
          <div
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
        )}
        <span>{children}</span>
      </>
    </ThemeButton>
  );
}
