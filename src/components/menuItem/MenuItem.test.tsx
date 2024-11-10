import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuItem from './MenuItem';
import '@testing-library/jest-dom/extend-expect';

const mockItem = {
    id: '1',
    name: 'Sample Item',
    children: []
};

const setup = (props = {}) => {
    const defaultProps = {
        item: mockItem,
        onAdd: jest.fn(),
        onRename: jest.fn(),
        onDelete: jest.fn(),
        openContextMenu: jest.fn(),
        isRenameActive: null,
        setRenameActive: jest.fn(),
        expandedItems: new Set(''),
        toggleExpand: jest.fn(),
        ...props
    };
    return render(<MenuItem {...defaultProps} />);
};

describe('MenuItem Component', () => {
    test('renders menu item name', () => {
        setup();
        expect(screen.getByText('Sample Item')).toBeInTheDocument();
    });

    test('expands and collapses submenu on click', () => {
        const toggleExpand = jest.fn();
        setup({ toggleExpand });

        const menuItem = screen.getByText('Sample Item');
        fireEvent.click(menuItem);

        expect(toggleExpand).toHaveBeenCalledWith('1');
    });

    test('calls openContextMenu on right-click', () => {
        const openContextMenu = jest.fn();
        setup({ openContextMenu });

        const menuItem = screen.getByText('Sample Item');
        fireEvent.contextMenu(menuItem);

        expect(openContextMenu).toHaveBeenCalled();
    });

    test('renames an item when edit mode is active', () => {
        const setRenameActive = jest.fn();
        setup({ isRenameActive: '1', setRenameActive });

        const input = screen.getByDisplayValue('Sample Item');
        fireEvent.change(input, { target: { value: 'Renamed Item' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(setRenameActive).toHaveBeenCalledWith(null); // Exits rename mode
    });
});
