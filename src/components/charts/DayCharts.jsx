"use client";

import { AreaChart, Area , ResponsiveContainer, YAxis, XAxis, Tooltip, Legend} from "recharts";
import data from "../../data/dayData.json"

function DayCharts() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={500} height={400} data={data}>
                <YAxis/>
                <XAxis dataKey="name"/>
                <Tooltip/>
                <Legend/>
                <Area type="monotone" dataKey="balance" stackId="1" stroke="#FF9E47" fill="#FF9E47" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default DayCharts
