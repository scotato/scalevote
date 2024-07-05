import { Inter } from "next/font/google";
import PhysicsSimulation from "@/components/PhysicsSimulation";
import Chat from "@/components/Chat";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col-reverse lg:flex-row h-screen items-center justify-center p-4 gap-4 lg:p-12 lg:gap-12 ${inter.className}`}
    >
      {/* <Chat /> */}
      <PhysicsSimulation />
    </main>
  );
}
