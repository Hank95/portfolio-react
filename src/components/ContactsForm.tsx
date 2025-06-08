import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { trackContactSubmission } from "@/lib/analytics";
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
      trackContactSubmission();
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#4d6e5e] dark:text-[#a8d5ba]">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-400">
              Have a project in mind or just want to say hello? Fill out the
              form and I'll get back to you as soon as possible.
            </p>
          </div>
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  className="text-gray-700 dark:text-gray-400"
                  htmlFor="name"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Enter your name"
                  required
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-gray-700 dark:text-gray-400"
                  htmlFor="email"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  required
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                className="text-gray-700 dark:text-gray-400"
                htmlFor="message"
              >
                Message
              </Label>
              <Textarea
                className="min-h-[120px] border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                required
              />
            </div>
            <Button
              className="w-full text-white text-lg bg-gray-700 hover:bg-gray-600 dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900"
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
  );
};

export default ContactForm;
