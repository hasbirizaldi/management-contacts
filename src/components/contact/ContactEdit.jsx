import { useState } from "react";
import { Link, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDetail, contactUpdate } from "../../lib/api/ContactApi";
import { alertError, alertSuccess } from "../../lib/alert";
import FormCreateEdit from "../cards/FormCreateEdit";

export default function ContactEdit() {
  const { id } = useParams();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, _] = useLocalStorage("token", "");

  async function fetchContact() {
    const response = await contactDetail(token, id);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setFirstName(responseBody.data.first_name);
      setLastName(responseBody.data.last_name);
      setEmail(responseBody.data.email);
      setPhone(responseBody.data.phone);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await contactUpdate(token, { id, first_name, last_name, email, phone });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Contact undated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchContact().then(() => console.log("Contact detail fetched successfully"));
  });

  return (
    <>
      <div>
        <div className="flex items-center mb-6 gap-9 ">
          <Link to="/dashboard/contacts" className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
            <i className="fas fa-arrow-left mr-2" /> Back
          </Link>
          <h1 className="text-xl font-bold text-white flex items-center">
            <i className="fas fa-user-edit text-blue-400 mr-3" /> Edit Contact
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
              isEdit={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
