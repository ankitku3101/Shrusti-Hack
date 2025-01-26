import type { NextApiRequest, NextApiResponse } from "next"
import connectMongo from "@/lib/mongodb"
import Performance from '@/models/Performace'
import Satisfaction from "@/models/Satisfaction"
import Infrastructure from "@/models/Infrastructure"
import School from "@/models/School"
import { NextResponse } from "next/server"

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectMongo()
  
        const pipeline = [
          {
            $lookup: {
              from: "performances",
              localField: "_id",
              foreignField: "ofschool",
              as: "performance",
            },
          },
          {
            $lookup: {
              from: "satisfactions",
              localField: "_id",
              foreignField: "ofschool",
              as: "satisfaction",
            },
          },
          {
            $lookup: {
              from: "infrastructures",
              localField: "_id",
              foreignField: "ofschool",
              as: "infrastructure",
            },
          },
          {
            $project: {
              _id: 1,
              schoolname: 1,
              performanceRate: { $arrayElemAt: ["$performance.OVERALLRATE", 0] },
              satisfactionRate: { $arrayElemAt: ["$satisfaction.OVERALLRATE", 0] },
              infrastructureRate: { $arrayElemAt: ["$infrastructure.OVERALLRATE", 0] },
            },
          },
          {
            $addFields: {
              overallRanking: {
                $avg: ["$performanceRate", "$satisfactionRate", "$infrastructureRate"],
              },
            },
          },
          {
            $sort: { overallRanking: -1 },
          },
        ]
  
        const schoolRankings = await School.aggregate([
          {
            $lookup: {
              from: "performances",
              localField: "_id",
              foreignField: "ofschool",
              as: "performance",
            },
          },
          {
            $lookup: {
              from: "satisfactions",
              localField: "_id",
              foreignField: "ofschool",
              as: "satisfaction",
            },
          },
          {
            $lookup: {
              from: "infrastructures",
              localField: "_id",
              foreignField: "ofschool",
              as: "infrastructure",
            },
          },
          {
            $project: {
              _id: 1,
              schoolname: 1,
              performanceRate: { $arrayElemAt: ["$performance.OVERALLRATE", 0] },
              satisfactionRate: { $arrayElemAt: ["$satisfaction.OVERALLRATE", 0] },
              infrastructureRate: { $arrayElemAt: ["$infrastructure.OVERALLRATE", 0] },
            },
          },
          {
            $addFields: {
              overallRanking: {
                $avg: ["$performanceRate", "$satisfactionRate", "$infrastructureRate"],
              },
            },
          },
          {
            $sort: { overallRanking: -1 },
          },
        ])
  
        // res.status(200).json(schoolRankings)
        return NextResponse.json({message:"Success",data:schoolRankings},{status:200})
    } catch (error) {
        return NextResponse.json({error:error.message||"Internal server error while fetching pipeline"},{status:500})
        
      }
}

