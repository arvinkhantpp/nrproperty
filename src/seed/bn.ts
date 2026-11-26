/**
 * First-draft Bangla for all seeded content (flagged for review by a native speaker before launch).
 * The seed reads each document in Bangla (empty fields fall back to English), swaps every string
 * found here, and saves the result as the Bangla version. Strings not listed stay as they are.
 */
import type { Payload } from 'payload'

const DICT: Record<string, string> = {
  // ── Shared ──
  'Thank you': 'ধন্যবাদ',
  Home: 'হোম',
  About: 'আমাদের কথা',
  Contact: 'যোগাযোগ',
  Blog: 'ব্লগ',
  NRB: 'প্রবাসী',
  Landowner: 'জমির মালিক',
  FAQ: 'প্রশ্নোত্তর',
  'Privacy policy': 'গোপনীয়তা নীতি',
  'Construction status': 'নির্মাণ অগ্রগতি',
  'Book a Visit': 'ভিজিট বুক করুন',
  'Book a site visit': 'সাইট ভিজিট বুক করুন',
  'View projects': 'প্রজেক্ট দেখুন',
  'View all projects': 'সব প্রজেক্ট দেখুন',
  'Explore Projects': 'প্রজেক্ট দেখুন',
  'Talk to an Advisor': 'উপদেষ্টার সাথে কথা বলুন',
  'Request a call back': 'কল ব্যাক চাই',
  'Your details': 'আপনার তথ্য',
  'Your message': 'আপনার বার্তা',
  'Call us': 'কল করুন',

  // ── Thank you / blog / construction pages ──
  'We’ve received *your details.*': 'আমরা *আপনার তথ্য পেয়েছি।*',
  'An advisor will call you within one working day. Need us sooner? Message us on WhatsApp.':
    'একজন উপদেষ্টা এক কর্মদিবসের মধ্যে আপনাকে ফোন করবেন। আরও আগে দরকার? হোয়াটসঅ্যাপে মেসেজ দিন।',
  'Every project, *month by month.*': 'প্রতিটি প্রজেক্ট, *মাসে মাসে।*',
  'See where each building stands today. Photos and notes are updated every month.':
    'প্রতিটি ভবন আজ কোথায় আছে দেখুন। ছবি ও নোট প্রতি মাসে আপডেট হয়।',
  'Guides & news': 'গাইড ও খবর',
  'Know more, *buy with confidence.*': 'আরও জানুন, *নিশ্চিন্তে কিনুন।*',
  'Plain-language guides on buying, land sharing and buying from abroad.':
    'ফ্ল্যাট কেনা, জমি শেয়ারিং আর বিদেশ থেকে কেনা নিয়ে সহজ ভাষায় গাইড।',

  // ── Privacy ──
  '[Placeholder — have this reviewed before launch.]': '[নমুনা — চালুর আগে আইনি পর্যালোচনা করিয়ে নিন।]',
  'What we collect': 'আমরা কী তথ্য নিই',
  'When you fill in a form we collect your name, phone number and the details you choose to share, plus the page you came from and advertising identifiers (such as utm and fbclid).':
    'ফর্ম পূরণ করলে আমরা আপনার নাম, ফোন নম্বর ও আপনি যে তথ্য দেন তা সংগ্রহ করি, সাথে আপনি কোন পাতা থেকে এসেছেন এবং বিজ্ঞাপনের শনাক্তকারী (যেমন utm ও fbclid)।',
  'How we use it': 'আমরা কীভাবে ব্যবহার করি',
  'To call or message you about the property you asked about, and to measure which advertising works. We never sell your details.':
    'আপনি যে প্রপার্টির কথা জানতে চেয়েছেন সে বিষয়ে ফোন বা মেসেজ করতে, এবং কোন বিজ্ঞাপন কাজ করছে তা মাপতে। আমরা কখনো আপনার তথ্য বিক্রি করি না।',
  'Cookies and analytics': 'কুকি ও অ্যানালিটিক্স',
  'With your consent we use Google Analytics, Meta Pixel and Microsoft Clarity to understand how the site is used.':
    'আপনার সম্মতি থাকলে সাইট কীভাবে ব্যবহার হচ্ছে বুঝতে আমরা Google Analytics, Meta Pixel ও Microsoft Clarity ব্যবহার করি।',
  'Your choices': 'আপনার পছন্দ',
  'To see or delete your data, email nrproperty2026@gmail.com.':
    'আপনার তথ্য দেখতে বা মুছতে nrproperty2026@gmail.com-এ ইমেইল করুন।',

  // ── Contact ──
  'We’re a call *away.*': 'আমরা এক কলের *দূরত্বে।*',
  'Call, WhatsApp or send a message. An advisor replies within one working day.':
    'কল, হোয়াটসঅ্যাপ বা মেসেজ করুন। একজন উপদেষ্টা এক কর্মদিবসের মধ্যে উত্তর দেবেন।',
  'Send a message': 'মেসেজ পাঠান',
  'How can we *help?*': 'কীভাবে *সাহায্য করতে পারি?*',
  'Site visit': 'সাইট ভিজিট',
  'See a project *in person.*': 'প্রজেক্ট দেখুন *নিজের চোখে।*',

  // ── NRB ──
  'For non-resident Bangladeshis': 'প্রবাসী বাংলাদেশিদের জন্য',
  'A home in Dhaka, *from anywhere.*': 'ঢাকায় নিজের বাড়ি, *যেকোনো জায়গা থেকে।*',
  'Video site visits, secure international payments, Power of Attorney guidance and a relationship manager in your time zone.':
    'ভিডিওতে সাইট ভিজিট, নিরাপদ আন্তর্জাতিক পেমেন্ট, পাওয়ার অব অ্যাটর্নি নিয়ে সহায়তা এবং আপনার টাইম জোনে একজন রিলেশনশিপ ম্যানেজার।',
  'Talk to an NRB advisor': 'প্রবাসী উপদেষ্টার সাথে কথা বলুন',
  'Video consultation': 'ভিডিও পরামর্শ',
  'Meet an advisor at a time that suits your time zone.': 'আপনার টাইম জোনে সুবিধামতো সময়ে উপদেষ্টার সাথে কথা বলুন।',
  'Live video site visit': 'লাইভ ভিডিও সাইট ভিজিট',
  'Walk the site and show flat on a video call.': 'ভিডিও কলে সাইট ও শো ফ্ল্যাট ঘুরে দেখুন।',
  'Booking & agreement': 'বুকিং ও চুক্তি',
  'Sign digitally or through a Power of Attorney.': 'ডিজিটালি বা পাওয়ার অব অ্যাটর্নির মাধ্যমে স্বাক্ষর করুন।',
  'International payment': 'আন্তর্জাতিক পেমেন্ট',
  'Pay through approved banking channels.': 'অনুমোদিত ব্যাংকিং চ্যানেলে পেমেন্ট করুন।',
  'Monthly updates to handover': 'হস্তান্তর পর্যন্ত মাসিক আপডেট',
  'Photos and progress reports every month.': 'প্রতি মাসে ছবি ও অগ্রগতির রিপোর্ট।',
  'How to buy from abroad': 'বিদেশ থেকে যেভাবে কিনবেন',
  'Five steps, *no flights needed.*': 'পাঁচটি ধাপ, *দেশে আসার দরকার নেই।*',
  'Payment channels': 'পেমেন্টের মাধ্যম',
  '[Placeholder] Bank transfer, remittance partners and accepted currencies.':
    '[নমুনা] ব্যাংক ট্রান্সফার, রেমিট্যান্স পার্টনার ও গ্রহণযোগ্য মুদ্রা।',
  'Power of Attorney': 'পাওয়ার অব অ্যাটর্নি',
  '[Placeholder] How to appoint a family member and attest it at your embassy.':
    '[নমুনা] পরিবারের একজনকে কীভাবে নিয়োগ দেবেন এবং দূতাবাসে সত্যায়ন করাবেন।',
  'Video site visits': 'ভিডিও সাইট ভিজিট',
  'Book a live walk-through any day of the week.': 'সপ্তাহের যেকোনো দিন লাইভ ঘুরে দেখা বুক করুন।',
  'Your relationship manager': 'আপনার রিলেশনশিপ ম্যানেজার',
  'One person who answers on WhatsApp.': 'একজন মানুষ, যিনি হোয়াটসঅ্যাপে উত্তর দেন।',
  'Payments & paperwork': 'পেমেন্ট ও কাগজপত্র',
  'The details, *handled.*': 'খুঁটিনাটি, *আমরা সামলাই।*',
  'From abroad': 'প্রবাস থেকে',
  'Bought from abroad, *handed over on time.*': 'প্রবাস থেকে কেনা, *সময়মতো হস্তান্তর।*',
  'Can I buy without visiting Bangladesh?': 'বাংলাদেশে না এসে কি কিনতে পারব?',
  '[Placeholder] Yes, through a video visit and a Power of Attorney.':
    '[নমুনা] হ্যাঁ, ভিডিও ভিজিট ও পাওয়ার অব অ্যাটর্নির মাধ্যমে।',
  'Which currencies can I pay in?': 'কোন কোন মুদ্রায় পেমেন্ট করা যায়?',
  '[Placeholder] Payment channel details.': '[নমুনা] পেমেন্ট মাধ্যমের বিস্তারিত।',
  'NRB *questions.*': 'প্রবাসীদের *প্রশ্ন।*',
  'NRB enquiry': 'প্রবাসী এনকোয়ারি',
  'Let’s talk, *in your time zone.*': 'কথা বলি, *আপনার টাইম জোনে।*',

  // ── Landowner ──
  'For landowners': 'জমির মালিকদের জন্য',
  'Your land, our craft. *A partnership you can trust.*': 'আপনার জমি, আমাদের নির্মাণ। *ভরসার অংশীদারিত্ব।*',
  'Fair share ratio, signing money, rent support during construction and a handover date written into the contract.':
    'ন্যায্য শেয়ার অনুপাত, সাইনিং মানি, নির্মাণকালে ভাড়া সহায়তা এবং চুক্তিতে লেখা হস্তান্তরের তারিখ।',
  'Submit Your Land': 'আপনার জমির তথ্য দিন',
  'Submit your land': 'আপনার জমির তথ্য দিন',
  'Share your land details': 'জমির তথ্য দিন',
  'Location, size and road width — takes 2 minutes.': 'লোকেশন, আয়তন ও রাস্তার প্রস্থ — ২ মিনিট লাগে।',
  'Free site visit & valuation': 'বিনামূল্যে সাইট ভিজিট ও মূল্যায়ন',
  'Our architect and legal team visit within [72] hours.': 'আমাদের স্থপতি ও আইনি দল [৭২] ঘণ্টার মধ্যে আসবেন।',
  'Agreement & RAJUK approval': 'চুক্তি ও রাজউক অনুমোদন',
  'Clear share ratio, signing money and approvals handled by us.':
    'স্পষ্ট শেয়ার অনুপাত, সাইনিং মানি, আর অনুমোদনের কাজ আমরাই করি।',
  'Construction to handover': 'নির্মাণ থেকে হস্তান্তর',
  'Monthly progress updates until you receive your keys.': 'চাবি হাতে পাওয়া পর্যন্ত মাসিক অগ্রগতির আপডেট।',
  'How it works': 'যেভাবে কাজ করে',
  'Four steps from *land to keys.*': 'জমি থেকে *চাবি পর্যন্ত* চারটি ধাপ।',
  'Fair share ratio': 'ন্যায্য শেয়ার অনুপাত',
  '[Placeholder] Typical ratio and how it is calculated.': '[নমুনা] সাধারণ অনুপাত এবং তা কীভাবে হিসাব হয়।',
  'Signing money': 'সাইনিং মানি',
  '[Placeholder] Paid when the agreement is signed.': '[নমুনা] চুক্তি স্বাক্ষরের সময় পরিশোধ করা হয়।',
  'Rent support': 'ভাড়া সহায়তা',
  '[Placeholder] Monthly support while your building is under construction.': '[নমুনা] ভবন নির্মাণের সময় মাসিক সহায়তা।',
  'Handover in writing': 'লিখিত হস্তান্তর',
  'The handover date is part of the contract.': 'হস্তান্তরের তারিখ চুক্তিরই অংশ।',
  'What you receive': 'আপনি যা পাবেন',
  'Everything agreed *in writing.*': 'সবকিছু *লিখিতভাবে।*',
  'Landowners on NR': 'এনআর নিয়ে জমির মালিকরা',
  'Partners who *trusted us.*': 'যাঁরা আমাদের *ভরসা করেছেন।*',
  'What size of land do you consider?': 'কত বড় জমি নিয়ে কাজ করেন?',
  '[Placeholder] Typically from [5] katha on a road of at least [20] ft.': '[নমুনা] সাধারণত কমপক্ষে [২০] ফুট রাস্তার ধারে [৫] কাঠা থেকে।',
  'Who pays for RAJUK approval?': 'রাজউক অনুমোদনের খরচ কে দেয়?',
  '[Placeholder] We handle and pay for approvals.': '[নমুনা] অনুমোদনের কাজ ও খরচ আমাদের।',
  'How long does construction take?': 'নির্মাণে কত সময় লাগে?',
  '[Placeholder] Usually [36–42] months from approval.': '[নমুনা] সাধারণত অনুমোদনের পর [৩৬–৪২] মাস।',
  'Questions landowners *ask us.*': 'জমির মালিকরা *যা জানতে চান।*',
  'Tell us about *your land.*': 'আপনার *জমির কথা* বলুন।',
  'We’ll call within one working day to arrange a free site visit.':
    'বিনামূল্যে সাইট ভিজিট ঠিক করতে আমরা এক কর্মদিবসের মধ্যে ফোন করব।',
  'Land details': 'জমির তথ্য',

  // ── About ──
  'About NR Property': 'এনআর প্রপার্টি সম্পর্কে',
  'Building Dhaka’s homes with *patience and trust.*': 'ধৈর্য ও *বিশ্বাসে* গড়ি ঢাকার বাড়ি।',
  '[Placeholder] One or two sentences about the company, its history and its promise.':
    '[নমুনা] কোম্পানি, এর ইতিহাস ও প্রতিশ্রুতি নিয়ে এক-দুই বাক্য।',
  'Our story': 'আমাদের গল্প',
  'From one building to a *neighbourhood name.*': 'একটি ভবন থেকে *এলাকার পরিচিত নাম।*',
  '[Placeholder] The company story: when it started, the first project, and what drives the team today.':
    '[নমুনা] কোম্পানির গল্প: কবে শুরু, প্রথম প্রজেক্ট, আর আজ দলকে কী এগিয়ে নেয়।',
  'Engineered for safety': 'নিরাপত্তার জন্য প্রকৌশল',
  'BNBC-compliant structure and lab-tested materials.': 'বিএনবিসি মেনে কাঠামো এবং ল্যাবে পরীক্ষিত উপকরণ।',
  'Handover on schedule': 'সময়মতো হস্তান্তর',
  'The date is written into your contract.': 'তারিখটি আপনার চুক্তিতে লেখা থাকে।',
  'Thoughtful layouts': 'ভেবেচিন্তে নকশা',
  'Light, ventilation and privacy on every floor.': 'প্রতিটি ফ্লোরে আলো, বাতাস ও গোপনীয়তা।',
  'After-sales care': 'বিক্রয়-পরবর্তী সেবা',
  'One year of free maintenance after handover.': 'হস্তান্তরের পর এক বছর বিনামূল্যে রক্ষণাবেক্ষণ।',
  'What we stand for': 'আমাদের অঙ্গীকার',
  'Four promises in *every contract.*': '*প্রতিটি চুক্তিতে* চারটি প্রতিশ্রুতি।',
  'In their words': 'তাঁদের ভাষায়',
  'Families who made NR *home.*': 'যে পরিবারগুলো এনআর-কে *বাড়ি* বানিয়েছে।',
  'Visit us': 'আমাদের কাছে আসুন',
  'Book a site visit and an advisor will walk you through.': 'সাইট ভিজিট বুক করুন, একজন উপদেষ্টা সব ঘুরিয়ে দেখাবেন।',

  // ── Home ──
  'Premium residences · Dhaka': 'প্রিমিয়াম আবাসন · ঢাকা',
  'Homes crafted with patience, *built on trust.*': 'ধৈর্যে গড়া বাড়ি, *বিশ্বাসে নির্মিত।*',
  'Thoughtfully designed apartments in Dhaka’s most sought-after neighbourhoods.':
    'ঢাকার সবচেয়ে চাহিদাসম্পন্ন এলাকায় যত্নে নকশা করা অ্যাপার্টমেন্ট।',
  'Our projects': 'আমাদের প্রজেক্ট',
  'Addresses worth *coming home to.*': 'যে ঠিকানায় *ফিরতে ভালো লাগে।*',
  'BNBC-compliant structure, lab-tested materials, earthquake-resistant design.':
    'বিএনবিসি মেনে কাঠামো, ল্যাবে পরীক্ষিত উপকরণ, ভূমিকম্প-সহনশীল নকশা।',
  'Monthly construction updates so you always know where your home stands.':
    'মাসিক নির্মাণ আপডেট, যাতে সবসময় জানেন আপনার বাড়ির কাজ কতদূর।',
  'Light, ventilation and privacy planned into every floor plan.': 'প্রতিটি ফ্লোর প্ল্যানে আলো, বাতাস ও গোপনীয়তার পরিকল্পনা।',
  'One year of free maintenance and a dedicated customer desk.': 'এক বছর বিনামূল্যে রক্ষণাবেক্ষণ এবং আলাদা কাস্টমার ডেস্ক।',
  'Why NR Property': 'কেন এনআর প্রপার্টি',
  'Built the way we’d build for our *own family.*': 'নিজের *পরিবারের জন্য* যেভাবে বানাতাম, সেভাবেই বানাই।',
  'Every NR home starts with a clear promise: honest contracts, engineered safety and a handover date we keep.':
    'প্রতিটি এনআর বাড়ির শুরু একটি স্পষ্ট প্রতিশ্রুতিতে: সৎ চুক্তি, প্রকৌশলগত নিরাপত্তা এবং কথামতো হস্তান্তর।',
  'Own land in Dhaka? Let’s build something *remarkable* on it.': 'ঢাকায় জমি আছে? চলুন তাতে *অসাধারণ কিছু* গড়ি।',
  'A transparent joint-venture partnership: fair share ratio, signing money, rent support during construction, and a handover date written into the contract.':
    'স্বচ্ছ জয়েন্ট-ভেঞ্চার অংশীদারিত্ব: ন্যায্য শেয়ার অনুপাত, সাইনিং মানি, নির্মাণকালে ভাড়া সহায়তা এবং চুক্তিতে লেখা হস্তান্তরের তারিখ।',
  'Buy your home in Dhaka — from *anywhere in the world.*': 'ঢাকায় বাড়ি কিনুন — *বিশ্বের যেকোনো প্রান্ত থেকে।*',
  'Video site visits, secure international payments, Power of Attorney guidance and a dedicated NRB relationship manager in your time zone.':
    'ভিডিওতে সাইট ভিজিট, নিরাপদ আন্তর্জাতিক পেমেন্ট, পাওয়ার অব অ্যাটর্নি সহায়তা এবং আপনার টাইম জোনে নিজস্ব প্রবাসী রিলেশনশিপ ম্যানেজার।',
  'NRB Services': 'প্রবাসী সেবা',
  'From the journal': 'ব্লগ থেকে',
  'Guides for *buyers and landowners.*': '*ক্রেতা ও জমির মালিকদের* জন্য গাইড।',
  'Read the blog': 'ব্লগ পড়ুন',
  'Get in touch': 'যোগাযোগ করুন',
  'Let’s find the home that *fits your life.*': 'খুঁজে নিই সেই বাড়ি, যা *আপনার জীবনের সাথে মেলে।*',
  'Share a few details and a property advisor will call you within one working day — no pressure, no spam.':
    'কিছু তথ্য দিন, একজন প্রপার্টি উপদেষ্টা এক কর্মদিবসের মধ্যে ফোন করবেন — কোনো চাপ নেই, কোনো স্প্যাম নেই।',

  // ── Blog posts ──
  '[Placeholder] Buying a home in Bangladesh from abroad': '[নমুনা] প্রবাস থেকে বাংলাদেশে বাড়ি কেনা',
  '[Placeholder] How a land-sharing joint venture works': '[নমুনা] জমি শেয়ারিং জয়েন্ট ভেঞ্চার যেভাবে কাজ করে',
  '[Placeholder] Buying your first apartment in Dhaka: a checklist': '[নমুনা] ঢাকায় প্রথম ফ্ল্যাট কেনা: একটি চেকলিস্ট',
  '[Placeholder] A short summary of the article that appears on the blog list and in search results.':
    '[নমুনা] লেখাটির ছোট সারাংশ, যা ব্লগ তালিকা ও সার্চ ফলাফলে দেখা যায়।',
  '[Placeholder article] Replace with a real article from the admin (Blog posts).':
    '[নমুনা লেখা] অ্যাডমিন থেকে (Blog posts) আসল লেখা দিয়ে বদলান।',
  'What to check first': 'প্রথমে যা যাচাই করবেন',
  'RAJUK approval, land ownership documents, the developer’s track record and the payment schedule.':
    'রাজউক অনুমোদন, জমির মালিকানার কাগজ, ডেভেলপারের অতীত কাজ এবং পেমেন্টের সময়সূচি।',
  'Questions to ask': 'যে প্রশ্নগুলো করবেন',
  'Ask for the approved plan, the handover date in writing and the full list of included fittings.':
    'অনুমোদিত নকশা, লিখিত হস্তান্তরের তারিখ এবং অন্তর্ভুক্ত ফিটিংসের পূর্ণ তালিকা চেয়ে নিন।',

  // ── Projects ──
  '[Project name A]': '[প্রজেক্টের নাম A]',
  '[Project name B]': '[প্রজেক্টের নাম B]',
  '[Project name C]': '[প্রজেক্টের নাম C]',
  '[Project name D]': '[প্রজেক্টের নাম D]',
  '[Placeholder project — replace with real details]': '[নমুনা প্রজেক্ট — আসল তথ্য দিয়ে বদলান]',
  'Replace this text with the real project description from the admin (Projects → this project → Details).':
    'অ্যাডমিন থেকে (Projects → এই প্রজেক্ট → Details) আসল বিবরণ দিয়ে এই লেখা বদলান।',
  '1 per unit': 'প্রতি ইউনিটে ১টি',
  '[Placeholder price]': '[নমুনা দাম]',
  'Type A': 'টাইপ A',
  'Type B': 'টাইপ B',
  'Type C': 'টাইপ C',
  South: 'দক্ষিণ',
  'South-East': 'দক্ষিণ-পূর্ব',
  'North-East': 'উত্তর-পূর্ব',
  '[Hospital]': '[হাসপাতাল]',
  '[University]': '[বিশ্ববিদ্যালয়]',
  '[Shopping mall]': '[শপিং মল]',
  'Hazrat Shahjalal Airport': 'হযরত শাহজালাল বিমানবন্দর',
  'Handed over': 'হস্তান্তরিত',
  'Design & approvals': 'নকশা ও অনুমোদন',
  '[Current stage]': '[বর্তমান ধাপ]',
  'Price on request': 'দাম জানতে যোগাযোগ করুন',
  '[Placeholder] What happened on site this month.': '[নমুনা] এই মাসে সাইটে যা কাজ হয়েছে।',
  '[Placeholder] Previous month’s update.': '[নমুনা] আগের মাসের আপডেট।',
  '[Placeholder] An earlier update.': '[নমুনা] পুরনো আপডেট।',
  'Is the project approved by RAJUK?': 'প্রজেক্টটি কি রাজউক অনুমোদিত?',
  'Yes. Approval number: [RAJUK no.].': 'হ্যাঁ। অনুমোদন নম্বর: [রাজউক নং]।',
  'Can I pay in instalments?': 'কিস্তিতে পরিশোধ করা যাবে?',
  '[Placeholder] Down payment followed by monthly instalments until handover.':
    '[নমুনা] ডাউন পেমেন্টের পর হস্তান্তর পর্যন্ত মাসিক কিস্তি।',
  'Do you help with home loans?': 'হোম লোনে সহায়তা করেন?',
  '[Placeholder] We can introduce you to partner banks.': '[নমুনা] আমরা পার্টনার ব্যাংকের সাথে যোগাযোগ করিয়ে দিতে পারি।',

  // ── Testimonials ──
  '[Customer name]': '[গ্রাহকের নাম]',
  'Apartment owner · [Project name A]': 'ফ্ল্যাট মালিক · [প্রজেক্টের নাম A]',
  '[Placeholder] We received our keys two weeks before the promised date. The finishing quality is better than the show flat.':
    '[নমুনা] প্রতিশ্রুত তারিখের দুই সপ্তাহ আগেই চাবি পেয়েছি। ফিনিশিং শো ফ্ল্যাটের চেয়েও ভালো।',
  'Landowner · Dhanmondi': 'জমির মালিক · ধানমন্ডি',
  '[Placeholder] As a landowner I was nervous about joint ventures. NR explained every clause and kept every promise.':
    '[নমুনা] জমির মালিক হিসেবে জয়েন্ট ভেঞ্চার নিয়ে দুশ্চিন্তায় ছিলাম। এনআর প্রতিটি শর্ত বুঝিয়েছে, প্রতিটি কথা রেখেছে।',
  'NRB buyer · Canada': 'প্রবাসী ক্রেতা · কানাডা',
  '[Placeholder] I bought from Toronto without visiting once. Video site walks and monthly photos made it effortless.':
    '[নমুনা] একবারও না এসে টরন্টো থেকে কিনেছি। ভিডিওতে সাইট দেখা আর মাসিক ছবিতে সব সহজ হয়ে গেছে।',

  // ── Areas ──
  'Schools and hospitals': 'স্কুল ও হাসপাতাল',
  '[Placeholder] The nearest schools, colleges and hospitals, with travel times.':
    '[নমুনা] কাছের স্কুল, কলেজ ও হাসপাতাল, যেতে কত সময় লাগে সহ।',
  'Getting around': 'যাতায়াত',
  '[Placeholder] Main roads, distance to the airport and to business districts.':
    '[নমুনা] প্রধান সড়ক, বিমানবন্দর ও বাণিজ্যিক এলাকা থেকে দূরত্ব।',

  // ── Team ──
  '[Advisor name]': '[উপদেষ্টার নাম]',
  'Sales Manager': 'সেলস ম্যানেজার',
  '[Managing Director name]': '[ব্যবস্থাপনা পরিচালকের নাম]',
  'Managing Director': 'ব্যবস্থাপনা পরিচালক',
  '[Placeholder] Short biography.': '[নমুনা] সংক্ষিপ্ত পরিচিতি।',

  // ── Footer, announcement, popup, settings, SEO, contact ──
  'Building homes in Dhaka with honest contracts, engineered safety and handovers we keep.':
    'সৎ চুক্তি, প্রকৌশলগত নিরাপত্তা আর কথামতো হস্তান্তরে ঢাকায় বাড়ি গড়ি।',
  'Ongoing projects': 'চলমান প্রজেক্ট',
  'Upcoming projects': 'আসন্ন প্রজেক্ট',
  'Completed projects': 'সম্পন্ন প্রজেক্ট',
  Explore: 'দেখুন',
  Areas: 'এলাকা',
  'About us': 'আমাদের কথা',
  'NRB services': 'প্রবাসী সেবা',
  Company: 'কোম্পানি',
  Support: 'সহায়তা',
  '© {year} NR Property. All rights reserved.': '© {year} এনআর প্রপার্টি। সর্বস্বত্ব সংরক্ষিত।',
  '[Placeholder] Limited units left at [Project name A] — book a site visit this week.':
    '[নমুনা] [প্রজেক্টের নাম A]-এ সীমিত ইউনিট বাকি — এই সপ্তাহেই সাইট ভিজিট বুক করুন।',
  '[Placeholder offer]': '[নমুনা অফার]',
  'Leave your number and an advisor will call you.': 'আপনার নম্বর দিন, একজন উপদেষ্টা ফোন করবেন।',
  'Years of building': 'বছরের অভিজ্ঞতা',
  'Projects completed': 'সম্পন্ন প্রজেক্ট',
  'Families handed over': 'পরিবার পেয়েছে চাবি',
  'RAJUK-approved plans': 'রাজউক অনুমোদিত নকশা',
  '[REHAB no.]': '[রিহ্যাব নং]',
  '[Trade licence no.]': '[ট্রেড লাইসেন্স নং]',
  'NR Property · Premium apartments in Dhaka': 'এনআর প্রপার্টি · ঢাকায় প্রিমিয়াম অ্যাপার্টমেন্ট',
  'Thoughtfully designed apartments in Bashundhara, Dhanmondi, Gulshan and Uttara. RAJUK-approved, handed over on schedule.':
    'বসুন্ধরা, ধানমন্ডি, গুলশান ও উত্তরায় যত্নে নকশা করা অ্যাপার্টমেন্ট। রাজউক অনুমোদিত, সময়মতো হস্তান্তর।',
  '[Office address], Dhaka': '[অফিসের ঠিকানা], ঢাকা',

  // ── Form options ──
  'Morning (10 am – 1 pm)': 'সকাল (১০টা – ১টা)',
  'Afternoon (1 pm – 4 pm)': 'দুপুর (১টা – ৪টা)',
  'Evening (4 pm – 7 pm)': 'বিকেল (৪টা – ৭টা)',
  'Under ৳1.5 Cr': '৳১.৫ কোটির নিচে',
  '৳1.5 – 2.5 Cr': '৳১.৫ – ২.৫ কোটি',
  '৳2.5 – 4 Cr': '৳২.৫ – ৪ কোটি',
  'Above ৳4 Cr': '৳৪ কোটির বেশি',
  'Morning (Bangladesh time)': 'সকাল (বাংলাদেশ সময়)',
  'Afternoon (Bangladesh time)': 'দুপুর (বাংলাদেশ সময়)',
  'Evening (Bangladesh time)': 'সন্ধ্যা (বাংলাদেশ সময়)',
  'WhatsApp message first': 'আগে হোয়াটসঅ্যাপে মেসেজ',
  'Buying an apartment': 'ফ্ল্যাট কেনা',
  'Land / joint venture': 'জমি / জয়েন্ট ভেঞ্চার',
  'Something else': 'অন্য কিছু',
  'Submit Land Details': 'জমির তথ্য পাঠান',
  'Send Enquiry': 'এনকোয়ারি পাঠান',
  'Send Message': 'মেসেজ পাঠান',
}

