/*
MenuItem: 
This interface represents a single menu item, with:
id: A unique identifier for the item.
name: The display name of the item.
children: An array of child MenuItem objects, allowing for infinite nesting.
*/
export interface MenuItem {
    id: string;
    name: string;
    children: MenuItem[];
}