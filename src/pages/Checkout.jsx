import React, {useState} from "react";
import {StepperContext} from "../context/StepperContext";
import Stepper from "../components/Stepper";
import StepperController from "../components/StepperController";
import Account from "../components/steps/Account";
import Details from "../components/steps/Details";
import Payment from "../components/steps/Payment";
import Final from "../components/steps/Final";
import {toast} from "react-toastify";

export default function Checkout() {
	const steps = [
		"Account information",
		"Personal details",
		"Payment",
		"Complete",
	];
	const [currentStep, setCurrentStep] = useState(1);
	// const [isFormValid, setIsFormValid] = useState(false);

	const [userData, setUserData] = useState("");
	const [finalData, setFinalData] = useState([]);

	const displaySteps = (step) => {
		switch (step) {
			case 1:
				return <Account />;
				// return <Account setIsFormValid={setIsFormValid}/>;
			case 2:
				return <Details />;
				// return <Details setIsFormValid={setIsFormValid}/>;
			case 3:
				return <Payment />;
				// return <Payment setIsFormValid={setIsFormValid}/>;
			case 4:
				return <Final />;
				// return <Final setIsFormValid={setIsFormValid}/>;
			default:
		}
	};

	const handleClick = async (direction) => {
		// if (direction === "next" && !isFormValid) {
		// 	toast.error("Please fill the form before moving forward");
		// 	return;
		// }
		let newStep = currentStep;


		direction === "next" ? newStep++ : newStep--;

		newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
	};

	return (
		<div className="border-[#f1f5f9] md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2">
			{/* Stepper */}
			<div className="container horizontal mt-5 p-4">
				<Stepper steps={steps} currentStep={currentStep} />
			</div>

			{/* Display Components */}
			<div className="my-10 p-10">
				<StepperContext.Provider
					value={{
						userData,
						setUserData,
						finalData,
						setFinalData,
					}}
				>
					{displaySteps(currentStep)}
				</StepperContext.Provider>
			</div>

			{/* Navigation Controls */}
			<StepperController
				handleClick={handleClick}
				currentStep={currentStep}
				steps={steps}
			/>
		</div>
	);
}
