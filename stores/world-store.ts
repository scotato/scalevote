import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useWorldStore = create<{
  users: User[];
  updateUser: (user: User) => void;
  addUser: (side?: "left" | "right") => void;
  reset: () => void;
}>()(
  devtools(
    persist(
      (set) => ({
        users: [],
        updateUser: (user) =>
          set((state) => ({
            users: state.users.map((u) => (u.id === user.id ? user : u)),
          })),
        addUser(side) {
          set((state) => ({
            users: [...state.users, createMockUser(state.users.length, side)],
          }));
        },
        reset: () =>
          set((state) => ({
            users: [],
          })),
      }),
      {
        name: "persistentDataStore",
        version: 1,
      }
    )
  )
);

function createMockUser(id: number, side?: "left" | "right") {
  return {
    id,
    avatar: `https://api.dicebear.com/9.x/big-smile/svg?seed=${id}`,
    size: Math.floor(Math.random() * 20) + 20,
    side: side || (id % 2 === 0 ? "left" : "right"),
    color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`,
  };
}
