

export function saveToStorage <T> (name:string, data:T)  {
    if (!window || !window.localStorage) {
      return;
    }

  window.localStorage.setItem(name, JSON.stringify(data));
  };
  
  export const getFromStorage = (name:string) => {
    if (!window || !window.localStorage) {
      return null;
    }

  try {
    const data=window.localStorage.getItem(name)||"";
      return JSON.parse(data);
    } catch (e) {
    console.error(e);

  return null;
    }
  };

  export const removeFromStorage=(name:string)=>{
    if (!window || !window.localStorage) {
      return null;
    }
  localStorage.removeItem(name);

  }