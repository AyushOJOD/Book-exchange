import Link from "next/link";
import { cn } from "../utils/cn";

const sizes = {
  sm: "border px-4 py-2",
  md: "border px-5 py-2",
  lg: "border px-6 py-3",
};
const variants = {
  t1: "border-gray-800 bg-black text-white rounded-2xl",
  t2: "border-gray-200 bg-gray-50 text-black rounded-2xl",
};

export default function CustomButton({
  type = "button",
  disabled = false,
  className="",
  children,
  onClick = () => {},
  href = "",
  variant = "t1",
  size = "md",
}) {
  const buttonClasses = cn(
    variants[variant],
    sizes[size],
    className
  );

  if (href !== "") {
    return (
      <Link href={href} className={cn(buttonClasses, className)}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(buttonClasses, className)}
    >
      {children}
    </button>
  );
}
