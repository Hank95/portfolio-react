import React, { useState } from "react";
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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-bg-subtle">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-text">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[700px] text-text-muted md:text-xl">
              Have a project in mind or just want to say hello? Fill out the
              form and I'll get back to you as soon as possible.
            </p>
          </div>
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  className="text-text-muted"
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
                  className="border-border bg-bg text-text placeholder:text-text-subtle"
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-text-muted"
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
                  className="border-border bg-bg text-text placeholder:text-text-subtle"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                className="text-text-muted"
                htmlFor="message"
              >
                Message
              </Label>
              <Textarea
                className="min-h-[120px] border-border bg-bg text-text placeholder:text-text-subtle"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                required
              />
            </div>
            <Button
              className="w-full text-bg text-lg bg-text hover:bg-text-muted"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending" : "Submit"}
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
              <p className="text-status-live text-sm">
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
