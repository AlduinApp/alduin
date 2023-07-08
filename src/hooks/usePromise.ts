import { useEffect, useState } from 'react';

export default function usePromise<T>(promise: Promise<T>) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    promise
      .then((value) => setValue(value))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [promise]);

  return { loading, error, value };
}
