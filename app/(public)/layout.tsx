import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell min-h-screen">
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </div>
  );
}
