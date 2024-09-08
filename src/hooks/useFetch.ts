import { useState, useEffect } from "react";

export const useFetch = async (url?: string, cacheKey?: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        try {
          const response = await fetch(url, {
            next: {
              tags: [cacheKey || "global"],
              revalidate: 3600,
            },
          });

          const result = await response.json();
          setData(result);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [url, cacheKey]);

  return { data, loading, error };
};
