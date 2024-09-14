import { cva, VariantProps } from "class-variance-authority";

const styles = cva("container mx-auto py-4 h-[92vh]", {
  variants: {
    flex: {
      true: "flex",
      column: "flex flex-col"
    },
    gap: {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5"
    },
  },
  defaultVariants: {
    flex: false
  }
});

interface ScreenContainerProps extends BaseProps, VariantProps<typeof styles> { }

export default function PageBody({ children, flex, gap, ...props }: ScreenContainerProps) {
  return (
    <div className={styles({ flex, gap })} {...props}>
      {children}
    </div>
  );
}