const AREA_BN: Record<string, string> = {
  'Bashundhara R/A': 'বসুন্ধরা আ/এ',
  Dhanmondi: 'ধানমন্ডি',
  Gulshan: 'গুলশান',
  Uttara: 'উত্তরা',
  Mirpur: 'মিরপুর',
}
const DIGITS = '০১২৩৪৫৬৭৮৯'
const bnNum = (s: string) => s.replace(/\d/g, (d) => DIGITS[Number(d)]!)

/** Sentences built from a template in the seed, translated by pattern. */
const PATTERNS: [RegExp, (...m: string[]) => string][] = [
  [
    /^\[Placeholder\] \[Project name (\w)\] is a (\d+)-storey residence on a (\d+)-ft road in (.+?)\. Each floor holds a small number of apartments, arranged so that every home receives morning light and cross-ventilation\.$/,
    (_, l, floors, road, area) =>
      `[নমুনা] [প্রজেক্টের নাম ${l}] ${AREA_BN[area!] ?? area}-এ ${bnNum(road!)} ফুট রাস্তার ধারে ${bnNum(floors!)} তলা আবাসিক ভবন। প্রতি ফ্লোরে অল্প কয়েকটি অ্যাপার্টমেন্ট, এমনভাবে সাজানো যাতে প্রতিটি বাড়িতে সকালের আলো আর এপাশ-ওপাশ বাতাস আসে।`,
  ],
  [
    /^\[Plot, road, block\], (.+), Dhaka$/,
    (_, area) => `[প্লট, রোড, ব্লক], ${AREA_BN[area!] ?? area}, ঢাকা`,
  ],
  [
    /^\[Placeholder\] A short introduction to living in (.+): what makes it sought-after and who it suits\.$/,
    (_, area) => `[নমুনা] ${AREA_BN[area!] ?? area}-এ বসবাসের ছোট পরিচিতি: কেন এলাকাটি জনপ্রিয় এবং কাদের জন্য উপযুক্ত।`,
  ],
]

