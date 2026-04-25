import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import DesktopMenu from "@/components/public-components/DesktopMenu";
import { Logo } from "@/components/shared/logo";

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell min-h-screen">
      <MarketingHeader>
        <Logo />
        <DesktopMenu />
      </MarketingHeader>
      {children}
      <MarketingFooter />
    </div>
  );
}
