export default {
    name: "productReview",
    title: "Product Review",
    type: "object",
    fields: [
        {
            name: "review",
            title: "review",
            type: "string",
        },
        {
            name: "postedBy",
            title: "Posted By",
            type: "reference",
            to: { type: "user" },
        },
    ],
};