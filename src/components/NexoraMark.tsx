import React from "react";

interface NexoraMarkProps {
  size?: number;
  className?: string;
}

export default function NexoraMark({ size = 24, className }: NexoraMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0H25C28.866 0 32 3.13401 32 7V25C32 28.866 28.866 32 25 32H7C3.13401 32 0 28.866 0 25V7C0 3.13401 3.13401 0 7 0ZM10.5 9.5V22.5H13.3V13.8L18.7 22.5H21.5V9.5H18.7V18.2L13.3 9.5H10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
