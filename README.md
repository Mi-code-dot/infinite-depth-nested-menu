# Infinite-Depth Nested Menu

This project is a React-based, infinite-depth nested menu application built with TypeScript. It provides an interactive interface for managing a hierarchical menu structure, allowing users to add, rename, delete, and organize nested items. The menu state is persisted using local storage to maintain the menu structure across sessions.

## Features

- **Infinite Nesting:** Create a menu with unlimited depth by adding nested submenus to any item.
- **Context Menu:** Right-click on items to open a context menu with options to add, rename, and delete items.
- **Renaming Mode:** Edit item names inline by selecting the "Rename" option from the context menu.
- **Persistence:** The menu structure is saved in local storage, so changes remain across page reloads.
- **Collapsible Items:** Expand or collapse menu items to organize the view.

## Project Structure

- **`Menu.tsx`** - The main component that renders the top-level menu items and manages the overall menu structure.
- **`MenuItem.tsx`** - A recursive component that represents a single menu item with its nested children.
- **`ContextMenu.tsx`** - A component for rendering the context menu with options like Add, Rename, and Delete.
- **`menuStorage.ts`** - Utility functions for saving and loading the menu structure from local storage.
- **`defaultData.ts`** - Provides a default menu structure when no saved data is available.

## Getting Started

### Prerequisites

- **Node.js** - Ensure you have Node.js installed on your machine.
- **npm or yarn** - You can use either npm or yarn as your package manager.

## Installation
### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Usage
## Basic Operations
- Add a Submenu: Right-click on any item and select "Add" to create a new submenu under the selected item.
- Rename an Item: Right-click on an item, choose "Rename," and the item's name will turn into an editable input field. Press "Enter" to save changes or "Escape" to cancel.
- Delete an Item: Right-click on an item and select "Delete." This will remove the item along with any of its children.
- Expand/Collapse Items: Click on an item to toggle its expanded state and view its children.

## Context Menu Behavior
The context menu provides an intuitive way to manage each menu item. To avoid accidental actions:
- Closing Context Menu: Clicking outside the menu will close it, while the main menu remains open for easy navigation.
- State Persistence
The menu structure is saved automatically in the browser's local storage. Upon revisiting the app, the saved structure is loaded, providing a seamless experience across sessions.
