# WhatsApp Cloud API – MVP Integration Plan (No BSP, Low Cost)

## Purpose

This document captures the **decision, constraints, and exact steps** for integrating **WhatsApp Cloud API directly from Meta** for the MVP stage of Arkasoft, without using third-party providers (BSPs) and without upfront company registration.

The goal is to:

- Go live fast
- Spend near-zero money
- Stay Meta-policy compliant
- Allow smooth migration to production later

---

## Key Constraints

- No registered company yet
- No GST / CIN
- Limited budget
- Founder is employed full-time elsewhere
- MVP first, revenue later

---

## High-Level Decision Summary

| Item | Decision |
|----|----|
| WhatsApp Integration | Meta WhatsApp **Cloud API (Direct)** |
| BSP / Provider | ❌ Not used |
| Business Entity | Individual / Family-owned (Parent as owner) |
| Domain | Temporary domain (friend-owned) |
| Landing Page | GitHub Pages |
| Server | Old PC (self-hosted) |
| Public Exposure | Cloudflare Tunnel (no raw IP exposure) |
| Email | Domain-based (Zoho / routing) |
| AI Usage | Internal only (not marketed as chatbot) |

---

## Why WhatsApp Cloud API (Meta Direct)

- Hosted by Meta (no infra cost)
- No BSP monthly fees
- Official, long-term supported
- Only pay Meta conversation charges when applicable
- Suitable for MVP testing

Official Docs:  
<https://developers.facebook.com/docs/whatsapp/cloud-api/get-started>

---

## Domain Strategy (MVP)

### Current Situation

- Desired domain: `arkasoft.ai`
- Cost too high for now

### MVP Decision

- Use **friend’s domain** temporarily
- Domain must look legitimate and tech/business related

### Allowed by Meta

- Website URL **can be changed later**
- Business Manager settings can be updated
- WhatsApp number does **not** need re-registration

### Future Migration

1. Buy `arkasoft.ai`
2. Deploy same site content
3. Update:
   - Business Manager website URL
   - App settings
   - Privacy Policy & Terms links

---

## Business Email Requirement

Meta does **not accept free emails** like Gmail/Yahoo.

### MVP Setup

- Email: `contact@<friend-domain>`
- Provider options:
  - Zoho Mail (free)
  - Cloudflare Email Routing

Used for:

- Meta Business Manager
- App contact
- Verification communication

---

## Landing Page (Mandatory)

### Purpose

- Establish business legitimacy
- Explain WhatsApp usage clearly
- Pass Meta manual review

### Hosting

- GitHub Pages
- Custom domain (friend’s)

### Required Pages

- `/` (Home)
- `/privacy-policy`
- `/terms`

### Safe Wording (Important)

Use:

- Customer notifications
- Campaign messaging
- Business communication
- Customer engagement

Avoid:

- AI chatbot
- LLM assistant
- ChatGPT on WhatsApp

> AI (RAG) is allowed internally but **not marketed via WhatsApp**

---

## Server & Infrastructure (MVP)

### Server

- Old PC (friend-owned)
- Linux (Ubuntu Server preferred)
- Used for:
  - WhatsApp Webhooks
  - CI/CD (GitHub self-hosted runner)
  - Backend APIs

### Public Access

❌ Do NOT expose raw IP or ports

✅ Use:

- Cloudflare Tunnel
- Cloudflare proxy + HTTPS

Benefits:

- No port forwarding
- Free SSL
- DDoS protection

---

## WhatsApp Cloud API Setup – Steps

### 1. Meta Business Manager

- Create business as **Individual**
- Business name: Arkasoft
- Owner: Parent (Mother/Father)
- Website: Friend’s domain
- Email: Domain-based email

Link: <https://business.facebook.com/>

---

### 2. Meta Developer App

- App Type: Business
- Add Product: WhatsApp

Link: <https://developers.facebook.com/>

---

### 3. WhatsApp Configuration

- Add **fresh phone number**
- Verify via OTP
- Obtain:
  - Phone Number ID
  - Business Account ID
  - Access Token

---

### 4. Webhook Setup

- HTTPS endpoint (NodeTS)
- Verification challenge handling
- Events:
  - messages
  - message_status
  - message_reads

