"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { type LucideIcon, Phone, Mail } from "lucide-react";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon?: LucideIcon;
  flag?: string;
  label: string;
  value: string;
  phone?: string;
  email?: string;
  bgImage?: string;
};

type ContactCardProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = "Contact With Us",
  description = "If you have any questions regarding our services, please fill out the form here.",
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        "bg-dark border border-white/10 rounded-xl relative grid h-full w-full shadow-lg md:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="text-stone-400 text-sm md:text-base lg:text-lg leading-relaxed">
            {description}
          </p>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-4">
            {contactInfo?.map((info, index) => (
              <ContactInfo
                key={index}
                {...info}
                className={
                  contactInfo.length % 2 !== 0 && index === contactInfo.length - 1
                    ? "sm:col-span-2 xl:col-span-1"
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "bg-white/5 flex h-full w-full items-center border-t border-white/10 p-5 md:col-span-1 md:border-t-0 md:border-l",
          formSectionClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  flag,
  label,
  value,
  phone,
  email,
  bgImage,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn("group relative flex flex-col gap-2.5 py-4 px-3 rounded-lg bg-white/5 border border-white/5 overflow-hidden min-h-[220px]", className)} {...props}>
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 opacity-20 group-hover:opacity-60"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-black/50 transition-opacity duration-500 group-hover:bg-black/30" />
        </>
      )}
      <div className="relative z-10 flex items-center gap-2.5">
        {flag ? (
          <span className="text-2xl leading-none flex-shrink-0">{flag}</span>
        ) : Icon ? (
          <div className="bg-primary/15 rounded-lg p-2 flex-shrink-0">
            <Icon className="h-4 w-4 text-primary-light" />
          </div>
        ) : null}
        <p className="font-semibold text-white text-sm">{label}</p>
      </div>
      <p className="relative z-10 text-stone-400 group-hover:text-stone-300 text-xs leading-relaxed transition-colors duration-500">{value}</p>
      {(phone || email) && (
        <div className="relative z-10 flex flex-col gap-1.5 pt-2 mt-auto border-t border-white/10">
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-stone-300 text-xs text-white/90">
              <Phone className="w-3 h-3 flex-shrink-0" />
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-stone-300 text-xs text-white/90">
              <Mail className="w-3 h-3 flex-shrink-0" />
              {email}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
