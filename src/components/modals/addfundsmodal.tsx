import { X } from "lucide-react";
import { useState } from "react";
import { BsBank2 } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

interface AddFundsModalProps {
  onClose: () => void;
  onclick: () => void;
  // onCli
}

const AddFundsModal = ({ onClose, onclick }: AddFundsModalProps) => {
  const [selectedOption, setSelectedOption] = useState("");

  const paymentOptions = [
    {
      id: "basic-transfer",
      name: "Basic Transfer",
      Icon: <BsBank2 size={25} />,
    },
    {
      id: "debit-credit",
      name: "Add Debt/Credit Card",
      Icon: <CiCreditCard1 size={25} />,
    },
    {
      id: "payment-method",
      name: "Add Payment Method",
      Icon: <IoIosAddCircleOutline size={25} />,
    },
  ];

  return (
    <div className="fixed inset-0 bg-[#0303034D] flex items-center justify-center z-30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Payment Option
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4 mb-6">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedOption === option.id
                    ? "border-[#5E5204]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="w-[80%]  flex items-center gap-4">
                    <div>{option.Icon}</div>
                    <span className="text-sm font-medium text-gray-700">
                      {option.name}
                    </span>
                  </div>

                  {selectedOption === option.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                      selectedOption === option.id
                        ? "border-[#5E5204] bg-[#5E5204]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedOption === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
            onClick={onclick}
              type="button"
              className="w-full bg-[#F9D900] hover:bg-yellow-600 text-black font-medium py-3 px-4 rounded-md focus:outline-none transition-colors"
              disabled={!selectedOption}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFundsModal;
