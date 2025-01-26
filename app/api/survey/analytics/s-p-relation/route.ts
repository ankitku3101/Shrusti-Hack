import { NextResponse } from "next/server"
import connectMongo from "@/lib/mongodb"
import Performance from "@/models/Performace"
import Satisfaction from "@/models/Satisfaction"

export async function GET() {
  try {
    await connectMongo()

    const pipeline = [
      {
        $lookup: {
          from: "performances",
          localField: "ofschool",
          foreignField: "ofschool",
          as: "performance",
        },
      },
      {
        $unwind: "$performance",
      },
      {
        $project: {
          satisfactionRate: "$OVERALLRATE",
          performanceRate: "$performance.OVERALLRATE",
          schoolId: "$ofschool",
        },
      },
    ]

    const results = await Satisfaction.aggregate(pipeline)

    // Calculate correlation
    const n = results.length
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0,
      sumY2 = 0

    for (const result of results) {
      const x = result.satisfactionRate
      const y = result.performanceRate
      sumX += x
      sumY += y
      sumXY += x * y
      sumX2 += x * x
      sumY2 += y * y
    }

    const correlation = (n * sumXY - sumX * sumY) / Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))

    return NextResponse.json({
      correlation,
      dataPoints: results,
      interpretation: interpretCorrelation(correlation),
    })
  } catch (error) {
    console.error("Error in satisfaction-performance correlation:", error)
    return NextResponse.json({ error: "Unable to calculate correlation" }, { status: 500 })
  }
}

function interpretCorrelation(correlation: number): string {
  if (correlation > 0.7) return "Strong positive correlation"
  if (correlation > 0.5) return "Moderate positive correlation"
  if (correlation > 0.3) return "Weak positive correlation"
  if (correlation > -0.3) return "Little to no correlation"
  if (correlation > -0.5) return "Weak negative correlation"
  if (correlation > -0.7) return "Moderate negative correlation"
  return "Strong negative correlation"
}

