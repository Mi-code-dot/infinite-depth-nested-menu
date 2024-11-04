import { MenuItem } from '../types/menu';

export const saveToStorage = (menu: MenuItem[]) => {
    localStorage.setItem('menu', JSON.stringify(menu));
};

export const loadFromStorage = (): MenuItem[] | null => {
    const savedMenu = localStorage.getItem('menu');
    return savedMenu ? JSON.parse(savedMenu) : null;
};

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

export const renameItem = (menu: MenuItem[], id: string, newName: string): MenuItem[] => {
    return menu.map(item => {
        if (item.id === id) {
            return { ...item, name: newName };
        }
        return { ...item, children: renameItem(item.children, id, newName) };
    });
};

export const deleteItem = (menu: MenuItem[], id: string): MenuItem[] => {
    return menu
        .filter(item => item.id !== id)
        .map(item => ({ ...item, children: deleteItem(item.children, id) }));
};
