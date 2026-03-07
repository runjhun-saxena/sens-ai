import Header from "@/components/header";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-25">{children}</main>
    </>
  );
}