/** Query key factory. Never write auth query keys manually elsewhere. */
export const authKeys = {
  all: ['auth'] as const,
  /** Current signed-in user (reserved for a future current-user query). */
  me: () => [...authKeys.all, 'me'] as const,
};
