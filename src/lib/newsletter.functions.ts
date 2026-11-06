import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// beehiiv connection is gateway-backed: calls go through the Lovable connector
// gateway, never straight to api.beehiiv.com. Both keys are server-only secrets.
const GATEWAY_URL = "https://connector-gateway.lovable.dev/beehiiv";
// The single publication this API key can reach: "Alex MacGregor".
const PUBLICATION_ID = "pub_b92dabcc-1263-44de-a248-69ea4b8fc02f";

const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Enter a valid email address" })
    .max(255, { message: "That email address is too long" }),
});

export type NewsletterResult = { status: "subscribed" | "already" };

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => subscribeSchema.parse(input))
  .handler(async ({ data }): Promise<NewsletterResult> => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const beehiivKey = process.env["BEEHIIV_API_KEY"];
    if (!lovableKey || !beehiivKey) {
      throw new Error("Newsletter sign-up isn't set up yet.");
    }

    const response = await fetch(
      `${GATEWAY_URL}/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": beehiivKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          send_welcome_email: true,
          reactivate_existing: false,
        }),
      },
    );

    const body = await response.text();

    if (!response.ok) {
      console.error(`beehiiv subscription failed [${response.status}]: ${body}`);
      // Someone who already gets the newsletter is a success, not an error.
      if (response.status === 409 || /already/i.test(body)) {
        return { status: "already" };
      }
      throw new Error("Couldn't sign you up right now. Please try again.");
    }

    return { status: "subscribed" };
  });
