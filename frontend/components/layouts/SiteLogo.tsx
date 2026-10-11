import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  href?: string | null;
  compact?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function SiteLogo({
  href,
  compact = false,
  className = "",
  ariaLabel,
}: SiteLogoProps) {
  const width = compact ? 40 : 40;
  const height = compact ? 40 : 40;

  const logo = (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/Logo.png"
        alt="SathiGig logo"
        width={width}
        height={height}
        priority
        className="h-auto w-auto object-contain"
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel ?? "SathiGig homepage"}>
        {logo}
      </Link>
    );
  }

  return logo;
}
