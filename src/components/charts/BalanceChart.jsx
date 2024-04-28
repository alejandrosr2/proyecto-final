"use client";

import { ResponsiveContainer, YAxis, XAxis, Tooltip, Legend, BarChart, Bar, ReferenceLine} from "recharts";
import data from "../../data/balanceMonth.json"

function BalanceChart() {



    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={400} data={data} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}>
                <YAxis/>
                <XAxis dataKey="name"/>
                <Tooltip/>
                <Legend/>
                <ReferenceLine y={0} stroke="#666"/>
                <Bar  type="monotone" dataKey="%Ganancias/Pérdidas" stackId="1" stroke="#FF9E47" fill="#FF9E47" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BalanceChart