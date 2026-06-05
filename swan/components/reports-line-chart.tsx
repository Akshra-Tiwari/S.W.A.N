"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

type Props = {
  data: any[]
}

export default function ReportsLineChart({
  data,
}: Props) {

  const formattedData =
    data?.map((item) => ({
      date: `${item._id.month}/${item._id.year}`,
      reports: item.count,
    })) || []

  return (
    <div className="w-full h-80">

      <ResponsiveContainer>

        <LineChart
          data={formattedData}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="reports"
            stroke="#06b6d4"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}