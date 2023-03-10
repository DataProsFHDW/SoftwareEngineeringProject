import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';

export default function useGlobalStorage() {
  const useStorage = (key, initialData) => {
    const [data, setState] = useState(initialData);

    useEffect(() => {
      function handleStorageChange(data) {
        setState(data);
      }
      Preferences.get({ key }).then(lastData => {
        if (lastData.value) {
          setState(lastData.value);
          console.log("Retrieving from storage");
        }
      });

      /*const subscription = storage.subscribe(key, handleStorageChange);
      return () => {
        subscription.unsubscribe();
      };*/
    }, []);
    const setData = async (newData) => {
      let newValue;
      if (typeof newData === 'function') {
        newValue = newData(data);
      } else {
        newValue = newData
      }
      setState(newValue);
      await Preferences.set({ key, value: newValue });
      console.log("Saved Storage");
    }

    return [data, setData];
  }
  return useStorage;
};