import { useEffect } from 'react';

import { APP_NAME } from '@/constants/config';

/** Sets `document.title` to "<title> | <APP_NAME>" while the component is mounted. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
  }, [title]);
}
