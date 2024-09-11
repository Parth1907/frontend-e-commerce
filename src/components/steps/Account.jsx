import React, {useContext, useEffect} from "react";
import {StepperContext} from "../../context/StepperContext";
import * as Yup from "yup";
import {useFormik} from "formik";

export default function Account({setIsFormValid}) {
	const {userData, setUserData} = useContext(StepperContext);

	const validationSchema = Yup.object({
		username: Yup.string()
			.required("Required")
			.min(3, "Must be atlest 3 characters"),
		password: Yup.string()
			.required("Required")
			.min(3, "Must be atlest 3 characters"),
	});

	const formik = useFormik({
		initialValues: {
			username: userData.username || "",
			password: userData.password || "",
		},
		validationSchema,
		// enableReinitialize: true,
		onSubmit: (values) => {
			setUserData({...userData, ...values});
		},
	});

	// useEffect(() => {
	// 	setIsFormValid(formik.isValid && formik.dirty);
	// }, [formik.isValid, formik.dirty, setIsFormValid]);

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="flex flex-col">
				<div className="w-full mx-2 flex-1">
					<div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
						Username
					</div>
					<div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
						<input
							name="username"
							onChange={formik.handleChange}
							value={formik.values.username}
							placeholder="Username"
							className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
						/>
					</div>
					{formik.errors.username ? (
						<div className="text-red-500">{formik.errors.username}</div>
					) : null}
				</div>
				<div className="w-full mx-2 flex-1">
					<div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
						Password
					</div>
					<div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
						<input
							type="password"
							onChange={formik.handleChange}
							value={formik.values.password}
							name="password"
							placeholder="Password"
							className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
						/>
					</div>
					{formik.errors.password ? (
						<div className="text-red-500">{formik.errors.password} </div>
					) : null}
				</div>

				<button type="submit" className="bg-blue-500 text-white rounded py-2">
					Save and continue
				</button>
			</div>
		</form>
	);
}
