import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
};

/**
 * 3D tilt wrapper — follows pointer on desktop, device orientation (gyroscope)
 * on touch devices. Hardware-accelerated via transform + spring damping.
 */
export function Tilt3D({ children, className = "", max = 10, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 22 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 22 });
  const gx = useTransform(mx, [-0.5, 0.5], ["10%", "90%"]);
  const gy = useTransform(my, [-0.5, 0.5], ["10%", "90%"]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (hasFinePointer) return;
    const handler = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      // beta: -180..180 (front-back), gamma: -90..90 (left-right)
      mx.set(Math.max(-0.5, Math.min(0.5, e.gamma / 45)));
      my.set(Math.max(-0.5, Math.min(0.5, (e.beta - 30) / 45)));
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      className={`tilt3d relative ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [gx, gy] as never,
              ([x, y]: string[]) => `radial-gradient(240px at ${x} ${y}, rgba(255,255,255,0.35), transparent 60%)`,
            ),
            mixBlendMode: "overlay",
          }}
        />
      )}
    </motion.div>
  );
}