import { MenuItem } from "../types/menu";

export const defaultMenu: MenuItem[] = [
    {
        id: '1',
        name: 'Products',
        children: [
            {
                id: '1-1',
                name: 'Women',
                children: [
                    { id: '1-1-1', name: 'Blouse', children: [] },
                    { id: '1-1-2', name: 'Sweater', children: [] },
                ],
            },
            { id: '1-2', name: 'Men', children: [] },
            { id: '1-3', name: 'Children', children: [] },
        ],
    },
    { id: '2', name: 'Contact Us', children: [] },
];