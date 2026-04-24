export default function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#f6f7f8]">{children}</div>;
}
