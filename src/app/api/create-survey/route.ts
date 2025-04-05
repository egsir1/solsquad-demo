import { NextRequest, NextResponse } from "next/server";
import PinataSDK from "@pinata/sdk";

// Initialize Pinata SDK with your API keys
const pinata = new PinataSDK(
  process.env.NEXT_PUBLIC_PINATA_API_KEY!, // Use environment variables
  process.env.NEXT_PUBLIC_PINATA_API_SECRET!
);

interface FormData {
  title: string;
  surveyType: "FREE" | "PAID";
  reward: string;
  maxResponses: string;
  questions: Question[];
  totalFounde: string;
  status: "ACTIVE" | "COMPLETED";
  expireTime: string;
}

interface Question {
  text: string;
  options: string[];
}

export async function uploadSurveyToIPFS(formData: FormData): Promise<string> {
  try {
    // Upload the FormData to Pinata
    const result = await pinata.pinJSONToIPFS(formData);

    // Return the IPFS CID (Hash)
    return result.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw new Error("Failed to upload to IPFS");
  }
}

// Example API Route to handle the upload from the frontend
export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json(); // Get form data from the client

    // Call the upload function
    const ipfsCid = await uploadSurveyToIPFS(formData);

    // Return the IPFS CID to the frontend
    return NextResponse.json({ ipfsCid }, { status: 200 });
  } catch (error) {
    console.error("Error uploading survey data:", error);
    return NextResponse.json({ error: "Failed to upload survey data" }, { status: 500 });
  }
}
