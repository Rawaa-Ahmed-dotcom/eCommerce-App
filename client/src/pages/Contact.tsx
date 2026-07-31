import { useForm, type SubmitHandler } from "react-hook-form";
import type{ ContactFormData } from "../utils/Types";
import { useCreateMessage } from "../Hooks/contact";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  
  const createMessageMutation  = useCreateMessage(); 
  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    createMessageMutation.mutateAsync(data);
    await new Promise((r) => setTimeout(r, 600)); 
    
    reset();
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#F2F6F5" }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-8 shadow-sm"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E1E8E7" }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full mb-6"
          style={{ backgroundColor: "#41646520" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#416465"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2" style={{ color: "#2E4849" }}>
          Get in touch
        </h1>
        <p className="text-base mb-8" style={{ color: "#5A7A7B" }}>
          Have a question or feedback? Send us a message and we'll get back to you.
        </p>

        {createMessageMutation.isSuccess ? (
          <div
            className="rounded-lg p-4 text-center font-medium"
            style={{ backgroundColor: "#41646520", color: "#2E4849" }}
          >
            Thanks! Your message has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1"
                style={{ color: "#2E4849" }}
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className="w-full rounded-lg px-4 py-2.5 outline-none transition-colors focus:ring-2"
                style={{
                  border: errors.name ? "1px solid #D97757" : "1px solid #C9D8D7",
                  backgroundColor: "#FAFBFB",
                }}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name is too short" },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm" style={{ color: "#D97757" }}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1"
                style={{ color: "#2E4849" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg px-4 py-2.5 outline-none transition-colors focus:ring-2"
                style={{
                  border: errors.email ? "1px solid #D97757" : "1px solid #C9D8D7",
                  backgroundColor: "#FAFBFB",
                }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm" style={{ color: "#D97757" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
                style={{ color: "#2E4849" }}
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                className="w-full resize-none rounded-lg px-4 py-2.5 outline-none transition-colors focus:ring-2"
                style={{
                  border: errors.message ? "1px solid #D97757" : "1px solid #C9D8D7",
                  backgroundColor: "#FAFBFB",
                }}
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Message is too short" },
                })}
              />
              {errors.message && (
                <p className="mt-1 text-sm" style={{ color: "#D97757" }}>
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 rounded-lg px-5 py-2.5 font-medium text-white transition-colors disabled:opacity-60"
              style={{ backgroundColor: "#416465" }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;