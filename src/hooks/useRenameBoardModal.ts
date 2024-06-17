import { create } from "zustand";

type RenameModalI = {
  isOpen: boolean;
  values: { id: string; title: string };
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
};

const useRenameBoardModal = create<RenameModalI>((set) => ({
  isOpen: false,
  onOpen: (id, title) => set({ isOpen: true, values: { id, title } }),
  onClose: () => set({ isOpen: false, values: { id: "", title: "" } }),
  values: { id: "", title: "" },
}));

export default useRenameBoardModal;
