"use client";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter, redirect, useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FormUserValues } from "@/types/forms";

function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		
	} = useForm<FormUserValues>();
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const params = useParams<{callbackurl: string}>();
	const {status} = useSession();
	const [error, setError] = useState<string>('');

	if(status === "authenticated"){
		router.push(params.callbackurl ? params.callbackurl : '/')
	}

	console.log(params)

	const onSubmit = handleSubmit(async (data) => {
		setLoading(true);

		const res = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
			callbackUrl: params.callbackurl ? params.callbackurl : '/'
			});

		if (res?.error) {
			setError(res.error.toString());
		}
		// else {
		// 	const promise = new Promise((resolve) => setTimeout(resolve, 3000));
		// 	await promise;
		// 	router.push(params.callbackurl ? params.callbackurl : '/');
		// }
		
		setLoading(false);
	});

	return (
		<div className="h-[calc(100vh-7rem)] flex justify-center items-center">
			<form onSubmit={onSubmit} className="w-1/4">
				{error && (
					<p className="bg-red-500 text-lg text-white p-3 rounded mb-2">
						{error}
					</p>
				)}

				<h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

				<label htmlFor="email" className="text-slate-500 block text-sm">
					Email:
				</label>
                {errors.email && (
					<span className="text-red-500 text-xs">{errors.email.message}</span>
				)}
				<input
					type="email"
					{...register("email", {
						required: {
							value: true,
							message: "Email is required",
						},
					})}
					className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
				/>



				<label htmlFor="password" className="text-slate-500 mt-2 block text-sm">
					Password:
				</label>
                {errors.password && (
					<span className="text-red-500 text-xs">
						{errors.password.message}
					</span>
				)}
				<input
					type="password"
					{...register("password", {
						required: {
							value: true,
							message: "Password is required",
						},
					})}
					className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
				/>

			

				<div className="mt-5">
					<button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#009E5B] hover:bg-[#009e5ce0] text-white">
						Login
					</button>
				</div>

				<div className="text-center pt-5 underline">
					<Link
						href={"/auth/register"}
						className="text-yellow-500 text-lg text "
					>
						Register
					</Link>
				</div>
			</form>
		</div>
	);
}
export default LoginPage;
