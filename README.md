# Contact Form Fix Guide

The contact form in this project is now connected to `EmailJS`, but it will only send messages to you after you finish the EmailJS setup.

Before this fix, the form only showed a fake success message in the UI and did not send anything to your email.

## What was fixed

- The submit action in `src/components/sections/ContactSection.tsx` now sends real form data through `EmailJS`.
- Environment variables were added so your EmailJS keys can be stored safely.
- Validation is kept in place, so empty or invalid fields are blocked before sending.

## Files used for this fix

- `src/components/sections/ContactSection.tsx`
- `.env.example`
- `src/vite-env.d.ts`

## Important

If you do not create an EmailJS account and add your real keys, the form will still not reach your inbox.

## Step 1: Create an EmailJS account

1. Go to `https://www.emailjs.com/`
2. Create an account and log in.
3. Verify your email address if EmailJS asks for it.

## Step 2: Add your email service

1. In EmailJS dashboard, open `Email Services`.
2. Add a service.
3. Choose the provider you want:
   - Gmail
   - Outlook
   - Other supported provider
4. Connect the email address where you want to receive form messages.
5. After connecting, copy the `Service ID`.

Example:

```text
service_abc1234
```

## Step 3: Create the email template

1. In EmailJS dashboard, open `Email Templates`.
2. Create a new template.
3. Copy the `Template ID`.
4. Use variables that match this project exactly.

Use these variables in the template:

- `{{from_name}}`
- `{{from_email}}`
- `{{phone}}`
- `{{budget}}`
- `{{message}}`
- `{{reply_to}}`

### Recommended template subject

```text
New portfolio enquiry from {{from_name}}
```

### Recommended template body

```text
You received a new message from your portfolio website.

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Budget: {{budget}}

Message:
{{message}}

Reply to:
{{reply_to}}
```

### Recommended reply-to setting

Set the template `Reply-To` field to:

```text
{{reply_to}}
```

This helps you reply directly to the visitor from your inbox.

## Step 4: Get your public key

1. In EmailJS dashboard, open `Account`.
2. Find `Public Key`.
3. Copy it.

Example:

```text
ABCD1234xyz
```

## Step 5: Create your local `.env` file

In the project root, create a file named `.env`.

Path:

```text
anandhraj-elite-web-craft/.env
```

Copy this:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

Then replace the example values with your real EmailJS values.

Example:

```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
VITE_EMAILJS_PUBLIC_KEY=ABCD1234xyz
```

## Step 6: Restart the app

After saving `.env`, restart the Vite dev server.

If you are running the project locally:

```bash
npm run dev
```

If the server is already running, stop it and start it again. Vite only reads `.env` values when the server starts.

## Deployment setup

If the site works locally but fails after deployment, the most common reason is missing environment variables.

Set these variables in your hosting dashboard:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

This project now includes deploy config for common hosts:

- `vercel.json`
- `netlify.toml`
- `public/_redirects`
- `public/_headers`

### Vercel

1. Import the GitHub repository
2. Framework preset: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add the three `VITE_EMAILJS_*` environment variables in project settings

### Netlify

1. Import the GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add the three `VITE_EMAILJS_*` environment variables in site settings

### GitHub Pages

GitHub Pages is not recommended for this version if you need the contact form and SPA behavior to work reliably with environment variables.

Use Vercel or Netlify for the easiest deployment.

## Step 7: Test the form

Fill the form with:

- A valid name
- A valid email address
- A budget
- A message longer than 10 characters

Then click `Send Message`.

If everything is correct:

- the button will show `Sending...`
- you should see a success toast
- the message should arrive in your connected email inbox

## Why messages may still not arrive

If the form says success but you still do not receive email, check these things:

1. The `Service ID` is correct.
2. The `Template ID` is correct.
3. The `Public Key` is correct.
4. The EmailJS template uses the same variable names as this project.
5. Your connected email service in EmailJS is active.
6. The message did not go to spam or junk.
7. The EmailJS account has not hit its usage limit.

## Variables sent by this project

This project sends:

```text
from_name
from_email
phone
budget
message
reply_to
```

If your EmailJS template uses different names, the email may arrive blank or broken.

## Where the send happens in code

The real send now happens here:

`src/components/sections/ContactSection.tsx`

It uses this EmailJS call:

```ts
await emailjs.send(
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  {
    from_name: result.data.name,
    from_email: result.data.email,
    phone: result.data.phone || "Not provided",
    budget:
      result.data.budget === "custom"
        ? `Custom: Rs. ${result.data.customBudget}`
        : result.data.budget,
    message: result.data.details,
    reply_to: result.data.email,
  },
  EMAILJS_PUBLIC_KEY,
);
```

## If you want messages to be more reliable

EmailJS is simple and works well for portfolio sites, but it runs from the browser.

For stronger production reliability later, you can switch to:

- Formspree
- Web3Forms
- Resend with a backend
- Nodemailer with your own server

For now, EmailJS is enough and it matches this project.

## Final checklist

- EmailJS account created
- Email service connected
- Email template created
- Correct variables added to template
- Public key copied
- `.env` file created
- Vite server restarted
- Form tested with real data

If all of the above is done correctly, messages sent from the contact form should come to your email.
