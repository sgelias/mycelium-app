import { cva, VariantProps } from "class-variance-authority";

const styles = cva("text-gray-500 dark:text-gray-50", {
  variants: {
    as: {
      p: "py-1 text-gray-700 dark:text-gray-200",
      span: "text-gray-700 dark:text-gray-200",
      title: "text-5xl font-bold",
      h1: "text-3xl font-bold",
      h2: "text-2xl font-bold",
      h3: "text-xl font-bold",
      h4: "text-lg font-bold",
    },
    margin: {
      none: "",
      xs: "m-1",
      sm: "m-2",
      md: "m-4",
      lg: "m-8",
      xl: "m-16",
    },
    padding: {
      none: "",
      xs: "px-1 py-1",
      sm: "px-2 py-2",
      md: "px-4 py-4",
      lg: "px-8 py-8",
      xl: "px-16 py-16",
    },
    reverseBackground: {
      true: "!text-gray-100 !dark:text-gray-200",
    },
  },
  defaultVariants: {
    as: "p",
    margin: "none",
    padding: "none",
    reverseBackground: false,
  },
});

interface Props extends BaseProps, VariantProps<typeof styles> { }

export default function Typography({
  as, margin, padding, reverseBackground, ...props
}: Props) {
  const Element = (as === "title" ? "h1" : as) || "p";

  return (
    <Element
      className={styles({ as, margin, padding, reverseBackground })}
      {...props}
    />
  );
}
