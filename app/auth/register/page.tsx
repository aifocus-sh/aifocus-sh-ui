"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormUserValues } from '@/types/forms'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


function RegisterPage() {
	const { register, handleSubmit, formState: { errors } } = useForm<FormUserValues>();
	const router = useRouter();

	const onSubmit = handleSubmit( async (data) => {
		const res = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				username: data.username,
				email: data.email,
				password: data.password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (res.ok) {
			router.push('/auth/login');
		}
		await res.json();
	});

	return (
		<div className="h-[calc(100vh-7rem)] flex justify-center items-center">
			<form action={""} onSubmit={onSubmit} className="w-1/4">
				<h2 className="text-slate-200 font-bold text-4xl mb-4">Register</h2>
				<label className="text-slate-500 block text-sm" htmlFor="username">
					Username
				</label>
				{
					errors.username && (
						<span className="text-red-500  text-sm">{errors.username.message}</span>
					)
				}
				<input
					type="text"
					{...register("username", {
						required: {
							value: true,
							message: "Username is required"
						},
					})}
					className="w-full p-3 rounded block mb-2 bg-slate-800 text-slate-200"
				/>
				
				<label className="text-slate-500 mt-2 block text-sm" htmlFor="email">
					Email
				</label>
				{
					errors?.email && (
						<span className="text-red-500  text-sm">{errors.email.message}</span>
					)
				}
				<input
					type="email"
					{...register("email", {
						required: {
							value: true,
							message: "Email is required"
						},
					})}
					className="w-full p-3 rounded block mb-2 bg-slate-800 text-slate-200"
				/>
			
				<label className="text-slate-500 mt-2 block text-sm" htmlFor="password">
					Password
				</label>
				{
					errors?.password && (
						<span className="text-red-500  text-sm">{errors.password.message}</span>
					)
				}
				<input
					type="password"
					{...register("password", {
						required: {
							value: true,
							message: "Password is required"
						},
					})}
					className="w-full p-3 rounded block mb-2 bg-slate-800 text-slate-200"
				/>
		
				<label
					className="text-slate-500 mt-2 block text-sm"
					htmlFor="confirmPassword"
				>
					Confirm password
				</label>
				{
					errors?.confirmPassword && (
						<span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
					)
				}
				<input
					type="password"
					{...register("confirmPassword", {
						required: {
							value: true,
							message: "Confirm pasword is required"
						},
						validate: (value, dataForm) => value === dataForm.password || "Passwords do not march"
					})}
					className="w-full  p-3 rounded block mb-2 bg-slate-800 text-slate-200"
				/>
		
				<div className="mt-5">
				<button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#009E5B] hover:bg-[#009e5ce0] text-white disabled">
					Register
				</button>
				</div>
			</form>
		</div>
	);
}

export default RegisterPage;
