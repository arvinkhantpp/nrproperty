# Lead pipeline

Every website form (enquiry, brochure, site visit, landowner, NRB, contact) posts to one server action, `submitLead` in `src/lib/forms/submit.ts`. The steps run in this order:

1. **Honeypot.** A hidden "website" field. Bots that fill it see a normal thank-you page, but nothing is saved.
2. **Validation.** The Zod schema in `src/lib/forms/schemas.ts` checks the input. The browser uses the same schema.
3. **Cloudflare Turnstile.** This runs only when `TURNSTILE_SECRET_KEY` is set. It uses "interaction-only" mode, so most visitors never see a challenge.
4. **Rate limit.** Each IP address can send at most 5 submissions in 10 minutes. The count comes from the database, so it holds across server instances.
5. **Duplicates.** If the same phone number sends the same form within 10 minutes, the lead is saved and linked through *Duplicate of*. It keeps the same assignee, and no second email or sheet row is sent.
6. **Auto-assign.** When *Site settings → Lead routing → Auto-assign* is on, leads go round-robin to active sales users who have *Receives auto-assigned leads* ticked.
7. **Save.** The lead is saved with its attribution: UTM tags, fbclid/gclid, landing page, referrer, language, IP, user agent, and the `_fbp`/`_fbc` cookies. The browser keeps UTM tags for 30 days, so a lead sent on a later visit still carries its campaign.
8. **After the response.** Through Next.js `after()`, so the visitor never waits on these:
   - An email goes to the form's recipients (Admin → Forms), falling back to Site settings → Lead routing. The assigned salesperson is copied in.
   - A row is appended to the Google Sheet.
   - From Phase 5, the Meta Conversions API is called.
   - The result of each step is recorded on the lead's Pipeline tab, including any error text.

The visitor then lands on `/thank-you?form=<type>`. Brochure requests also get the project's PDF there.

## Email

| Variable | Value |
| --- | --- |
| `EMAIL_PROVIDER` | `resend` or `smtp` |
| `EMAIL_FROM` | e.g. `NR Property <leads@nrproperty.com>` (the domain must be verified in Resend) |
| `RESEND_API_KEY` | for Resend |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | for SMTP; port 465 uses TLS |

When none of these are set, leads are still saved, and the Pipeline tab shows *Email sent: no*.

## Google Sheet ("NR Leads")

1. Create a Google Cloud service account and a JSON key. Put `client_email` in `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and put `private_key` in `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` with literal `\n` for the line breaks.
2. Share the sheet with the service-account email as **Editor**.
3. In Admin → Site settings → Lead routing, paste the sheet ID (the long ID in its URL) and the tab name (default `Leads`).
4. Put this header row in row 1 of the tab:

```
Received (Dhaka) | Lead ID | Form | Name | Phone | Email | Project | Message | Details (JSON) | Source | Campaign | Page | Admin link
```

## Landowner documents

The landowner form accepts JPG, PNG or PDF files: up to 5, each 10 MB or less. They are stored in the private **Lead documents** collection, which only logged-in staff can open. Under R2 they are stored with the `private/` prefix and served only through the admin.

- **With R2 configured:**
  - The browser asks for short-lived signed URLs and uploads straight to `private/incoming/` in the bucket. This avoids Vercel's 4.5 MB request limit.
  - When the form is sent, the server checks each file and moves it into Lead documents.
  - The bucket needs a CORS rule that allows `PUT` from the site's origin:

```json
[{ "AllowedOrigins": ["https://nrproperty.com"], "AllowedMethods": ["PUT"], "AllowedHeaders": ["content-type"], "MaxAgeSeconds": 3600 }]
```

- **Without R2** (local disk or Docker), each file is posted to a server action. The request limit there is 11 MB.

## Testing locally

- Email: run any SMTP catcher (e.g. Mailpit on port 1025), then set `EMAIL_PROVIDER=smtp SMTP_HOST=127.0.0.1 SMTP_PORT=1025`.
- Turnstile: Cloudflare's always-pass test keys are `1x00000000000000000000AA` (site) and `1x0000000000000000000000000000000AA` (secret).
