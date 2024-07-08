import { Inter } from "next/font/google";
import PhysicsSimulation from "@/components/PhysicsSimulation";
import Controls from "@/components/Controls";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col lg:flex-row h-screen items-center justify-center ${inter.className}`}
    >
      <PhysicsSimulation />
      <Controls />
    </main>
  );
}
