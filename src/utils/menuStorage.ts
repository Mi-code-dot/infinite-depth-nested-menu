/*
Utility functions for saving the menu state to 
and loading it from local storage.
*/
import { MenuItem } from '../types/menu';

export const saveToStorage = (menu: MenuItem[]) => {
    localStorage.setItem('menu', JSON.stringify(menu));
};

export const loadFromStorage = (): MenuItem[] | null => {
    const savedMenu = localStorage.getItem('menu');
    return savedMenu ? JSON.parse(savedMenu) : null;
};

// Recursively add new item
export const addItem = (menu: MenuItem[], parentId: string | null, newItem: MenuItem): MenuItem[] => {
    if (parentId === null) {
        return [...menu, newItem];
    }
    return menu.map(item => {
        if (item.id === parentId) {
            return { ...item, children: [...item.children, newItem] };
        }
        return { ...item, children: addItem(item.children, parentId, newItem) };
    });
};

// Recursively rename item
export const renameItem = (menu: MenuItem[], id: string, newName: string): MenuItem[] => {
    return menu.map(item => {
        if (item.id === id) {
            return { ...item, name: newName };
        }
        return { ...item, children: renameItem(item.children, id, newName) };
    });
};

// Recursively delete item
export const deleteItem = (menu: MenuItem[], id: string): MenuItem[] => {
    return menu
        .filter(item => item.id !== id)
        .map(item => ({ ...item, children: deleteItem(item.children, id) }));
};