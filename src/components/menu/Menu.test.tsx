import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from './Menu';
import '@testing-library/jest-dom/extend-expect';

describe('Menu Component', () => {
    test('renders menu title', () => {
        render(<Menu />);
        expect(screen.getByText('Menu')).toBeInTheDocument();
    });

    test('opens context menu on right-click', () => {
        render(<Menu />);
        const menuItem = screen.getByText('Menu');
        fireEvent.contextMenu(menuItem);

        expect(screen.getByText('Add Submenu')).toBeInTheDocument();
        expect(screen.getByText('Rename Item')).toBeInTheDocument();
        expect(screen.getByText('Delete Item')).toBeInTheDocument();
    });

    test('adds a submenu item', () => {
        render(<Menu />);
        const menuItem = screen.getByText('Menu');
        fireEvent.contextMenu(menuItem);

        const addButton = screen.getByText('Add Submenu');
        fireEvent.click(addButton);

        // Check that a new item is added with the default name
        expect(screen.getByText('New Item')).toBeInTheDocument();
    });

    test('renames an item', () => {
        render(<Menu />);
        const menuItem = screen.getByText('Menu');
        fireEvent.contextMenu(menuItem);

        const renameButton = screen.getByText('Rename Item');
        fireEvent.click(renameButton);

        // Enter a new name for the item
        const input = screen.getByDisplayValue('Menu');
        fireEvent.change(input, { target: { value: 'Renamed Item' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(screen.queryByText('Menu')).not.toBeInTheDocument();
        expect(screen.getByText('Renamed Item')).toBeInTheDocument();
    });

    test('deletes an item', () => {
        render(<Menu />);
        const menuItem = screen.getByText('Menu');
        fireEvent.contextMenu(menuItem);

        const deleteButton = screen.getByText('Delete Item');
        fireEvent.click(deleteButton);

        // Verify that the item is deleted
        expect(screen.queryByText('Menu')).not.toBeInTheDocument();
    });
});
