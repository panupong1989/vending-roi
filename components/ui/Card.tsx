import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-card border border-border bg-card shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  icon: ReactNode;
  iconBg?: string;
  iconColor?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}

export function CardHeader({
  icon,
  iconBg = "bg-[#e8eef9]",
  iconColor = "text-primary",
  title,
  subtitle,
  right,
}: CardHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border px-4 pb-3 pt-4 md:px-5">
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="truncate font-prompt text-[14px] font-semibold text-primary">
          {title}
        </h2>
        {subtitle && (
          <p className="truncate text-[11px] text-muted">{subtitle}</p>
        )}
      </div>
      {right}
    </div>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`px-4 py-4 md:px-5 ${className}`}>{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
      <span className="text-[5px]">●</span>
      {children}
    </div>
  );
}
