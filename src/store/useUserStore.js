import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      me: null,
      setMe: (data) => {
        set({ me: data });
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
