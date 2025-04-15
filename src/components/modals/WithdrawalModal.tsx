import { X } from "lucide-react";
import { useState } from "react";
// import { BsBank2 } from "react-icons/bs";

import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../inputfield";
import { ImSpinner9 } from "react-icons/im";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../Global/store";
interface AddFundsModalProps {
  onClose: () => void;
}

const WithdrawalModal = ({ onClose }: AddFundsModalProps) => {


const depositSchema = Yup.object().shape({
  amount: Yup.number().required("amount is required"),
  identifier: Yup.string().required("provide account number or email"),
  destinationAccount: Yup.string().required("provide account number or email"),
  destinationName: Yup.string().required("provide account name"),
  description: Yup.string()
 
  

});
const url = `${import.meta.env.VITE_DEVE_URL}/wallet/withdraw`;

const token = useSelector((state: RootState) => state.user.token);


const [loading, setloading] = useState(false);

const handleSubmit = async (values: { amount: number; identifier: string , description:string, destinationAccount:string, destinationName:string}) => {

  setloading(true);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.post(url, values, {headers});
    
    toast.success("Withdrawal Successful");
    
    console.log(res);


    onClose();
      
  
    setTimeout(() => {
      window.location.reload();
    }, 1500);

  } catch (error) {
    console.log(error);
    toast.error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  } finally {
    setloading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-[#0303034D] flex items-center justify-center z-30">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
          Bank Transfer
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
         
          <div className="mt-8">
          <Formik
            initialValues={{ amount: 0, identifier: "", destinationName:"", destinationAccount:"", description:"" }}
            validationSchema={depositSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                <InputField
                  type="number"
                  label="amount"
                  name="amount"
                  placeholder="3000"
                  required
                />
                <InputField
                  type="string"
                  label="Account number or email"
                  name="identifier"
                //   placeholder="••••••••"
                  required
                />
                    <InputField
                  type="string"
                  label="Destination Account name "
                  name="destinationName"
                //   placeholder="••••••••"
                  required
                />
                    <InputField
                  type="string"
                  label="Destination Account number or email"
                  name="destinationAccount"
                //   placeholder="••••••••"
                  required
                />

<InputField
                  type="string"
                  label="description"
                  name="description"
                //   placeholder="••••••••"
                  
                />


                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-black flex justify-center items-center text-white py-3 rounded-full font-medium transition ${
                    loading
                      ? "opacity-90 cursor-not-allowed"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {loading ? <ImSpinner9 className="animate-spin" /> : "Withdraw"}
                </button>
              </Form>
            )}
          </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;
