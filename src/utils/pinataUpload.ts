import axios from 'axios';

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

export const uploadToPinata = async (data: any, fileName: string): Promise<{ ipfsHash: string; ipfsUrl: string }> => {
  try {
    if (!PINATA_JWT) {
      throw new Error('Pinata JWT is not configured');
    }

    // Convert data to a Blob
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

    // Create a File from the Blob
    const file = new File([blob], fileName, { type: 'application/json' });

    // Create FormData and append the file
    const formData = new FormData();
    formData.append('file', file);

    // Upload to Pinata
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const ipfsHash = response.data.IpfsHash;
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    console.log('Successfully uploaded to Pinata:', {
      ipfsHash,
      ipfsUrl,
    });

    return { ipfsHash, ipfsUrl };
  } catch (error) {
    console.error('Error uploading to Pinata:',error);
    throw new Error('Failed to upload data to Pinata');
  }
};
