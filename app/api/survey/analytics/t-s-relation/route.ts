import { NextResponse } from "next/server"
import connectMongo from "@/lib/mongodb"
import School from "@/models/School"
import Performance from "@/models/Performace"
import Satisfaction from "@/models/Satisfaction"

export async function GET() {
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
        $project: {
          schoolName: "$schoolname",
          teacherToStudentRatio: {
            $cond: [{ $eq: ["$numberofstudents", 0] }, null, { $divide: ["$numberofteacher", "$numberofstudents"] }],
          },
          performanceRate: { $arrayElemAt: ["$performance.OVERALLRATE", 0] },
          satisfactionRate: { $arrayElemAt: ["$satisfaction.OVERALLRATE", 0] },
        },
      },
      {
        $match: {
          teacherToStudentRatio: { $ne: null },
        },
      },
    ]

    const results = await School.aggregate(pipeline)

    // Calculate correlations
    const correlations = calculateCorrelations(results)

    return NextResponse.json({
      results,
      correlations,
      interpretation: interpretCorrelations(correlations),
    })
  } catch (error) {
    console.error("Error in teacher-student ratio analysis:", error)
    return NextResponse.json({ error: "Unable to perform analysis" }, { status: 500 })
  }
}

function calculateCorrelations(data) {
  const n = data.length
  let sumX = 0,
    sumY1 = 0,
    sumY2 = 0,
    sumXY1 = 0,
    sumXY2 = 0,
    sumX2 = 0,
    sumY1_2 = 0,
    sumY2_2 = 0

  for (const item of data) {
    const x = item.teacherToStudentRatio
    const y1 = item.performanceRate
    const y2 = item.satisfactionRate

    sumX += x
    sumY1 += y1
    sumY2 += y2
    sumXY1 += x * y1
    sumXY2 += x * y2
    sumX2 += x * x
    sumY1_2 += y1 * y1
    sumY2_2 += y2 * y2
  }

  const correlationPerformance =
    (n * sumXY1 - sumX * sumY1) / Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY1_2 - sumY1 * sumY1))

  const correlationSatisfaction =
    (n * sumXY2 - sumX * sumY2) / Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2_2 - sumY2 * sumY2))

  return {
    performance: correlationPerformance,
    satisfaction: correlationSatisfaction,
  }
}

function interpretCorrelations(correlations) {
  const interpretCorrelation = (correlation) => {
    if (correlation > 0.7) return "Strong positive"
    if (correlation > 0.5) return "Moderate positive"
    if (correlation > 0.3) return "Weak positive"
    if (correlation > -0.3) return "Little to no"
    if (correlation > -0.5) return "Weak negative"
    if (correlation > -0.7) return "Moderate negative"
    return "Strong negative"
  }

  return {
    performance: interpretCorrelation(correlations.performance),
    satisfaction: interpretCorrelation(correlations.satisfaction),
  }
}

