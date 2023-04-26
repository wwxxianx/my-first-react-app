import { client } from "../../lib/client";
import { uuid } from "uuidv4";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        const { productId, addToWishList, userId } = req.body;
        let response;

        if (addToWishList) {
            response = await client
                .patch(userId)
                .setIfMissing({ wishList: [] })
                .insert("after", "wishList[-1]", [
                    {
                        _key: uuid(),
                        _ref: productId,
                    },
                ])
                .commit({ autoGenerateArrayKeys: true });
        } else {
            response = await client
                .patch(userId)
                .unset(`wishList[_ref == "${productId}"]`)
                .commit();
        }

        res.status(200).json(response);
    }
}
