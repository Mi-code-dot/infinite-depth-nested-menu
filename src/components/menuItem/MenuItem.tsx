/*
A recursive component that represents each menu item. 
It contains logic for expanding, renaming, and rendering nested submenus.
*/

import React, { useEffect, useRef, useState } from 'react';
import { MenuItem as MenuItemType } from '../../types/menu';
import { ChevronDown } from '@wix/wix-ui-icons-common';
import { ChevronUp } from '@wix/wix-ui-icons-common';
import styles from './MenuItem.module.scss';

interface MenuItemProps {
    item: MenuItemType;
    onAdd: (parentId: string) => void;
    onRename: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
    openContextMenu: (x: number, y: number, itemId: string) => void;
    isRenameActive: string | null; // Pass down the ID of the item to rename
    setRenameActive: (id: string | null) => void; // Function to update the rename active state
    expandedItems: Set<string>;
    toggleExpand: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
    item,
    onAdd,
    onRename,
    onDelete,
    openContextMenu,
    isRenameActive,
    setRenameActive,
    expandedItems,
    toggleExpand
}) => {
    const isExpanded = expandedItems?.has(item.id); // Check if this item is expanded
    const [tempName, setTempName] = useState<string>(item.name); // Temporary name during editing
    const inputRef = useRef<HTMLInputElement>(null);

    const handleRightClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        openContextMenu(event.pageX, event.pageY, item.id)
    };

    // Rename completion handler
    const handleRename = () => {
        if (isRenameActive === item.id) {
            onRename(item.id, tempName);
            setRenameActive(null); // Exit edit mode after renaming
        }
    };

    // Finalize rename on blur
    const handleBlur = () => handleRename();

    // Rename with Enter key or cancel with Escape
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleRename();
        } else if (event.key === 'Escape') {
            setTempName(item.name); // Reset the name on escape
            setRenameActive(null);
        }
    };

    // Temporary name during renaming
    const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempName(e.target.value);
    };

    // Close submenu when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
    //             // setIsExpanded(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    // Focus input when in edit mode
    useEffect(() => {
        if (isRenameActive === item.id) {
            // Auto-focus the input field when entering edit mode
            inputRef.current?.focus();
        }
    }, [isRenameActive, item.id]);

    return (
        <div
            className={styles.menuItem}
            onContextMenu={(e) => {
                handleRightClick(e)
            }}
        >
            <div className={styles.menuItemLabel} onClick={() => toggleExpand(item.id)}>
                {isRenameActive === item.id ? (
                    <input
                        ref={inputRef}
                        id={`rename-input-${item.id}`}
                        type="text"
                        value={tempName}
                        onChange={handleRenameChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <span>{item.name}</span>
                )}
                {item.children.length > 0 && (
                    isExpanded ? <ChevronUp /> : <ChevronDown />
                )}
            </div>
            {isExpanded && item.children.length > 0 && (
                <div className={styles.submenu}>
                    {item.children.map(child => (
                        <MenuItem
                            key={child.id}
                            item={child}
                            onAdd={onAdd}
                            onRename={onRename}
                            onDelete={onDelete}
                            openContextMenu={openContextMenu}
                            isRenameActive={isRenameActive}
                            setRenameActive={setRenameActive}
                            expandedItems={expandedItems}
                            toggleExpand={toggleExpand}
                        />
                    ))}
                </div>
            )}
        </div>
    )
};

export default MenuItem;