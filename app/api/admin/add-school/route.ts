import dbConnect from '@/lib/mongodb'; // Ensure a database connection utility is available
import School from '@/models/School'; // Import the School model
import { getServerSession } from 'next-auth'; // Import NextAuth's server session utility
import { authOptions } from '@/lib/authOptions'; // Import your NextAuth configuration

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        // Ensure database connection
        await dbConnect();

        // Get the session from NextAuth
        const session = await getServerSession(req, res, authOptions);

        if (!session || session.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
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
        } = req.body;

        // Validate required fields
        if (!email || !password || !username || !contact || !schoolname || !location?.state || !location?.district || !location?.town) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
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

        return res.status(201).json({
            success: true,
            message: 'School added successfully',
            data: school,
        });
    } catch (error) {
        console.error('Error adding school:', error);
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists',
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}
