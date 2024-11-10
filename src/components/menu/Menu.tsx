import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MenuItem from '../menuItem/MenuItem';
import { MenuItem as MenuItemType } from '../../types/menu';
import { saveToStorage, loadFromStorage, addItem, renameItem, deleteItem } from '../../utils/menuStorage';
import { defaultMenu } from '../../utils/defaultData';
import styles from './Menu.module.scss';
import ContextMenu from '../contextMenu/ContextMenu';

const Menu: React.FC = () => {
    // State to manage menu structure, context menu, selected item, and expansion states
    const [menu, setMenu] = useState<MenuItemType[]>(loadFromStorage() || defaultMenu);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, itemId: string } | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [renameActive, setRenameActive] = useState<string | null>(null);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const contextMenuRef = useRef<HTMLDivElement>(null);

    // Persist menu structure in local storage
    useEffect(() => {
        saveToStorage(menu);
    }, [menu]);

    // Close context menu on clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
                closeContextMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle the expand/collapse for menu items
    const toggleExpand = (itemId: string) => {
        setExpandedItems(prev => {
            const newExpanded = new Set(prev);
            newExpanded.has(itemId) ? newExpanded.delete(itemId) : newExpanded.add(itemId);
            return newExpanded;
        });
    };

    // Handle adding a new submenu item
    const handleAdd = () => {
        if (selectedItemId) {
            const newItem = { id: uuidv4(), name: 'New Item', children: [] };
            setMenu(prevMenu => addItem(prevMenu, selectedItemId, newItem));
        }
        closeContextMenu();
    };

    // Enable rename mode for an item
    const handleRename = () => {
        if (selectedItemId) setRenameActive(selectedItemId);// Set the item to be renamed in edit mode
        closeContextMenu();
    }

    // Commit renaming changes for an item
    const handleRenameComplete = (id: string, newName: string) => {
        setMenu(prevMenu => renameItem(prevMenu, id, newName));
    };

    // Delete item and its children recursively
    const handleDelete = (id: string) => {
        setMenu(prevMenu => deleteItem(prevMenu, id));
        closeContextMenu();
    };

    // Open context menu at specified position
    const openContextMenu = (x: number, y: number, itemId: string) => {
        setContextMenu({ x, y, itemId });
        setSelectedItemId(itemId);
    };

    // Close the context menu
    const closeContextMenu = () => {
        setContextMenu(null);
        setSelectedItemId(null);
    }

    return (
        <div className={styles.menuContainer}>
            <div className={styles.menuTitle}>Menu</div>
            {menu.map((item) => (
                <MenuItem
                    key={item.id}
                    item={item}
                    onAdd={handleAdd}
                    onRename={handleRenameComplete}
                    onDelete={handleDelete}
                    openContextMenu={openContextMenu}
                    isRenameActive={renameActive}
                    setRenameActive={setRenameActive}
                    expandedItems={expandedItems}
                    toggleExpand={toggleExpand}
                />
            ))}
            {contextMenu && (
                <div ref={contextMenuRef}>
                    <ContextMenu
                        positionX={contextMenu.x}
                        positionY={contextMenu.y}
                        closeMenu={closeContextMenu}
                        onAdd={handleAdd}
                        onRename={handleRename}
                        onDelete={() => handleDelete(contextMenu.itemId)}
                    />
                </div>
            )}
        </div>

    );
};
export default Menu;
