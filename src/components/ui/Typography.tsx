import { cva, VariantProps } from "class-variance-authority";

const styles = cva("text-gray-500 dark:text-gray-50", {
  variants: {
    as: {
      p: "px-3 py-1 text-gray-700 dark:text-gray-200",
      span: "text-gray-700 dark:text-gray-200",
      h1: "text-3xl font-bold",
      h2: "text-2xl font-bold",
      h3: "text-xl font-bold",
      h4: "text-lg font-bold",
    },
    reverseBackground: {
      true: "text-gray-300 dark:text-gray-200",
    },
  },
  defaultVariants: {
    as: "p",
    reverseBackground: false,
  },
});

interface Props extends BaseProps, VariantProps<typeof styles> { }

export default function Typography({ as, reverseBackground, ...props }: Props) {
  const Element = as || "p";
  return <Element className={styles({ as, reverseBackground })} {...props} />;
}
