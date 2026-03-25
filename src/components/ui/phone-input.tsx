"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const countryCodes = [
  { code: "+91", country: "IN", flag: "🇮🇳", maxLength: 10 },
  { code: "+1", country: "US", flag: "🇺🇸", maxLength: 10 },
  { code: "+44", country: "GB", flag: "🇬🇧", maxLength: 10 },
  { code: "+61", country: "AU", flag: "🇦🇺", maxLength: 9 },
  { code: "+49", country: "DE", flag: "🇩🇪", maxLength: 11 },
  { code: "+33", country: "FR", flag: "🇫🇷", maxLength: 9 },
  { code: "+81", country: "JP", flag: "🇯🇵", maxLength: 11 },
  { code: "+86", country: "CN", flag: "🇨🇳", maxLength: 11 },
  { code: "+971", country: "AE", flag: "🇦🇪", maxLength: 9 },
  { code: "+65", country: "SG", flag: "🇸🇬", maxLength: 8 },
  { code: "+55", country: "BR", flag: "🇧🇷", maxLength: 11 },
  { code: "+82", country: "KR", flag: "🇰🇷", maxLength: 11 },
  { code: "+39", country: "IT", flag: "🇮🇹", maxLength: 10 },
  { code: "+34", country: "ES", flag: "🇪🇸", maxLength: 9 },
  { code: "+7", country: "RU", flag: "🇷🇺", maxLength: 10 },
  { code: "+27", country: "ZA", flag: "🇿🇦", maxLength: 9 },
  { code: "+52", country: "MX", flag: "🇲🇽", maxLength: 10 },
  { code: "+60", country: "MY", flag: "🇲🇾", maxLength: 10 },
  { code: "+62", country: "ID", flag: "🇮🇩", maxLength: 12 },
  { code: "+66", country: "TH", flag: "🇹🇭", maxLength: 9 },
];

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  containerClassName?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, containerClassName, onChange, value: _value, ...props }, ref) => {
    const [selectedCode, setSelectedCode] = React.useState(countryCodes[0]);
    const [open, setOpen] = React.useState(false);
    const [phoneValue, setPhoneValue] = React.useState("");
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Clear value when country changes
    React.useEffect(() => {
      setPhoneValue("");
    }, [selectedCode]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "");
      const capped = digits.slice(0, selectedCode.maxLength);
      setPhoneValue(capped);
      if (onChange) {
        const syntheticEvent = { ...e, target: { ...e.target, value: capped } };
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div className={cn("relative flex", containerClassName)} ref={dropdownRef}>
        {/* Country code selector */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center gap-1 px-3 rounded-l-lg border border-r-0 text-sm shrink-0",
            "bg-white/5 border-white/10 text-stone-300 hover:bg-white/10 transition-colors",
            className?.includes("bg-white/5") ? "" : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
          )}
        >
          <span className="text-base leading-none">{selectedCode.flag}</span>
          <span className="text-xs font-medium">{selectedCode.code}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute top-full left-0 mt-1 z-50 w-52 max-h-60 overflow-y-auto rounded-lg border border-stone-700 bg-stone-900 shadow-lg">
            {countryCodes.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setSelectedCode(item);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2 text-sm text-left hover:bg-white/10 transition-colors",
                  selectedCode.code === item.code ? "bg-white/5 text-primary" : "text-stone-300"
                )}
              >
                <span className="text-base">{item.flag}</span>
                <span className="font-medium">{item.country}</span>
                <span className="text-stone-500 ml-auto">{item.code}</span>
              </button>
            ))}
          </div>
        )}

        {/* Phone number input */}
        <input
          type="tel"
          ref={ref}
          value={phoneValue}
          onChange={handlePhoneChange}
          maxLength={selectedCode.maxLength}
          placeholder={`${"0".repeat(selectedCode.maxLength)}`}
          className={cn(
            "flex h-10 w-full rounded-r-lg border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            "bg-white/5 border-white/10 text-white placeholder:text-stone-500 focus-visible:ring-primary/40 focus-visible:border-primary",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
