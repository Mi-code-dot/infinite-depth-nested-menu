/*
A component that renders a context menu at a specified location 
when the user right-clicks on a menu item. 
The menu provides options to add, rename, and delete items.
*/
import React from 'react';
import styles from './contextMenu.module.scss';

interface ContextMenuProps {
    positionX: number;
    positionY: number;
    closeMenu: () => void;
    onAdd: () => void;
    onRename: () => void;
    onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ positionX, positionY, closeMenu, onAdd, onRename, onDelete }) => {


    return (
        <div
            className={styles.contextMenu}
            style={{ top: positionY, left: positionX }}
            onClick={(e) => e.stopPropagation()}
        >
            <button className={styles.button} onClick={() => { onAdd(); closeMenu(); }}>
                Add Submenu
            </button>
            <button className={styles.button} onClick={() => { onRename(); closeMenu(); }}>
                Rename Item
            </button>
            <button className={styles.button} onClick={() => { onDelete(); closeMenu(); }}>
                Delete Item
            </button>
        </div>
    );
};

export default ContextMenu;
