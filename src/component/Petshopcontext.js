import React, { createContext, useState } from 'react';

const PetShopContext = createContext();

export function PetShopProvider({ children }) {
  const [money, setMoney] = useState(1000);  
  const [inventory, setInventory] = useState([]);  

  const value = {
    money,
    setMoney,
    inventory,
    setInventory,
  };

  return (
    <PetShopContext.Provider value={value}>
      {children}
    </PetShopContext.Provider>
  );
}

export default PetShopContext;