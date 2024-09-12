import React, { createContext, useState } from 'react';

const PetShopContext = createContext();

export function PetShopProvider({ children }) {
  const [money, setMoney] = useState(1000);  // 初始化資金
  const [inventory, setInventory] = useState([]);  // 商品庫存

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