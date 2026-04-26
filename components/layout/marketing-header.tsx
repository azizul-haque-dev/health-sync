"use client";

import { useState } from "react";
import MobileMenu from "../public-components/MobileMenu";
import MobileBtn from "../public-components/mobile-btn";
import { authClient } from "@/lib/auth-client";
import DesktopCta from "../public-components/desktop-cta";
import { CircleUserRound } from "lucide-react";
export interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export function MarketingHeader({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  console.log(session, "marketing");
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {children}

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop CTAs */}
          {!session ? (
            <DesktopCta />
          ) : (
            <CircleUserRound className="hidden md:flex size-6" />
          )}

          {/* Mobile Hamburger Button */}
          <MobileBtn
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}
    </header>
  );
}
