import { useState, useEffect } from "react";
import { Form, useNavigation, useActionData } from "@remix-run/react";

type ActionData = {
  message?: string;
  error?: string;
};

export default function NewsletterSignup() {
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  const actionData = useActionData<ActionData>();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.message) {
      setMessage(actionData.message);
    } else if (actionData?.error) {
      setMessage(actionData.error);
    }
  }, [actionData]);

  return (
    <Form 
      method="post" 
      action="/api/subscribe"
      className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full sm:w-auto"
      onSubmit={() => setMessage("")}
    >
      <div className="relative w-full sm:w-auto">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm"
          aria-label="Email address"
        />
        {message && (
          <div 
            className={`absolute -bottom-6 left-0 text-xs whitespace-nowrap ${
              actionData?.error ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message}
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full sm:w-auto px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${
          isSubmitting ? "cursor-wait" : ""
        }`}
      >
        {isSubmitting ? "Subscribing..." : "Get updates"}
      </button>
    </Form>
  );
} 