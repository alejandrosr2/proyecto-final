import AllocationChart from "../charts/AllocationChart"
import BalanceChart from "../charts/BalanceChart"


function Analytics() {
  return (
    <div className="grid grid-cols-1" >
        <h2 className="text-gray-300  font-bold pb-3">Porcentaje asignación</h2>
        <div className="bg-[#0D0D0D] w-full h-60 lg:h-96 p-4 rounded-xl lg:mb-20 ">
          <AllocationChart/>
        </div>
        <h2 className="text-gray-300  font-bold pt-3 pb-3">Porcentaje Ganancias/Pérdidas</h2>
        <div className="bg-[#0D0D0D] w-full h-60 lg:h-96 p-4  rounded-xl ">
          <BalanceChart/>
        </div>
    </div>
  )
}

export default Analytics
