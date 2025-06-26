// src/pages/Contact.tsx
import React from "react";
import ContactForm from "@/components/ContactsForm";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Helmet>
        <title>Contact - Henry Pendleton</title>
        <meta
          name="description"
          content="Get in touch with Henry Pendleton. Reach out for collaboration or any inquiries."
        />
        <meta
          name="keywords"
          content="Henry Pendleton, contact, collaboration, inquiries, software engineer"
        />
        <meta name="author" content="Henry Pendleton" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Contact - Henry Pendleton" />
        <meta
          property="og:description"
          content="Get in touch with Henry Pendleton. Reach out for collaboration or any inquiries."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://henrypendleton.netlify.app/contact"
        />
        <meta property="og:image" content="URL to your image" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact - Henry Pendleton" />
        <meta
          name="twitter:description"
          content="Get in touch with Henry Pendleton. Reach out for collaboration or any inquiries."
        />
        <meta name="twitter:image" content="URL to your image" />
      </Helmet>
      <ContactForm />
    </div>
  );
};

export default Contact;
