import { Card } from "../../shared/components/card/card";



export function Dashboard() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="flex justify-between items-center border-b-2 border-header_color">
        <div>
          <h1 className="text-3xl font-bold text-header_color">Hello User!</h1>
        </div>
        <div>
          Date and Time
        </div>
      </div>

      <div id="StatusCards" className="py-5 border-b-2 border-header_color">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div id="StatusCards" className="py-5">
        <Card />
      </div>
    </div>
  )
}
