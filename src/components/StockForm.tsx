import { useForm , SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const schema = z.object({
  symbol: z.string().min(2, "Symbol must be at least 2 characters long"),
  country: z.string().min(2, "Country must be at least 2 characters long"),
  exchange: z.string().min(1, "Exchange is required"),
  type: z.enum(["None", "Stock", "Index", "ETF", "REIT"], {
    required_error: "Type is required",
  }),
  startDate: z.string().refine(
    (date) => !isNaN(new Date(date).getTime()),
    "Invalid Start Date"
  ),
  endDate: z.string().refine(
    (date) => !isNaN(new Date(date).getTime()),
    "Invalid End Date"
  ),
});

type FormData = z.infer<typeof schema>;

export default function StockForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <Card className="max-w-3xl w-full shadow-lg">
        <CardHeader>
          <CardTitle>Stock Information Form</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Stock Symbol */}
            <div>
              <Label htmlFor="symbol">Stock Symbol</Label>
              <Input
                id="symbol"
                placeholder="e.g., AAPL"
                {...register("symbol")}
              />
              {errors.symbol && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.symbol.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g., US"
                {...register("country")}
              />
              {errors.country && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Exchange */}
            <div>
              <Label htmlFor="exchange">Exchange</Label>
              <Input
                id="exchange"
                placeholder="e.g., NASDAQ"
                {...register("exchange")}
              />
              {errors.exchange && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.exchange.message}
                </p>
              )}
            </div>

            {/* Type Dropdown */}
            <div>
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={(value) => register("type").onChange({ target: { value } })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Stock">Stock</SelectItem>
                  <SelectItem value="Index">Index</SelectItem>
                  <SelectItem value="ETF">ETF</SelectItem>
                  <SelectItem value="REIT">REIT</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
              />
              {errors.endDate && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-blue-600 text-white">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

