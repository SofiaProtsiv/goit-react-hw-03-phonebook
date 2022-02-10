import shortid from "shortid";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import Container from "./components/Container";
import Modal from "./components/Modal";
import Section from "./components/Section";
import Notiflix from "notiflix";
import IconButton from "./components/IconButton";

import { ReactComponent as AddUserBtn } from "./icons/addUser.svg";
import { ReactComponent as CloseBtn } from "./icons/close.svg";
import { Component } from "react/cjs/react.production.min";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    showModal: false,
  };

  componentDidMount() {
    const contactsLS = JSON.parse(localStorage.getItem("contacts"));
    if (contactsLS) {
      this.setState({ contacts: contactsLS });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    if (
      contacts.length > prevState.contacts.length &&
      prevState.contacts.length !== 0
    ) {
      this.toggleModal();
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    const { contacts } = this.state;

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notiflix.Notify.failure(`${name} is already in contacts.`);
    } else if (contacts.find((contact) => contact.number === number)) {
      Notiflix.Notify.failure(`${number} is already in contacts.`);
    } else if (name.trim() === "" || number.trim() === "") {
      Notiflix.Notify.failure("Enter the contact's name and number phone!");
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = (contactId) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  changeFilter = (event) => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    const { filter, contacts, showModal } = this.state;

    return (
      <Container>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ContactForm onSubmit={this.addContact} />
            <IconButton onClick={this.toggleModal}>
              <CloseBtn className="closeModal" />
            </IconButton>
          </Modal>
        )}

        <Section title="Phonebook">
          <IconButton onClick={this.toggleModal}>
            <AddUserBtn className="openModal" />
          </IconButton>
        </Section>

        <Section title="Contacts">
          {contacts.length > 0 && (
            <Filter value={filter} onChange={this.changeFilter} />
          )}
          {contacts.length > 0 ? (
            <ContactList
              contacts={this.getVisibleContacts()}
              onDeleteContact={this.deleteContact}
            />
          ) : (
            <p className="notification">
              Your phonebook is empty. Please add contact.
            </p>
          )}
          {filter.length >= this.getVisibleContacts() && (
            <p className="notification">No matches found.</p>
          )}
        </Section>
      </Container>
    );
  }
}
