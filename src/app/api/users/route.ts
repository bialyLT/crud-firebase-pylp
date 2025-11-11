import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';

// GET - Get all users
export async function GET() {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase Admin not initialized' },
        { status: 500 }
      );
    }
    
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching users' },
      { status: 500 }
    );
  }
}

// POST - Create a new user
export async function POST(request: Request) {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json(
        { error: 'Firebase Admin not initialized' },
        { status: 500 }
      );
    }
    
    const body = await request.json();
    const { name, email, age } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const usersRef = db.collection('users');
    const docRef = await usersRef.add({
      name,
      email,
      age: age || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { id: docRef.id, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    );
  }
}
