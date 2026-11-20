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
        d="M6.8 23.6L9.6 13.8C10.6 10.2 11.4 8.4 13.2 8.4C15.2 8.4 16.0 10.8 16.0 16.0C16.0 21.2 16.8 23.6 18.8 23.6C20.6 23.6 21.4 21.8 22.4 18.2L25.2 8.4"
        stroke="currentColor"
        strokeWidth="4.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
