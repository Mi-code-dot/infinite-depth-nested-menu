/* 
Provides a default menu structure for initializing the menu when no previous data is found.
*/
import { MenuItem } from "../types/menu";

export const defaultMenu: MenuItem[] = [
    {
        id: '1',
        name: 'Menu',
        children: []
    }
];