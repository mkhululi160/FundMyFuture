# 💼 FundMyFuture + LocalLink

> **From funding to income. Bridging the transport barrier for South African youth.**

A dual-purpose mobile application that helps students find bursaries and helps job seekers find local gigs with real take-home pay calculations.

Built for the **FNB App of the Year Hackathon 2026** — *Jobs & Economic Resilience* category.

---

## 🎯 The Problem

South Africa's youth face two interconnected barriers:

**Education Barrier:**
- Students miss NSFAS and bursary deadlines because they can't find funding.
- The application process is fragmented across dozens of websites.
- Many students don't know which bursaries they qualify for.

**Employment Barrier:**
- Youth unemployment is over 45%.
- A R300 job is worthless if R100 goes to taxi fare.
- Transport costs are a hidden barrier to economic resilience.

---

## 💡 Our Solution

### FundMyFuture (Funding Navigator)
- 🎯 **Eligibility Matcher** — Answer 3 questions → get a personalised bursary list.
- 📚 **Bursary Directory** — Browse NSFAS, Sasol, Allan Gray, Funza Lushaka.
- 🔒 **Document Vault** — Store your ID, matric results, and proof of income.

### LocalLink (Hyper-Local Gig Finder)
- 💰 **Net Take-Home Calculator** — See your pay after transport costs.
- 🚶 **Walking vs Taxi Filter** — Find jobs within walking distance.
- 📍 **Hyper-Local Feed** — Sorted by net pay, not gross pay.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React Native (Expo), TypeScript |
| Backend | Firebase Firestore |
| Storage | Expo Document Picker |
| Navigation | React Navigation (Stack) |
| Linking | Expo Linking |

---

## 📱 Screens

| Screen | Description |
|--------|-------------|
| Home | Dashboard with stats and 4 quick actions |
| Matcher | 3-step quiz to find eligible bursaries |
| Directory | Filterable list of all bursaries |
| Vault | Upload and store documents securely |
| Jobs | Hyper-local gig feed sorted by net pay |
| JobDetail | Job detail + transport cost calculator |

---

## 📊 Transport Cost Calculator Example

| Job | Gross | Transport | Net Take-Home |
|-----|-------|-----------|---------------|
| Event Cleanup Crew | R300 | R80 | **R220** |
| Painters Assistant | R250 | R60 | **R190** |
| Stock Packer (walking) | R180 | R0 | **R180** |

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/fundmyfuture-locallink.git
cd fundmyfuture-locallink
npm install
npx expo start