import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('imageUrl');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
  }

  try {
    const apiResponse = await axios.get(`https://alt-text-generator.vercel.app/api/generate?imageUrl=${encodeURIComponent(imageUrl)}`);
    return NextResponse.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching alt text:', error);
    return NextResponse.json({ error: 'Failed to fetch alt text' }, { status: 500 });
  }
}