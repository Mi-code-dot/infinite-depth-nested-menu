import React, { useState } from 'react';
import { MenuItem as MenuItemType } from '../types/menu';

interface MenuItemProps {
    item: MenuItemType;
    onAdd: (parentId: string | null) => void;
    onRename: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd, onRename, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(item.name);

    const handleRename = () => {
        onRename(item.id, newName);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onBlur={handleRename}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={() => setIsEditing(true)}>{item.name}</span>
            )}
            <button onClick={() => onAdd(item.id)}>Add Submenu</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
            <div>
                {item.children.map((child) => (
                    <MenuItem
                        key={child.id}
                        item={child}
                        onAdd={onAdd}
                        onRename={onRename}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default MenuItem;


