import { client } from "../../lib/client";
import { uuid } from "uuidv4";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { userId, productId, review } = req.body;

        const response = await client  
                                    .patch(productId)
                                    .setIfMissing({ clientReview: []})
                                    .insert('after', 'clientReview[-1]', [{
                                        _key: uuid(),
                                        review,
                                        postedBy: { _ref: userId },
                                        _type: 'productReview'
                                    }])
                                    .commit({autoGenerateArrayKeys: true});
        res.status(200).json(response);
    }
}
