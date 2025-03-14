import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Waving Forest" },
    { name: "description", content: "Welcome to Waving Forest" },
  ];
};

export default function Index() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center w-full">
        {/* SVG version for best quality on modern browsers */}
        <div className="w-full max-w-[90vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] xl:max-w-[1200px] transition-all duration-300">
          <img 
            src="/flyer.svg" 
            alt="Sunday Wellness Sanctuary"
            className="w-full h-auto shadow-lg rounded-lg"
            loading="eager"
            decoding="async"
            role="img"
          />
        </div>
      </div>
    </main>
  );
}
