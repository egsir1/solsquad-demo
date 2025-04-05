// app/api/upload-ipfs/route.ts
import { NextRequest, NextResponse } from "next/server";
import PinataSDK from "@pinata/sdk";

// Log environment variables for debugging

console.log("PINATA_API_KEY:", process.env.NEXT_PUBLIC_PINATA_API_KEY);
console.log("PINATA_API_SECRET:", process.env.NEXT_PUBLIC_PINATA_API_SECRET);
// Initialize Pinata SDK with your API keys
const pinata = new PinataSDK(
  process.env.NEXT_PUBLIC_PINATA_API_KEY, // Use environment variables
  process.env.NEXT_PUBLIC_PINATA_API_SECRET
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Get form data from the client
   
    const result = await pinata.pinJSONToIPFS(body); // Upload to IPFS
    return NextResponse.json({ ipfsCid: result.IpfsHash }, { status: 200 });
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return NextResponse.json(
      { error: "Failed to upload to IPFS" },
      { status: 500 }
    );
  }
}