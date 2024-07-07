import { Inter } from "next/font/google";
import PhysicsSimulation from "@/components/PhysicsSimulation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col-reverse lg:flex-row h-screen items-center justify-center ${inter.className}`}
    >
      <PhysicsSimulation />
    </main>
  );
}
