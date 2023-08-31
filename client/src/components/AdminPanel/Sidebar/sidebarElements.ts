export const elements = [
    {
        id: 1,
        key: 'dashboard',
        name: 'Dashboard',
        path: '/app/admin'
    },
    {
        id: 2,
        key: 'products',
        name: 'Products',
        children: [
            {
                id: 1,
                subKey: 'manageProducts',
                name: 'Manage Products',
                path: '/app/admin/manage-products'
            },
            {
                id: 2,
                subKey: 'createProduct',
                name: 'Create Product',
                path: '/app/admin/add-product'
            },
        ]
    },
    {
        id: 4,
        key: 'orders',
        name: 'Orders',
        children: [
            {
                id: 1,
                subKey: 'manageOrders',
                name: 'Manage Orders',
                path: '/app/admin/manage-orders'
            },
        ]
    },
    {
        id: 5,
        key: 'contacts',
        name: 'Contacts',
        children: [
            {
                id: 1,
                subKey: 'manageContacts',
                name: 'Manage Contacts',
                path: '/app/admin/manage-contacts'
            },
        ]
    },
    {
        id: 7,
        key: 'users',
        name: 'Users',
        children: [
            {
                id: 1,
                subKey: 'manageUsers',
                name: 'Manage Users',
                path: '/app/admin/manage-users'
            },
            {
                id: 2,
                subKey: 'addUser',
                name: 'Add User',
                path: '/app/admin/add-user'
            },
        ]
    },
    {
        id: 8,
        key: 'categories',
        name: 'Categories',
        children: [
            {
                id: 1,
                subKey: 'manageCategories',
                name: 'Manage Categories',
                path: '/app/admin/manage-categories'
            },
            {
                id: 2,
                subKey: 'createCategory',
                name: 'Create Category',
                path: '/app/admin/add-category'
            }
        ]
    },
    {
        id: 9,
        key: 'banner1',
        name: 'Banner1',
        children: [
            {
                id: 1,
                subKey: 'manageBanner1',
                name: 'Manage Banner',
                path: '/app/admin/manage-banners1'
            },
            {
                id: 2,
                subKey: 'createBanner1',
                name: 'Create Banner',
                path: '/app/admin/add-banner1'
            }
        ]
    },
    {
        id: 10,
        key: 'banner2',
        name: 'Banner2',
        children: [
            {
                id: 1,
                subKey: 'manageBanner2',
                name: 'Manage Banner',
                path: '/app/admin/manage-banners2'
            },
            {
                id: 2,
                subKey: 'createBanner2',
                name: 'Create Banner',
                path: '/app/admin/add-banner2'
            }
        ]
    },
    {
        id: 11,
        key: 'banner3',
        name: 'Banner3',
        children: [
            {
                id: 1,
                subKey: 'manageBanner3',
                name: 'Manage Banner',
                path: '/app/admin/manage-banners3'
            },
            {
                id: 2,
                subKey: 'createBanner3',
                name: 'Create Banner',
                path: '/app/admin/add-banner3'
            }
        ]
    },
    {
        id: 12,
        key: 'subCategory',
        name: 'SubCategory',
        children: [
            {
                id: 1,
                subKey: 'manageSubCategories',
                name: 'Manage Sub Categories',
                path: '/app/admin/manage-sub-categories'
            },
            {
                id: 2,
                subKey: 'createSubCategory',
                name: 'Create Sub Category',
                path: '/app/admin/add-sub-category'
            }
        ]
    },
]