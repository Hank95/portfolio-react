// src/components/ContactForm.tsx
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    // <div className="max-w-lg mx-auto p-4">
    //   <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <div>
    //       <label
    //         htmlFor="name"
    //         className="block text-sm font-medium text-gray-700"
    //       >
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         id="name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label
    //         htmlFor="email"
    //         className="block text-sm font-medium text-gray-700"
    //       >
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label
    //         htmlFor="message"
    //         className="block text-sm font-medium text-gray-700"
    //       >
    //         Message
    //       </label>
    //       <textarea
    //         id="message"
    //         value={message}
    //         onChange={(e) => setMessage(e.target.value)}
    //         className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //         required
    //       />
    //     </div>
    //     {error && <p className="text-red-500 text-sm">{error}</p>}
    //     {success && (
    //       <p className="text-green-500 text-sm">Message sent successfully!</p>
    //     )}
    //     <div>
    //       <button
    //         type="submit"
    //         className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //         disabled={loading}
    //       >
    //         {loading ? "Sending..." : "Send"}
    //       </button>
    //     </div>
    //   </form>

    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[700px] text-[#4d6e5e] md:text-xl dark:text-[#4d6e5e]">
              Have a project in mind or just want to say hello? Fill out the
              form and I'll get back to you as soon as possible.
            </p>
          </div>
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#4d6e5e]" htmlFor="name">
                  Name
                </Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#4d6e5e]" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#4d6e5e]" htmlFor="message">
                Message
              </Label>
              <Textarea
                className="min-h-[120px]"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                required
              />
            </div>
            <Button
              className="w-full bg-[#4d6e5e] hover:bg-[#4d6e5e]/90 text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending" : "Submit"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-green-500 text-sm">
                Message sent successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
    // </div>
  );
};

export default ContactForm;
