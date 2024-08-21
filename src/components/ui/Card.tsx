import { cva, VariantProps } from "class-variance-authority";

// ? ---------------------------------------------------------------------------
// ? Card Container
// ? ---------------------------------------------------------------------------

const cardContainerStyles = cva("p-5 border-2 dark:border-indigo-900 shadow rounded-lg text-gray-500 bg-gray-100 dark:bg-neutral-800", {
  variants: {},
  defaultVariants: {}
});

interface CardContainerProps extends BaseProps, VariantProps<typeof cardContainerStyles> { }

function CardContainer({ ...props }: CardContainerProps) {
  return <div className={cardContainerStyles({})} {...props} />;
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

const bodyStyles = cva("py-2 text-gray-700 dark:text-gray-300", {
  variants: {}
});

interface CardProps extends BaseProps, VariantProps<typeof bodyStyles> { }

function Body({ ...props }: CardProps) {
  return <div className={bodyStyles({})} {...props} />;
}

// ? ---------------------------------------------------------------------------
// ? Composite Container
// ? ---------------------------------------------------------------------------

const Card = Object.assign(CardContainer, { Header, Body });

export default Card;
