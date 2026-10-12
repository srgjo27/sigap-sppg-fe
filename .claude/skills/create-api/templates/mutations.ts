import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productKeys } from './keys';
import { createProduct } from './service';

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
}
