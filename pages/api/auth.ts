import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../utils/client";

export default function Hnadler(req: NextApiRequest, res: NextApiResponse) {
  client.auth.api.setAuthCookie(req, res);
}
