import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const id = searchParams.get('id');

    const { db } = await connectToDatabase();
    
    // 如果提供了特定ID，返回单个曲谱
    if (id) {
      const sheet = await db.collection('sheets').findOne({ _id: new ObjectId(id) });
      return Response.json({ data: sheet });
    }

    // 否则返回用户的所有曲谱
    const sheets = await db
      .collection('sheets')
      .find({ userId })
      .toArray();

    return Response.json({ data: sheets });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch sheets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const userId = formData.get('userId') as string;

    if (!file || !title || !userId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);
    
    // 生成唯一文件名
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), 'public', 'files', fileName);

    // 确保目录存在
    await fs.mkdir(path.join(process.cwd(), 'public', 'files'), { recursive: true });
    
    // 保存文件
    await fs.writeFile(filePath, buffer);

    const { db } = await connectToDatabase();
    const result = await db.collection('sheets').insertOne({
      title,
      pdf: fileName,
      userId,
      createdAt: new Date(),
    });

    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({ error: 'Failed to upload sheet' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { db } = await connectToDatabase();
        const result = await db.collection('sheets').deleteOne({ 
            _id: new ObjectId(params.id) 
        });
        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: 'Failed to delete sheet' }, { status: 500 });
    }
} 