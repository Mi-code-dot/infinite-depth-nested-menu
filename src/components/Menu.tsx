// src/components/Menu.tsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '../types/menu';
import { saveToStorage, loadFromStorage, addItem, renameItem, deleteItem } from '../utils/menuStorage';
import { defaultMenu } from '../utils/defaultData';

const Menu: React.FC = () => {
    const [menu, setMenu] = useState<MenuItemType[]>(loadFromStorage() || defaultMenu);
    console.log('menu', menu);

    useEffect(() => {
        saveToStorage(menu);
    }, [menu]);

    const handleAdd = (parentId: string | null) => {
        const newItem: MenuItemType = { id: uuidv4(), name: 'New Item', children: [] };
        const updatedMenu = addItem(menu, parentId, newItem);
        setMenu(updatedMenu);
    };

    const handleRename = (id: string, newName: string) => {
        const updatedMenu = renameItem(menu, id, newName);
        setMenu(updatedMenu);
    };

    const handleDelete = (id: string) => {
        const updatedMenu = deleteItem(menu, id);
        setMenu(updatedMenu);
    };

    return (
        <div>
            {menu.map((item) => (
                <MenuItem
                    key={item.id}
                    item={item}
                    onAdd={handleAdd}
                    onRename={handleRename}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default Menu;
