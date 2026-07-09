"use client";

import React, { useState } from "react";

interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  [key: string]: any;
}

interface AccordionItemProps {
  children: React.ReactNode;
  value?: string;
  className?: string;
  [key: string]: any;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  toggleOpen?: () => void;
  [key: string]: any;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  [key: string]: any;
}

export function Accordion({ children, type = "single", collapsible = false, className = "", ...props }: AccordionProps) {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function AccordionItem({ children, value, className = "", ...props }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`rounded-lg ${className}`} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { isOpen, toggleOpen });
        }
        return child;
      })}
    </div>
  );
}

export function AccordionTrigger({ children, className = "", isOpen, toggleOpen, ...props }: AccordionTriggerProps) {
  return (
    <button
      className={`flex w-full items-center justify-between p-4 text-left font-medium hover:bg-gray-50 ${className}`}
      onClick={toggleOpen}
      {...props}
    >
      {children}
      <svg
        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function AccordionContent({ children, className = "", isOpen, ...props }: AccordionContentProps) {
  if (!isOpen) return null;

  return (
    <div className={`px-4 pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}