import { useState } from 'react';

export const useSelection = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const selectAll = (items) => {
    setSelectedItems(items.map((item) => item.id));
  };

  const deselectAll = () => {
    setSelectedItems([]);
  };

  const toggleSelectAll = (e, items) => {
    if (e.target.checked) {
      selectAll(items);
    } else {
      deselectAll();
    }
  };

  const toggleItem = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const isAllSelected = (items) => {
    return selectedItems.length === items.length && items.length > 0;
  };

  return {
    selectedItems,
    selectAll,
    deselectAll,
    toggleSelectAll,
    toggleItem,
    isAllSelected,
    setSelectedItems,
  };
};
