import { client } from '../../lib/client';

export default async function handler(req, res) {
    const user = req.body;

    await client
        .createIfNotExists(user)
        .then((response) => res.status(200).json(response));
}