
import { useState, useEffect } from 'react';
import { collection, query, getDocs, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function useFirebaseData<T = DocumentData>(collectionName: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        setData(documents);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        setLoading(false);
      }
    }

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
}
