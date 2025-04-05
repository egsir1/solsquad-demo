import { NextRequest, NextResponse } from "next/server"
import {S3Client, PutObjectCommand, S3, HeadObjectCommand} from "@aws-sdk/client-s3";


const s3 = new S3Client( {
    region: "us-east-1",
    endpoint: "https://s3.filebase.com",
    credentials: {
        accessKeyId: process.env.FILEBASE_ACCESS_KEY!,
        secretAccessKey: process.env.FILEBASE_SECRET_KEY!,
    },
});


export async function POST(req: NextRequest) {
    try {
      const { fileName, data } = await req.json();
      console.log("filename body:", fileName);
      console.log("data: ", data);
  
      if (!fileName || !data) {
        return NextResponse.json(
          { error: "fileName and data are required" },
          { status: 400 }
        );
      }
  
      // Upload the file to S3
      const jsonBuffer = Buffer.from(JSON.stringify(data));
      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.FILEBASE_BUCKET_NAME!,
        Key: fileName,
        Body: jsonBuffer,
        ContentType: "application/json",
      });
      
      await s3.send(uploadCommand);
      console.log(`File uploaded to S3: ${fileName}`);
      
      // Get the CID from the metadata
      const head = await s3.send(
        new HeadObjectCommand({
          Bucket: process.env.FILEBASE_BUCKET_NAME!,
          Key: fileName,
        })
      );
      
      const cid = head.Metadata?.cid;
      console.log("Retrieved CID from S3:", cid);
      
      if (!cid) {
        throw new Error("Failed to get CID from uploaded file");
      }
    
      return NextResponse.json(
        {
          cid,
          url: `https://ipfs.filebase.io/ipfs/${cid}`,
        },
        { status: 200 }
      );
    } catch (err: any) {
      console.error("Operation failed: ", err);
      return NextResponse.json(
        { error: err.message || "Upload failed" },
        { status: 500 }
      );
    }
  }
  