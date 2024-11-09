
interface GenerateGraphProps {
    message: string;
  }
  
export default function GenMessage({ message }: GenerateGraphProps) {
  return (
    <div className="text-md font-semibold text-center pt-10">{message}</div>
  )
}
