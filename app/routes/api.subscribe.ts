import { json, redirect, type ActionFunction, type LoaderFunction } from "@remix-run/node";

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
const CONVERTKIT_API_URL = "https://api.convertkit.com/v3";

// Handle GET requests by redirecting to home page
export const loader: LoaderFunction = async () => {
  return redirect('/');
};

// Handle POST requests
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  if (!CONVERTKIT_API_KEY || !CONVERTKIT_FORM_ID) {
    return json(
      { error: "ConvertKit configuration is missing" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email) {
      return json({ error: "Email is required" }, { status: 400 });
    }

    const response = await fetch(
      `${CONVERTKIT_API_URL}/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return json({ error: error.message }, { status: response.status });
    }

    return json({ message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}; 