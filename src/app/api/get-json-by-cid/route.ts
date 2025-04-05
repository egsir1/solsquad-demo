import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const cid = searchParams.get("cid");

    if(!cid) {
        return NextResponse.json({error: "CID is required"}, {status: 400});
    }

    try {
        const filebaseUrl = `https://ipfs.filebase.io/ipfs/${cid}`;
        const res = await fetch(filebaseUrl);

        if (!res.ok) {
            return NextResponse.json({error: "Failed to fetch from IPFS"}, {status: res.status});
        }

        const json = await res.json();
        return NextResponse.json(json, {status: 200});
    } catch (err: any) {
        return NextResponse.json({error: err.message || "Something went wrong"},{status: 500});
    }
}