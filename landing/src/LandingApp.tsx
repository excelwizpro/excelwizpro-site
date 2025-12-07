import { Hero } from "./sections/Hero";
import { Highlights } from "./sections/Highlights";
import { Footer } from "./sections/Footer";

export function LandingApp() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6">
        <Hero />
        <Highlights />
        <Footer />
      </div>
    </div>
  );
}
