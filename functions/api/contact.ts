interface Env {
  RESEND_API_KEY?: string;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    if (!context.env.RESEND_API_KEY) {
      return jsonResponse(
        { message: "Contact service temporarily unavailable" },
        503,
      );
    }

    let body: unknown;

    try {
      body = await context.request.json();
    } catch {
      return jsonResponse({ message: "Invalid request" }, 400);
    }

    if (typeof body !== "object" || body === null) {
      return jsonResponse({ message: "Invalid request" }, 400);
    }

    const input = body as Record<string, unknown>;

    const name = clean(input.name);
    const email = clean(input.email);
    const message = clean(input.message);

    if (name.length < 2 || name.length > 100) {
      return jsonResponse({ message: "Please enter a valid name" }, 400);
    }

    if (
      email.length > 254 ||
      !validEmail(email)
    ) {
      return jsonResponse(
        { message: "Please enter a valid email address" },
        400,
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return jsonResponse(
        { message: "Message must be between 10 and 5000 characters" },
        400,
      );
    }

    /*
     * Delivery is deliberately disabled until the Denarixx sending
     * domain is verified with the email provider.
     *
     * We will activate the Resend request only after domain verification
     * so the frontend can never report success for an undelivered message.
     */

    return jsonResponse(
      { message: "Contact service awaiting email configuration" },
      503,
    );
  } catch (error) {
    console.error("Denarixx contact function error:", error);

    return jsonResponse(
      { message: "Contact service temporarily unavailable" },
      500,
    );
  }
};

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        Allow: "POST",
        "Cache-Control": "no-store",
      },
    });
  }

  return onRequestPost(context);
};
