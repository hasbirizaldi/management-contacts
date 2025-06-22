import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { contactCreate } from "../../lib/api/ContactApi";
import { useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";
import FormCreateEdit from "../cards/FormCreateEdit";

export default function ContactCreate() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [token, _] = useLocalStorage("token", "");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await contactCreate(token, { first_name, last_name, email, phone });
    const responseBody = response.json();
    console.log(responseBody);

    if (response.status === 201) {
      await alertSuccess("Contact created successfully");
      navigate({
        pathname: "/dashboard/contacts",
      });
    } else {
      alertError(responseBody.errors);
    }
  }
  return (
    <>
      <div className="flex gap-9 items-center mb-6">
        <Link to="/dashboard/contacts" className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
          <i className="fas fa-arrow-left mr-2" /> Back
        </Link>
        <h1 className="text-xl font-bold text-white flex items-center">
          <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New Contact
        </h1>
      </div>
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          <FormCreateEdit
            first_name={first_name}
            last_name={last_name}
            email={email}
            phone={phone}
            onChangeFirstName={(e) => setFirstName(e.target.value)}
            onChangeLastName={(e) => setLastName(e.target.value)}
            onChangeEmail={(e) => setEmail(e.target.value)}
            onChangePhone={(e) => setPhone(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
