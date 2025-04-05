import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("https://api.pinata.cloud/data/pinList", {
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      params: {
        pageLimit: 50,
        status: "pinned",
        "metadata[keyvalues]": JSON.stringify({
          group: {
            value: "survey",
            op: "eq",
          },
        }),
      },
    });

    const surveys = response.data.rows.map((row: any) => ({
      name: row.metadata.name,
      cid: row.ipfs_pin_hash,
      date: row.date_pinned,
      url: `https://gateway.pinata.cloud/ipfs/${row.ipfs_pin_hash}`,
    }));

    return res.status(200).json(surveys);
  } catch (error: any) {
    console.error("Error fetching surveys:", error?.response?.data || error);
    return res.status(500).json({ message: "Failed to fetch survey data" });
  }
}
