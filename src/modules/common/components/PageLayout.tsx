import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow flex flex-col h-full w-full mx-auto">
        {children}
      </section>
      <Footer />
    </section>
  );
}
