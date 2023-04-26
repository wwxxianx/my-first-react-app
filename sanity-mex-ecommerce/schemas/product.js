export default {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 90,
            },
        },
        {
            name: "price",
            title: "Price",
            type: "number",
        },
        {
            name: "image",
            title: "Images",
            type: "array",
            of: [{ type: "image" }],
            options: {
                hotspot: "true",
            },
        },
        {
            name: "category",
            title: "Categories",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: { type: "category" },
                },
            ],
        },
        {
            name: "detail",
            title: "Detail",
            type: "string",
        },
        {
            name: "brand",
            title: "Brand",
            type: "string",
        },
        {
            name: "clientReview",
            title: "Client Review",
            type: "array",
            of: [{ type: 'productReview' }]
        },
    ],
};