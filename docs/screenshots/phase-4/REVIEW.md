# Phase 4 review

## Round 1
- The landowner form gained a documents picker. Chosen files are listed with their size and a remove button, and type, size and count errors show inline.
- The Bangla contact page showed English form buttons, because the seed only filled English. The seed now adds first-draft Bangla form titles and buttons. Page body copy is still English in Bangla; Bangla content for the seed is planned for Phase 8.

## Round 2 (behaviour)
| Check | Result |
| --- | --- |
| Landowner form with a PDF and a JPG | Lead saved, two private Lead documents attached |
| Same phone and form again within 10 minutes | Saved as a duplicate of the first, no second notification |
| Sixth submission from one IP within 10 minutes | Refused with the "too many attempts" message |
| Auto-assign with two sales users | Leads alternate One, Two, One |
| Email over SMTP (local sink) | Sent to the default recipients plus the assignee; rendering checked |
| Production build, Bangla contact form | Saved with language `bn`; pipeline runs after the response |
| Fake PDF upload | Rejected by Payload's file validation; the form shows an error |
