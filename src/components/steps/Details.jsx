import React, {useContext, useEffect} from "react";
import {StepperContext} from "../../context/StepperContext";
import * as Yup from "yup";
import {useFormik} from "formik";

export default function Details({setIsFormValid}) {
	const {userData, setUserData} = useContext(StepperContext);

	const validationSchema = Yup.object({
		address: Yup.string().required("Address is required"),
		city: Yup.string().required("City is required"),
	});

	const formik = useFormik({
		initialValues: {
			address: userData.address || "",
			city: userData.city || "",
		},
		validationSchema,
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
						Address
					</div>
					<div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
						<input
							onChange={formik.handleChange}
							value={formik.values.address}
							name="address"
							placeholder="Address"
							className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
						/>
					</div>
					{formik.errors.address ? (
						<div className="text-red-500">{formik.errors.address}</div>
					) : null}
				</div>
				<div className="w-full mx-2 flex-1">
					<div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
						City
					</div>
					<div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
						<input
							type="text"
							onChange={formik.handleChange}
							value={formik.values.city}
							name="city"
							placeholder="City"
							className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
						/>
					</div>
					{formik.errors.city ? (
						<div className="text-red-500">{formik.errors.city}</div>
					) : null}
				</div>
				<button type="submit" className="bg-blue-500 text-white rounded py-2">
					Save and continue
				</button>
			</div>
		</form>
	);
}
