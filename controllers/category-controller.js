const categoryModel = require("../models/category-model");

const categoryController = {
    addCategory: async (req, res) => {
        try {
            const category = await categoryModel.create(req.body);
            res.status(200).json(category);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getAllCategory: async (req, res) => {
        try {
            const categories = await categoryModel.find();
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await categoryModel.findOne({ _id: id });
            if (!category) {
                return res
                    .status(404)
                    .json({ error: `Category not found with id: ${id}` });
            }
            res.status(200).json(category);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await categoryModel.findOneAndRemove({ _id: id });
            if (!category) {
                return res
                    .status(404)
                    .json({ error: `Category not found with id: ${id}` });
            }
            res.status(200).json(category);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    updateCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await categoryModel.findOneAndUpdate({ _id: id }, req.body, {
                new: true,
                runValidators: true,
            });
            if (!category) {
                return res
                    .status(404)
                    .json({ error: `Category not found with id: ${id}` });
            }
            res.status(200).json(category);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
};

module.exports = categoryController;