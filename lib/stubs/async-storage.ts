const AsyncStorage = {
  getItem: async () => null,
  setItem: async () => undefined,
  removeItem: async () => undefined,
  clear: async () => undefined,
  getAllKeys: async () => [] as string[],
  multiGet: async () => [] as [string, string | null][],
  multiSet: async () => undefined,
  multiRemove: async () => undefined,
};

export default AsyncStorage;
