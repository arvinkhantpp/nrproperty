# Tracking

Everything is set in **Admin → Tracking**. A blank ID means that tool is not loaded. Nothing is hard-coded.

| Setting | Format | Loads |
| --- | --- | --- |
| GTM container | `GTM-XXXXXXX` | Google Tag Manager |
| GA4 measurement ID | `G-XXXXXXXXXX` | GA4 through gtag. Used only when GTM is empty. |
| Google Ads conversion ID + labels | `AW-123456789` + one label per conversion | Ads conversions through gtag. Used only when GTM is empty. |
| Meta Pixel ID | digits | Meta Pixel, plus the Conversions API on the server |
| Meta test event code | `TEST12345` | Sends server events to *Test events* while you check the setup. Clear it after launch. |
| Conversions API token | secret | Or set `META_CAPI_ACCESS_TOKEN` on the server, which takes precedence. Only admins can read it, and it never reaches the browser. |
| Clarity project ID | letters and digits | Microsoft Clarity, loaded only after the visitor accepts cookies |
| Ask for consent | checkbox | Cookie banner in English and Bangla, with Google Consent Mode v2 |

**GTM or direct?** When a GTM container is set, the site only pushes events to `dataLayer`. GA4 and Google Ads tags then belong inside GTM. When GTM is empty, the site loads GA4 and Ads itself. Do not also add the Meta Pixel inside GTM, because the site already loads it with the event IDs needed for de-duplication.

## Events

| When | dataLayer / GA4 | Meta | Google Ads label |
| --- | --- | --- | --- |
| Every page and client-side navigation | `page_view` | `PageView` | – |
| Project page | `view_item` | `ViewContent` | – |
| Enquiry, brochure or NRB form | `generate_lead` | `Lead` | lead |
| Site-visit form | `schedule_visit` | `Schedule` | schedule |
| Landowner form | `landowner_lead` | `LandownerLead` (custom) | landowner |
| Contact form | `contact_form` | `Contact` | contact |
| Tap on a call link | `click_call` | `Contact` | contact |
| Tap on a WhatsApp link | `click_whatsapp` | `Contact` | contact |

Form events carry `form_type`, `project_id` and an `event_id`.

## Conversions API

1. The browser makes an event ID for each submission. The Pixel sends the event with `eventID`, and the server stores the same ID on the lead.
2. After the response, the server sends the same event to the Conversions API, so Meta counts it once. The server event includes:
   - Hashed (SHA-256) phone, email and first and last name.
   - Country `bd` for local forms.
   - IP address and user agent.
   - `_fbp`, and `_fbc` (built from `fbclid` when the cookie is missing).
3. The result is shown on the lead's Pipeline tab (*CAPI sent*, plus any error).

## Consent

When *Ask for consent* is on:
- Google tags start in Consent Mode "denied", the Pixel starts revoked, Clarity does not load, and the server does not send the Conversions API event.
- **Accept** grants all of them.
- The choice is kept for 180 days in `localStorage` and in the `nr_consent` cookie. The cookie is what the server reads.

When it is off, consent is assumed unless the visitor previously declined.

## Testing

- **Meta:** Events Manager → Test events. Put the test code in Admin → Tracking, submit a form, and the browser and server events should appear once each as "Deduplicated".
- **GA4:** DebugView, with the GA Debugger extension or `?gtm_debug` from GTM preview.
- **Google Ads:** Tag Assistant.
