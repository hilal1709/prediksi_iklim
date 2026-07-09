export default function Logout({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`rotate-180 ${className}`}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      >
        <path d="M12 20a8 8 0 1 0 0-16"></path>
        <path strokeLinejoin="round" d="M4 12h10m0 0l-3-3m3 3l-3 3"></path>
      </g>
    </svg>
  );
}
