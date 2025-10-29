import React from "react";

type Props = {
  name: string;
  className?: string;
  ariaHidden?: boolean;
};

export default function Icon({ name, className = "w-5 h-5", ariaHidden = true }: Props) {
  const common = { className, "aria-hidden": ariaHidden } as any;

  switch (name) {
    case "menu":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "chevron-right":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "dashboard":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "user":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zM21 21a9 9 0 10-18 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "product":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M16 3v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "cart":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="20" r="1" fill="currentColor"/><circle cx="18" cy="20" r="1" fill="currentColor"/></svg>
      );
    case "list":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "inventory":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><rect x="7" y="4" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>
      );
    case "wallet":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1v22M17 5H7a4 4 0 100 8h10a4 4 0 010 8H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "report":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 3h6v6H9zM3 21V9h18v12H3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "cog":
    case "settings":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06c.36-.36.54-.86.33-1.82A1.65 1.65 0 014.6 9.6c-.36-.36-.86-.54-1.82-.33L2.72 9.33A2 2 0 015.55 6.5l.06.06c.36.36.86.54 1.82.33A1.65 1.65 0 019.75 6V5a2 2 0 014 0v.09c.17.63.63 1.13 1.2 1.51.96.21 1.46.03 1.82-.33l.06-.06A2 2 0 0119.45 6.5l-.06.06c-.36.36-.54.86-.33 1.82.28.57.88 1.03 1.51 1.2H19.4z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "close":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "eye":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "phone":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 013.08 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.12.86.38 1.7.77 2.5a2 2 0 01-.45 2.11L9.91 9.91a16 16 0 006 6l1.58-1.58a2 2 0 012.11-.45c.8.39 1.64.65 2.5.77A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "pencil":
    case "edit":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.232 5.232l3.536 3.536L8.536 18.999l-3.536.707.707-3.536L15.232 5.232z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "trash":
    case "delete":
      return (
        <svg {...common} viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 017.5 2h5A1.5 1.5 0 0114 3.5V4h3.5a.5.5 0 010 1H16v10.5A2.5 2.5 0 0113.5 18H6.5A2.5 2.5 0 014 15.5V5H1.5a.5.5 0 010-1H5v-.5zM8 7a1 1 0 10-2 0v7a1 1 0 102 0V7zm5-1a1 1 0 00-1 1v7a1 1 0 102 0V7a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
      );
    case "plus":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "calendar":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    case "bell":
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      );
    default:
      return <svg {...common} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" />;
  }
}