export function translate(s: string): string {
  if (DICT[s]) return DICT[s]
  if (AREA_BN[s]) return AREA_BN[s]
  for (const [re, fn] of PATTERNS) {
    const m = s.match(re)
    if (m) return fn(...m)
  }
  return s
}

/** Keys whose values are codes, links or ids, never visible copy. */
const SKIP = new Set(['id', 'blockType', 'slug', 'href', 'url', 'background', 'variant', 'icon', 'form', 'filter', 'width', 'anchorId', '_status', 'type', 'mode', 'value', 'tag', 'format', 'direction', 'source', 'status', 'segment', 'category', 'email', 'phone', 'whatsapp', 'hotline', 'mapEmbedUrl', 'videoUrl', 'titleTemplate', 'createdAt', 'updatedAt', 'publishedAt', 'date', 'globalType'])

function walk(v: unknown, key = ''): unknown {
  if (typeof v === 'string') return SKIP.has(key) ? v : translate(v)
  if (Array.isArray(v)) return v.map((x) => walk(x, key))
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, SKIP.has(k) ? x : walk(x, k)]))
  return v
}

const COLLECTIONS = ['pages', 'posts', 'projects', 'testimonials', 'areas', 'team'] as const
const GLOBALS = ['footer', 'announcement', 'popup', 'siteSettings', 'seo', 'contact', 'forms'] as const

/** Writes the Bangla version of every seeded document. Existing Bangla text is kept. */
export async function seedBangla(payload: Payload) {
  for (const collection of COLLECTIONS) {
    const res = await payload.find({ collection, locale: 'bn', fallbackLocale: 'en', depth: 0, limit: 500, pagination: false, overrideAccess: true })
    for (const doc of res.docs) {
      const { id, createdAt: _c, updatedAt: _u, ...rest } = doc as unknown as Record<string, unknown> & { id: number }
      const data = walk(rest) as Record<string, unknown>
      await payload.update({ collection, id, locale: 'bn', data, overrideAccess: true })
    }
  }
  for (const slug of GLOBALS) {
    const doc = (await payload.findGlobal({ slug, locale: 'bn', fallbackLocale: 'en', depth: 0, overrideAccess: true })) as unknown as Record<string, unknown>
    const { id: _i, createdAt: _c, updatedAt: _u, globalType: _g, ...rest } = doc
    await payload.updateGlobal({ slug, locale: 'bn', data: walk(rest) as never, overrideAccess: true })
  }
}
