import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayout({ children }: { children: React.ReactNode; }) {


  return (
    <main className="min-h-screen">

      <div className="relative h-14 z-20">
        <TopMenu />
      </div>

      <SideBar />
      <div className="px-0 sm:px-10">

        {children}
      </div>
      <Footer />
    </main>
  );
}