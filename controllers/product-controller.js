const productModel = require("../models/product-model");
const categoryModel = require("../models/category-model");

const productController = {
    addProduct: async (req, res) => {
        try {
            const product = await productModel.create(req.body);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getAllProduct: async (req, res) => {
        try {
            const page = parseInt(req.query.page) - 1 || 0;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || "";
            let sort = req.query.sort || [];
            let category = req.query.category || "all"

            const dataList = await categoryModel.find();
            const categoryList = dataList.map((value) => {
                return value.name.toLowerCase();
            });
            category === "all" ? (category = [...categoryList]) : (category = req.query.category.toLowerCase().split(","));

            req.query.sort ? (sort = req.query.sort.toLowerCase().split(",")) : (sort = []);
            let sortBy = {};

            // if (sort.length > 1) {
            //     sortBy[sort[0]] = sort[1];
            // } else if (sort.length == 0) {
            //     sortBy = {};
            // } else {
            //     sortBy[sort[0]] = 'ascending';
            // }
            for (let index = 0; index < sort.length; index++) {
                if (sort.length == 0) {
                    sortBy = {};
                } else if (sort.length > 0 && sort.length % 2 == 0) {
                    if (index % 2 == 0) {
                        sortBy[sort[index]] = sort[index + 1];
                    } else {
                        continue;
                    }
                } else {
                    if (index % 2 == 0 && index == sort.length - 1) {
                        sortBy[sort[index]] = 'ascending';
                    } else if (index % 2 == 0) {
                        sortBy[sort[index]] = sort[index + 1];
                    } else {
                        continue;
                    }
                }
            }

            const products = await productModel.find({ name: { $regex: search, $options: "i" } })
                .where("category")
                .in([...category])
                .sort(sortBy)
                .skip(page * limit)
                .limit(limit);

            // const total = await productModel.countDocuments({
            //     name: { $regex: search, $options: "i" }
            // });

            // const response = {
            //     error: false,
            //     total,
            //     page: page + 1,
            //     limit,
            //     products,
            // };

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productModel.findOne({ _id: id });
            if (!product) {
                return res
                    .status(404)
                    .json({ error: `Product not found with id: ${id}` });
            }
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productModel.findOneAndRemove({ _id: id });
            if (!product) {
                return res
                    .status(404)
                    .json({ error: `Product not found with id: ${id}` });
            }
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
                new: true,
                runValidators: true,
            });
            if (!product) {
                return res
                    .status(404)
                    .json({ error: `Product not found with id: ${id}` });
            }
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
};

module.exports = productController;
