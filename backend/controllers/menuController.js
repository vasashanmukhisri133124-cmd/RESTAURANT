import MenuItem from '../models/MenuItem.js';

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
export const getMenuItems = async (req, res, next) => {
    try {
        const items = await MenuItem.find({});
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
export const createMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Get a single menu item
// @route   GET /api/menu/:id
// @access  Public
export const getMenuItemById = async (req, res, next) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404);
            throw new Error('Menu item not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404);
            throw new Error('Menu item not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        if (item) {
            res.status(200).json({ message: 'Menu item removed' });
        } else {
            res.status(404);
            throw new Error('Menu item not found');
        }
    } catch (error) {
        next(error);
    }
};
