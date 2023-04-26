export default {
    name: "user",
    title: "User",
    type: "document",
    liveEdit: true,
    fields: [
        {
            name: "firstName",
            title: "First Name",
            type: "string",
        },
        {
            name: "lastName",
            title: "Last Name",
            type: "string",
        },
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "picture",
            title: "Picture",
            type: "string",
        },
        {
            name: "email",
            title: "Email",
            type: "string",
        },
        {
            name: "wishList",
            title: "Wish List",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: { type: "product" },
                },
            ],
        },
    ],
};
