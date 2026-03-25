import { cn } from '@/lib/utils';
import React from 'react';

type FeatureType = {
    title: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description: string;
    stat?: string;
    statLabel?: string;
};

type FeatureCardProps = React.ComponentProps<'div'> & {
    feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
    const p = genRandomPattern();

    return (
        <div className={cn('relative overflow-hidden p-6 md:p-8', className)} {...props}>
            <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="from-primary/5 to-primary/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
                    <GridPattern
                        width={20}
                        height={20}
                        x="-12"
                        y="4"
                        squares={p}
                        className="fill-primary/5 stroke-primary/15 absolute inset-0 h-full w-full mix-blend-overlay"
                    />
                </div>
            </div>
            <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <feature.icon className="text-primary size-6" strokeWidth={1.5} aria-hidden />
                </div>
                {feature.stat && (
                    <div className="text-right">
                        <div className="text-2xl md:text-3xl font-extrabold text-primary">{feature.stat}</div>
                        <div className="text-xs text-stone-400 mt-0.5">{feature.statLabel}</div>
                    </div>
                )}
            </div>
            <h3 className="text-base md:text-lg font-bold text-stone-900">{feature.title}</h3>
            <p className="text-stone-500 relative z-20 mt-2 text-sm leading-relaxed">{feature.description}</p>
        </div>
    );
}

function GridPattern({
    width,
    height,
    x,
    y,
    squares,
    ...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
    const patternId = React.useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([sx, sy], index) => (
                        <rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={sx * width} y={sy * height} />
                    ))}
                </svg>
            )}
        </svg>
    );
}

function genRandomPattern(length?: number): number[][] {
    length = length ?? 5;
    return Array.from({ length }, () => [
        Math.floor(Math.random() * 4) + 7,
        Math.floor(Math.random() * 6) + 1,
    ]);
}
