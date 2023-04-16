import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';

/**
 * Component to manage the global state of the application
 */
export default function useGlobalStorage() {
  /**
   * Function to manage the state of the application
   * @param {string} key - Key to store the data
   * @param {any} initialData - Initial data to store
   * @returns {array} - Array with the data and the function to update the data
   */
  const useStorage = (key, initialData = {
    todoList: [], username: null
  }) => {
    const [data, setState] = useState(initialData);

    useEffect(() => {
      // Initial load of the data
      Preferences.get({ key }).then(lastData => {
        if (lastData.value) {
          let value = JSON.parse(lastData.value);
          setState(value);
        }
      });
    }, []);

    // Function to update the data
    const setData = async (newData) => {
      let newValue;
      if (typeof newData === 'function') {
        newValue = newData(data);
      } else {
        newValue = newData
      }
      setState(newValue);
      await Preferences.set({ key, value: JSON.stringify(newValue) });
    }

    return [data, setData];
  }
  return useStorage;
};