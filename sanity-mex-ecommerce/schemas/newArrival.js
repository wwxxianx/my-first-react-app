export default {
    name: "newArrival",
    title: "New Arrival",
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
            type: "image",
        },
    ],
};
