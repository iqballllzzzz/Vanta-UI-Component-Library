import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useCallback, type ReactNode, type KeyboardEvent, type MouseEvent } from "react";

type Props = {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, unknown>;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

// Card-shaped link that avoids nested <a> hydration errors when the inner
// content (Preview demos) contains its own anchor tags. Renders a div with
// role="link" + keyboard handlers, plus a visually-hidden real <Link> so the
// destination is still crawlable and preloadable.
export function CardLink({ to, params, search, className = "", ariaLabel, children }: Props) {
  const navigate = useNavigate();
  const router = useRouter();

  const go = useCallback(
    (e?: MouseEvent | KeyboardEvent) => {
      if (e && "button" in e && (e.button === 1 || e.metaKey || e.ctrlKey || e.shiftKey)) return;
      e?.preventDefault();
      // @ts-expect-error — runtime-typed navigation, params optional
      navigate({ to, params, search });
    },
    [navigate, to, params, search],
  );

  const preload = useCallback(() => {
    try {
      // @ts-expect-error — runtime-typed preload
      router.preloadRoute({ to, params, search });
    } catch {}
  }, [router, to, params, search]);

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={go}
      onMouseEnter={preload}
      onFocus={preload}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") go(e);
      }}
      className={`cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl ${className}`}
    >
      {children}
      {/* SEO + middle-click + right-click "open in new tab" */}
      <Link
        // @ts-expect-error — runtime-typed link
        to={to}
        params={params}
        search={search}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        {ariaLabel ?? "View"}
      </Link>
    </div>
  );
}