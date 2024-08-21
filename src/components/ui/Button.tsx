import { cva, VariantProps } from "class-variance-authority";
import { AriaRole } from "react";

const styles = cva("text-gray-500 dark:text-gray-50 rounded-lg", {
  variants: {
    fullWidth: {
      true: "w-full",
    },
    intent: {
      primary: "bg-indigo-500 hover:bg-blue-600 text-white",
      secondary: "bg-gray-500 hover:bg-gray-600",
      warning: "bg-yellow-500 hover:bg-yellow-600",
      danger: "bg-red-500 hover:bg-red-600",
      link: "bg-transparent hover:bg-transparent",
      info: "bg-blue-500 hover:bg-blue-600",
    },
    size: {
      sm: "py-1 px-2 text-sm",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-lg",
    }
  },
  defaultVariants: {
    fullWidth: false,
    intent: "primary",
    size: "md",
  },
});

interface Props extends BaseProps, VariantProps<typeof styles> {
  onClick?: () => void;
  role?: AriaRole | undefined;
}

export default function Button({
  fullWidth,
  intent,
  size,
  role,
  onClick,
  ...props
}: Props) {
  return <button
    onClick={onClick}
    className={styles({ fullWidth, intent, size })}
    {...props}
  />;
}
