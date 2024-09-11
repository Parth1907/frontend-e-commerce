import React from "react";

export default function StepperController({handleClick, currentStep, steps}) {
	return (
		<div className="container flex justify-around mt-4 mb-8">
			{/* Back button */}
			<button
				className={`bg-white text-gray-400 uppercase py-2 px-4 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ${
					currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
				}`}
				onClick={() => handleClick("back")}
			>
				Back
			</button>
			<button
				className={`bg-green-500 text-white uppercase py-2 px-4 rounded-xl font-semibold border-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ${
					currentStep === steps.length ? "opacity-50 cursor-not-allowed" : ""
				}`}
				onClick={() => handleClick("next")}
			>
				{currentStep === steps.length - 1 ? "Confirm" : "Next"}
			</button>
			{/* Next button */}
		</div>
	);
}
