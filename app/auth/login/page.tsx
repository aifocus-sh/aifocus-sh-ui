"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState<string>('');


	const onSubmit = handleSubmit(async (data) => {
		setLoading(true);
		let pathName = '/'
		const url = new URL(window.location.href);
		const queryParams = new URLSearchParams(url.search);
		const urlCallback = queryParams.get('callbackUrl');
		if (urlCallback) {
			pathName = new URL(urlCallback!).pathname;
		}
	
		const res = await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false
			});

		if (res?.error) {
			setError(res.error.toString());
		} else {
			if (urlCallback) {
				router.push(`/?callbackUrlLogin=${urlCallback}`);

			} else {
				router.push('/');
			}
			router.refresh();
		}
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

						{isLoading && (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="animate-spin w-6 h-6 ml-2"
									width="44"
									height="44"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="#fff"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M12 3a9 9 0 1 0 9 9" />
								</svg>
							</>
						)}
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
