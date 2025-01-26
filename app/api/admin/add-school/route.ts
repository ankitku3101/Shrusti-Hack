import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Admin from "@/models/Admin"; // Import Admin model to verify role
import School from "@/models/School"; 
import dbConnect from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request
    const {
      email,
      password,
      username,
      contact,
      schoolname,
      location,
      numberofstudents,
      numberofteacher,
      adminEmail,
    } = await request.json();

    // Check if all required fields are provided
    if (
      !email ||
      !password ||
      !username ||
      !contact ||
      !schoolname ||
      !location?.state ||
      !location?.district ||
      !location?.town ||
      !adminEmail
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Verify Admin Role
    const admin = await Admin.findOne({ email: adminEmail });

    if (!admin || admin.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized: Admin role required" },
        { status: 403 }
      );
    }

    // Check if the email already exists for the school
    const existingSchool = await School.findOne({ email });
    if (existingSchool) {
      return NextResponse.json(
        { message: "School with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new school document
    const newSchool = new School({
      email,
      password: hashedPassword,
      username,
      contact,
      schoolname,
      location,
      numberofstudents,
      numberofteacher,
    });

    // Save the new school to the database
    await newSchool.save();

    // Respond with success
    return NextResponse.json(
      { message: "School registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding school:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the school" },
      { status: 500 }
    );
  }
}
