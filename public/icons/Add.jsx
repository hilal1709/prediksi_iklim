export default function Add({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <g fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx={12} cy={12} r={10}></circle>
        <path strokeLinecap="round" d="M15 12h-3m0 0H9m3 0V9m0 3v3"></path>
      </g>
    </svg>
  );
}
