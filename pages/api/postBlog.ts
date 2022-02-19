import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

const postBlog = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const title = req.body.title;
    const description = req.body.description;

    const { data, error } = await client.from("blogs").insert([
      {
        title,
        description,
      },
    ]);

    if (data) {
      res.status(200).json({
        success: true,
        data,
        message: "Blog posted successfully",
      });
    }

    if (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
};

export default postBlog;
