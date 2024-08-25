import { cva, VariantProps } from "class-variance-authority";

// ? ---------------------------------------------------------------------------
// ? Card Container
// ? ---------------------------------------------------------------------------

const cardContainerStyles = cva("border-2 dark:border-indigo-900 shadow rounded-lg text-gray-500 bg-white dark:bg-slate-800", {
  variants: {
    height: {
      full: "h-full",
      min: "h-min",
      max: "h-max"
    },
    padding: {
      none: "p-0",
      xs: "p-1",
      sm: "p-2",
      md: "p-5",
      lg: "p-8",
      xl: "p-10",
      "2xl": "p-16",
    },
  },
  defaultVariants: {
    height: "full",
    padding: "md"
  }
});

interface CardContainerProps extends BaseProps, VariantProps<typeof cardContainerStyles> { }

function CardContainer({ height, padding, ...props }: CardContainerProps) {
  return <div className={cardContainerStyles({ height, padding })} {...props} />;
}

// ? ---------------------------------------------------------------------------
// ? Header Container
// ? ---------------------------------------------------------------------------

const headerStyles = cva("text-xl text-gray-800 dark:text-gray-100 py-3", {
  variants: {}
});

interface CardProps extends BaseProps, VariantProps<typeof headerStyles> { }

function Header({ ...props }: CardProps) {
  return <div className={headerStyles({})} {...props} />;
}

// ? ---------------------------------------------------------------------------
// ? Body Container
// ? ---------------------------------------------------------------------------

const bodyStyles = cva("py-2 text-gray-700 dark:text-gray-300 h-[95%]", {
  variants: {
    flex: {
      col: "flex flex-col",
      row: "flex flex-row",
      none: ""
    },
    gap: {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      8: "gap-8",
      16: "gap-16",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around"
    },
  },
  defaultVariants: {
    flex: "none"
  }
});

interface CardProps extends BaseProps, VariantProps<typeof bodyStyles> { }

function Body({ flex, gap, justify, ...props }: CardProps) {
  return <div className={bodyStyles({ flex, gap, justify })} {...props} />;
}

// ? ---------------------------------------------------------------------------
// ? Composite Container
// ? ---------------------------------------------------------------------------

const Card = Object.assign(CardContainer, { Header, Body });

export default Card;
