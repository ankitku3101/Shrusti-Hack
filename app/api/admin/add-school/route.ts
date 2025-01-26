import { NextRequest, NextResponse } from 'next/server'; // Use NextRequest and NextResponse from next/server
import dbConnect from '@/lib/mongodb'; // Ensure a database connection utility is available
import School from '@/models/School'; // Import the School model
import { getServerSession } from 'next-auth'; // Import NextAuth's server session utility
import { authOptions } from '@/lib/authOptions'; // Import your NextAuth configuration

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405 });
    }

    try {
        // Ensure database connection
        await dbConnect();

        // Get the session from NextAuth
        const session = await getServerSession({ req, ...authOptions }); // Corrected to pass `req` in the object

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Access denied. Admins only.' }, { status: 403 });
        }

        // Extract school data from the request body
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

        // Validate required fields
        if (!email || !password || !username || !contact || !schoolname || !location?.state || !location?.district || !location?.town) {
            return NextResponse.json({
                success: false,
                message: 'Missing required fields',
            }, { status: 400 });
        }

        // Create a new school document
        const school = new School({
            email,
            password, // Ideally, hash the password before storing it
            username,
            contact,
            schoolname,
            location,
            numberofstudents,
            numberofteacher,
        });

        // Save the school to the database
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
