import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="min-h-screen bg-beige-100">
      <main className="container mx-auto p-4">
        <ThemeSwitcher />
      </main>
    </div>
  );
}