Meta only validates:

- HTTPS
- Correct challenge response

---

## CI/CD (MVP)

- GitHub Actions
- Self-hosted runner on old PC
- Build + deploy containers
- Minimal automation initially

---

## Legal & Employment Safety

- Product in parent’s name
- No employer IP or resources used
- Personal time development
- Common and safe early-stage practice in India

---

## Known Risks & Mitigations

| Risk | Mitigation |
|----|----|
| Meta rejection | Use compliant wording |
| Domain change later | Allowed by Meta |
| Server downtime | Cloudflare Tunnel |
| AI policy issues | Don’t market AI on WhatsApp |

---

## MVP Definition of Done

- WhatsApp number approved
- Webhook receiving messages
- Messages sent via Cloud API
- Landing page live
- Zero BSP dependency

---

## Future Improvements (Post-Revenue)

- Buy `arkasoft.ai`
- Business verification
- Higher WhatsApp message tiers
- Production-grade infra
- Formal company registration

---

## References

- WhatsApp Cloud API Docs  
  <https://developers.facebook.com/docs/whatsapp/cloud-api/get-started>
- Meta Business Manager  
  <https://business.facebook.com/>

## ArkaConnect - Ai Powred Marketing Tool

### Bussiness Idea

- Target users are small shops, tution centers, enterprices, goverment and who ever wanna send messages or run campagain throught whatsapp to customers.
- Core problem small bussiness cannot grow to large level without marketing also marketing benifits customers they will come to know the products they needed.
- Whatsapp is trusted platform so i chose this, small insta pages too can market their bussiness in whtsapp using my product.
- My SaaS wins because i have very low plans for my customers small bussiness will use it i also have planned to provide full assistantce and localize globalize my product so small bussiness world wide will use mine i am happy even if 10 customers uses mine and 500 rupees per sub 10*500 = 5,000 i am happy, i dont plan on hiring a team until i alone make 1 crore without any investors.
- AI i use my own inference to generate text personalized messages for customers and dashboard analytical datas i will build ML models for data analyctis and stuffs as i needed, cause according to me having one brain do all the jobs is not as efficent as having multiple brains to do the job which the brain spealicied with.

### Product Spec for MVP

- Campagains occationaly festival times -> festival messages, onboarding -> onboarding messages, and so on...
- Bussiness building strategy advisor chat bot.
- Bussiness ROI dashboard.
- Contacted history (user to customers and customer to user).
- Activity history.
- Customized campagain messages generation with previous context.
- Internal RAG to get data for LLM.
- Can also update their available stocsk and stuffs a mini warehouse management.
- more will be coming releated to enterley to develop bussiness be it what ever bussniness.
- Pricings free ( with no AI, limited messages and customers per campagain), pro with unlimited customers to add in campagain but no previous context just in customized message generation for occation - 3,000 rupees per month, Enterprice (custom plans all custmizable unlimited) - 10,000 rupee per month.
- All the above is not including integration cost just platform fees integrations seperate billing.
- Scale i am expecting 30 - 40 customers enterprice 10, pro 10 20 - 25 free.
- Secoruty Oauth and SSO logins i will implment it after launching MVP with basic auth.

### High-Level Design

- client, server, and LLM, ML inference.
- Lightewight build client, containerized server with k3 or k8 NGINX, domain in cloudflare.
- MERN stack for AI python , API layer in express.
- Data flow mean ? i dont know much about proper HLD or LLD.
- I have not yet decided i need more time to think about scalability and relaiability in short i plan to keep server up all the time scale wont be much until product customer is out of india i think.

### Low level Design

- I need time to comeup with one but i have decided to use microservice, queue system for payments.

### Ai integrations

- I mentioned in Product spec anything other than that i need to think.

### Engineering and scaling

- CICD - Githubactions Docker kubernetes.
- feature flags mean to show feature in user interaface ? if yes then flags will be in company level (shops or any name i need to comeup with).
- Multi tentancy mean ?
- Oauth, SSO, sessions.
- Cost optimizations ? self hosting i just need to cover my food electricity bill and domain rent everting i need to pay off with customers money and i need to make some money to save some.
