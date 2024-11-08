// Login.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import loginSchema from "@/schemes/loginScheme";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/custom/Spinner";
import { loginUser } from "@/services/authService";

export default function Login() {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState("");

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const navigate = useNavigate();

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		setLoading(true);
		const response = await loginUser(values);
		if (response.success) {
			localStorage.setItem("token", response.jwtToken);
			localStorage.setItem("loggedInUser", response.name);
			setTimeout(()=>{
				setLoading(false);
				navigate("/dashboard");
			},1000);

		} else {
			setResult(response.error || "Something went wrong!");
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen min-w-screen">
			<div className="bg-primary w-1/2"></div>
			<div className="w-1/2 h-screen flex flex-col relative">
				<Link to={"/register"} className="absolute right-12 top-8 text-muted-foreground underline">
					Register
				</Link>
				<div className="flex flex-1 flex-col justify-center items-center">
					<p className="text-center font-semibold text-xl">Login to your account</p>
					<p className="text-center text-sm text-muted-foreground mt-2">Enter your email below to login to your account</p>
					<div className="w-1/2 pt-10">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type="email" placeholder="you@example.com" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type="password" placeholder="••••••••" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full" disabled={loading}>
									{loading ? <LoadingSpinner /> : "Submit"}
								</Button>
								<p className="text-red-500 text-sm">{result}</p>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}
