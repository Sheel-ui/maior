import { GenGraph } from "../charts/base/GenGraph";
import { GenTable } from "../charts/base/GenTable";
import GenMessage from "./GenMessage";

interface GenerateGraphProps {
  message: string;
}

export default function GenerateGraph({ message }: GenerateGraphProps) {
  const invoices = [
    { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
    { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
    { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
    { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
    { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
    { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
    { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card" },
    { invoice: "INV008", paymentStatus: "Paid", totalAmount: "$400.00", paymentMethod: "Credit Card" },
    { invoice: "INV009", paymentStatus: "Pending", totalAmount: "$120.00", paymentMethod: "PayPal" },
    { invoice: "INV010", paymentStatus: "Paid", totalAmount: "$750.00", paymentMethod: "Credit Card" },
    { invoice: "INV011", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
    { invoice: "INV012", paymentStatus: "Paid", totalAmount: "$500.00", paymentMethod: "PayPal" },
    { invoice: "INV013", paymentStatus: "Pending", totalAmount: "$700.00", paymentMethod: "Credit Card" },
    { invoice: "INV014", paymentStatus: "Paid", totalAmount: "$850.00", paymentMethod: "Bank Transfer" },
    { invoice: "INV015", paymentStatus: "Unpaid", totalAmount: "$600.00", paymentMethod: "Credit Card" },
    { invoice: "INV016", paymentStatus: "Pending", totalAmount: "$400.00", paymentMethod: "PayPal" },
    { invoice: "INV017", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
    { invoice: "INV018", paymentStatus: "Unpaid", totalAmount: "$500.00", paymentMethod: "Bank Transfer" },
    { invoice: "INV019", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Credit Card" },
    { invoice: "INV020", paymentStatus: "Paid", totalAmount: "$650.00", paymentMethod: "PayPal" },
  ];

  const chartData = [
    { value: "January", count: 186 },
    { value: "February", count: 305 },
    { value: "March", count: 237 },
    { value: "April", count: 73 },
    { value: "May", count: 209 },
    { value: "June", count: 214 },
    { value: "July", count: 214 },
    { value: "April", count: 73 },
    { value: "May", count: 209 },
    { value: "June", count: 214 },
    { value: "July", count: 214 },
  ]

  
  return (
    <div>
      {
        !message ? <GenMessage message=""/> :
        message==="graph" ? <GenGraph chartData={chartData}/> :
        message==="table" ? <GenTable data={invoices} /> :
        <GenMessage message="Couldn't understant the query :("/> 
      }
    </div>
  );
}