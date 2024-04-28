"use client";

import { ResponsiveContainer, YAxis, XAxis, Tooltip, Legend, BarChart, Bar} from "recharts";
import data from "../../data/amountAsset.json"

function AllocationChart() {

    // Calcular el total de todos los valores
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    // Actualizar los valores para representar los porcentajes
    const dataWithPercentages = data.map(item => ({
        name: item.name,
        // Calcular el porcentaje y redondearlo a dos decimales
        value: ((item.value / total) * 100).toFixed(2)
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={500} height={400} data={dataWithPercentages}>
                <YAxis/>
                <XAxis dataKey="name"/>
                <Tooltip/>
                <Legend/>
                <Bar type="monotone" dataKey="value" stackId="1" stroke="#FF9E47" fill="#FF9E47" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default AllocationChart