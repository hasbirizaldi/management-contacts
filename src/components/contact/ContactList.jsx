import { useEffect, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDelete, contactList } from "../../lib/api/ContactApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import { Link } from "react-router";
import ContactListCard from "../cards/ContactListCard";
import SearchForm from "../cards/SearchForm";

import PaginationContact from "../cards/PaginationContact";

export default function ContactList() {
  const [token, _] = useLocalStorage("token", "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);

  async function handleContactDelete(id) {
    if (!(await alertConfirm("Are you sure want to delete this contact?"))) {
      return;
    }
    const response = await contactDelete(token, id);
    const responseBody = await response.json();

    if (response.status === 200) {
      await alertSuccess("Contact deleted successfully");
      setReload(!reload);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handlePageChange(page) {
    setPage(page);
    setReload(!reload);
  }

  async function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setReload(!reload);
  }

  async function fetchContact() {
    const response = await contactList(token, { name, email, phone, page });
    const responseBody = await response.json();
    // console.log(responseBody.meta);

    if (response.status === 200) {
      setContacts(responseBody.data);
      // setTotalPage(3);
      setTotalPage(responseBody.meta?.last_page || 1);
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffect(() => {
    fetchContact().then(() => console.log("Contact fetched"));
  }, [reload]);

  useEffectOnce(() => {
    const toggleButton = document.getElementById("toggleSearchForm");
    const searchFormContent = document.getElementById("searchFormContent");
    const toggleIcon = document.getElementById("toggleSearchIcon");

    // Add transition for smooth animation
    searchFormContent.style.transition = "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
    searchFormContent.style.overflow = "hidden";
    searchFormContent.style.maxHeight = "0px";
    searchFormContent.style.opacity = "0";
    searchFormContent.style.marginTop = "0";

    function toggleSearchForm() {
      if (searchFormContent.style.maxHeight !== "0px") {
        // Hide the form
        searchFormContent.style.maxHeight = "0px";
        searchFormContent.style.opacity = "0";
        searchFormContent.style.marginTop = "0";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
      } else {
        // Show the form
        searchFormContent.style.maxHeight = searchFormContent.scrollHeight + "px";
        searchFormContent.style.opacity = "1";
        searchFormContent.style.marginTop = "1rem";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
      }
    }

    toggleButton.addEventListener("click", toggleSearchForm);

    return () => {
      toggleButton.removeEventListener("click", toggleSearchForm);
    };
  });
  return (
    <>
      <div className="flex items-center mb-6">
        <i className="fas fa-users text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-white">My Contacts</h1>
      </div>
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fas fa-search text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">Search Contacts</h2>
          </div>
          <button type="button" id="toggleSearchForm" className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200">
            <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon" />
          </button>
        </div>
        <SearchForm name={name} setName={(e) => setName(e.target.value)} email={email} setEmail={(e) => setEmail(e.target.value)} phone={phone} setPhone={(e) => setPhone(e.target.value)} onSubmit={handleSearch} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
          <Link to="/dashboard/contacts/create" className="block p-6 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                <i className="fas fa-user-plus text-3xl text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">Create New Contact</h2>
              <p className="text-gray-300">Add a new contact to your list</p>
            </div>
          </Link>
        </div>

        {contacts.map((contact) => (
          <ContactListCard key={contact.id} contact={contact} onDelete={handleContactDelete} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <PaginationContact page={page} totalPage={totalPage} onPageChange={handlePageChange} />
      </div>
    </>
  );
}
