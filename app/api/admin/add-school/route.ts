import { NextRequest, NextResponse } from 'next/server'; 
import dbConnect from '@/lib/mongodb'; 
import School from '@/models/School'; 
import { getServerSession } from 'next-auth'; 
import { authOptions } from '@/lib/authOptions'; 
import { hash } from 'bcryptjs';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405 });
    }

    try {

        await dbConnect();

        const session = await getServerSession({ req, ...authOptions }); // Corrected to pass `req` in the object

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Access denied. Admins only.' }, { status: 403 });
        }

        const {
            email,
            password,
            username,
            contact,
            schoolname,
            location,
            numberofstudents,
            numberofteacher,
        } = await req.json();

        if (!email || !password || !username || !contact || !schoolname || !location?.state || !location?.district || !location?.town) {
            return NextResponse.json({
                success: false,
                message: 'Missing required fields',
            }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10)

        const school = new School({
            email,
            password: hashedPassword, 
            username,
            contact,
            schoolname,
            location,
            numberofstudents,
            numberofteacher,
        });

        await school.save();

        return NextResponse.json({
            success: true,
            message: 'School added successfully',
            data: school,
        }, { status: 201 });
    } catch (error) {
        console.error('Error adding school:', error);
        if (error.code === 11000) {
            return NextResponse.json({
                success: false,
                message: 'Email already exists',
            }, { status: 409 });
        }
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
        }, { status: 500 });
    }
}
