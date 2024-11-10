import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContextMenu from './ContextMenu';
import '@testing-library/jest-dom/extend-expect';

describe('ContextMenu Component', () => {
    const mockFunctions = {
        onAdd: jest.fn(),
        onRename: jest.fn(),
        onDelete: jest.fn(),
        closeMenu: jest.fn()
    };

    test('renders context menu with actions', () => {
        render(
            <ContextMenu
                onAdd={mockFunctions.onAdd}
                onRename={mockFunctions.onRename}
                onDelete={mockFunctions.onDelete}
                closeMenu={mockFunctions.closeMenu}
                positionX={100}
                positionY={100}
            />
        );

        expect(screen.getByText('Add Submenu')).toBeInTheDocument();
        expect(screen.getByText('Rename Item')).toBeInTheDocument();
        expect(screen.getByText('Delete Item')).toBeInTheDocument();
    });

    test('calls onAdd and closes menu when "Add Submenu" is clicked', () => {
        render(<ContextMenu {...mockFunctions} positionX={100} positionY={100} />);

        const addButton = screen.getByText('Add Submenu');
        fireEvent.click(addButton);

        expect(mockFunctions.onAdd).toHaveBeenCalled();
        expect(mockFunctions.closeMenu).toHaveBeenCalled();
    });

    test('calls onRename and closes menu when "Rename Item" is clicked', () => {
        render(<ContextMenu {...mockFunctions} positionX={100} positionY={100} />);

        const renameButton = screen.getByText('Rename Item');
        fireEvent.click(renameButton);

        expect(mockFunctions.onRename).toHaveBeenCalled();
        expect(mockFunctions.closeMenu).toHaveBeenCalled();
    });

    test('calls onDelete and closes menu when "Delete Item" is clicked', () => {
        render(<ContextMenu {...mockFunctions} positionX={100} positionY={100} />);

        const deleteButton = screen.getByText('Delete Item');
        fireEvent.click(deleteButton);

        expect(mockFunctions.onDelete).toHaveBeenCalled();
        expect(mockFunctions.closeMenu).toHaveBeenCalled();
    });
});
