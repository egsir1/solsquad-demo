import axios from 'axios';

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

export const uploadToPinata = async (data: any, filename: string) => {
  if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
    throw new Error('Pinata API credentials not found');
  }

  try {
    // Convert data to JSON string
    const jsonData = JSON.stringify(data);
    
    // Create FormData object
    const formData = new FormData();
    formData.append('file', new Blob([jsonData], { type: 'application/json' }), filename);
    
    // Upload to Pinata
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Authorization': `Bearer ${PINATA_API_KEY}`,
        'pinata_secret': PINATA_SECRET_KEY
      }
    });

    const ipfsHash = response.data.IpfsHash;
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    return { ipfsHash, ipfsUrl };
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw new Error('Failed to upload to Pinata');
  }
}; 