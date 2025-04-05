import { NextRequest, NextResponse } from "next/server";
import PinataSDK from "@pinata/sdk";

// Initialize Pinata SDK with your API keys
const pinata = new PinataSDK(
  process.env.NEXT_PUBLIC_PINATA_API_KEY,
  process.env.NEXT_PUBLIC_PINATA_API_SECRET
);

// Update Profile Route - handles updating data and IPFS CID
export async function PUT(request: NextRequest) {
  try {
    // Get the data sent from the frontend (this includes the updated profile data and IPFS CID)
    const { updatedProfile, ipfsCid } = await request.json();

    // Check if there's a need to upload new data to IPFS
    let newIpfsCid = ipfsCid; // By default, use the provided IPFS CID

    // If the profile data is updated, upload to IPFS
    if (updatedProfile) {
      const ipfsResponse = await pinata.pinJSONToIPFS(updatedProfile); // Upload updated profile data to IPFS
      newIpfsCid = ipfsResponse.IpfsHash; // Get the new IPFS CID
      console.log(ipfsResponse, "ipfsResponse");
    }

    console.log(updatedProfile, "updatedProfile");

    // Update the profile data in your database or blockchain system here
    // Example: await updateProfileInDB(updatedProfile, newIpfsCid);

    // Return the success response with the updated IPFS CID
    return NextResponse.json(
      { success: true, ipfsCid: newIpfsCid },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
