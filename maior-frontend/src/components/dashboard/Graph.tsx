import { Line } from "@/components/charts/Line";
import Chart from "../charts/Chart";

export default function Graph() {
  return (
    <div className="grid grid-cols-3 gap-8 px-8 pb-8 overflow-y-auto max-h-[calc(100vh-150px)]">
    <Line />
    <Chart />
    <Line />
    <Line />
    <Line />
    <Line />
    <Line />
    <Line />
    <Line />
    <Line />
    <Line />
    <Line />
    <Line />
</div>
  )
}
