import { NextApiRequest, NextApiResponse } from "next";

import fetch from "node-fetch";

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  try {
    const user = await fetch(
      encodeURI(`https://${process.env.domain}/api/v2/users/${id}`),
      {
        headers: {
          authorization: `Bearer ${process.env.bearer}`,
          "Content-Type": "application/json",
        },
      }
    ).then((j) => j.json());
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
