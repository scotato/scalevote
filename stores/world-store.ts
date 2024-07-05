import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import NPCs from "@/lib/npcs.json";
import worldTiles from "@/lib/tiles.json";
import { groupTilesByPosition, getConnectingTiles } from "@/lib/world";

export const useWorldStore = create<{
  players: CharacterTile[];
  npcs: CharacterTile[];
  messages: Message[];
  updatePlayer: (player: CharacterTile) => void;
  updateNPC: (npc: CharacterTile) => void;
  addMessage: (message: Message) => void;
  addMessages: (messages: Message[]) => void;
  reset: () => void;
}>()(
  devtools(
    persist(
      (set) => ({
        players: [
          {
            id: "beelzebub",
            name: "Beelzebub",
            type: "player",
            image: "/beelzebub.png",
            bio: "a weird little pink demon with a penchant for mischief and mayhem",
            locationId: "C1",
            messages: {},
            inventory: [],
            coins: 0,
          },
        ],
        npcs: NPCs,
        messages: [],
        updatePlayer: (player) =>
          set((state) => ({
            players: state.players.map((p) =>
              p.id === player.id ? player : p
            ),
          })),
        updateNPC: (npc) =>
          set((state) => ({
            npcs: state.npcs.map((n) => (n.id === npc.id ? npc : n)),
          })),
        addMessage: (message) =>
          set((state) => {
            return {
              messages: [...state.messages, message],
            };
          }),
        addMessages: (messages) =>
          set((state) => ({
            messages: [...state.messages, ...messages],
          })),
        reset: () =>
          set((state) => ({
            players: state.players.map((p) => ({
              ...p,
              locationId: "C1",
            })),
            messages: [],
          })),
      }),
      {
        name: "persistentDataStore",
        version: 1,
      }
    )
  )
);

export const useWorldTiles = () => {
  const [players, npcs] = useWorldStore((state) => [state.players, state.npcs]);
  return groupTilesByPosition([...players, ...npcs]);
};

export const usePlayer = () => {
  const [players, npcs, updatePlayer] = useWorldStore((state) => [
    state.players,
    state.npcs,
    state.updatePlayer,
  ]);
  const player = players[0];
  const currentTile = worldTiles.find((t) => t.id === player.locationId)!;
  const connectingTiles = getConnectingTiles(player.locationId);
  const tileData = [currentTile, ...connectingTiles].map((tile) => {
    const tilePlayers = players.filter((p) => p.locationId === tile.id);
    const tileNpcs = npcs.filter((n) => n.locationId === tile.id);
    return { ...tile, players: tilePlayers, npcs: tileNpcs };
  });
  const allowedPlayerMoves = connectingTiles.map(({ id, direction }) => ({
    id,
    direction,
  }));

  return { player, updatePlayer, tileData, allowedPlayerMoves };
};

export const useTilesByLocation = (locationId: string) => {
  const tiles = useWorldTiles();
  return tiles[locationId] || [];
};
