import React, {useContext, useEffect} from "react";
import {StepperContext} from "../../context/StepperContext";
import * as Yup from "yup";
import {useFormik} from "formik";

export default function Account({setIsFormValid}) {
	const {userData, setUserData} = useContext(StepperContext);

	const validationSchema = Yup.object({
		cardNumber: Yup.string()
			.matches(/^[0-9]{16}$/, "Must be a valid 16-digit card number")
			.required("Card number is required"),
		expiry: Yup.date().required("Expiry date is required"),
	});

	const formik = useFormik({
		initialValues: {
			cardNumber: userData.cardNumber || "",
			expiry: userData.expiry || "",
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
						credit card number
					</div>
					<div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
						<input
							onChange={formik.handleChange}
							value={formik.values.cardNumber}
							name="cardNumber"
							placeholder="Card Number"
							className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
						/>
					</div>
					{formik.errors.cardNumber ? (
						<div className="text-red-500">{formik.errors.cardNumber}</div>
					) : null}
				</div>
				<div className="w-full mx-2 flex-1">
					<div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
						expiry date
					</div>
					<div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
						<input
							type="date"
							onChange={formik.handleChange}
							value={formik.values.expiry}
							name="expiry"
							placeholder="Expires in"
							className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
						/>
					</div>
					{formik.errors.expiry ? (
						<div className="text-red-500">{formik.errors.expiry}</div>
					) : null}
				</div>
				<button type="submit" className="bg-blue-500 text-white rounded py-2">
					Save and continue
				</button>
			</div>
		</form>
	);
}
