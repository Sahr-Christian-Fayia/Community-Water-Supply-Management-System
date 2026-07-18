# CWSMS — Community Water Supply Management System

A browser-based management system for tracking community water supply households and payment records.

---

## Overview

CWSMS is a frontend web application that allows water supply administrators to register households, manage resident records, and record monthly water payment transactions. The system uses Sierra Leonean Leones (SLL) as its currency and is tailored for community-level water management.

---

## Project Structure

```
cwsms/
├── index.html               # Forgot Password page
├── register_household.html  # Register a new household
├── manage_household.html    # View, search, edit, and delete households
├── record_payment.html      # Record monthly water payments
├── style.css                # Global stylesheet
└── script.js                # All page logic and interactivity
```

---

## Pages & Features

### Forgot Password (`index.html`)
- Email input with basic format validation
- Simulated password reset link delivery
- Inline success/error feedback messages

### Register Household (`register_household.html`)
- Form fields: Household Name, Address, Contact Number, Username, Password, Confirm Password
- Client-side validation:
  - Password match check
  - Minimum password length (6 characters)
  - Phone number format validation
- Toggle password visibility (show/hide)
- Cancel with confirmation prompt
- Success feedback on registration

### Manage Households (`manage_household.html`)
- Paginated table displaying registered households (5 per page)
- Search by household name or contact number
- Edit household details via a modal dialog
- Delete households with a confirmation prompt
- Pagination controls (Previous / Next)

### Record Payment (`record_payment.html`)
- Search for a household by name or by Household ID
- Displays household details and current payment status (PAID / UNPAID)
- Payment form fields:
  - Payment Month (dropdown, Jan–Dec 2026)
  - Amount (SLL)
  - Payment Date (defaults to today)
  - Payment Method: Cash, Bank Transfer, or Mobile Money
- Updates household status to PAID on successful submission
- Cancel with confirmation prompt

---

## Navigation (Sidebar)

All dashboard pages share a consistent sidebar with links to:

| Item | Page |
|---|---|
| Dashboard | *(placeholder)* |
| Register Household | `register_household.html` |
| Manage Households | `manage_household.html` |
| Record Payment | `record_payment.html` |
| View Payments | *(placeholder)* |
| Audit Reports | *(placeholder)* |
| Reports | *(placeholder)* |
| Notifications | *(placeholder)* |
| Backup Data | *(placeholder)* |
| Logout | *(placeholder)* |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (`style.css`) |
| Logic | Vanilla JavaScript (`script.js`) |
| Data | In-memory JavaScript arrays (no backend) |

> **Note:** This is a frontend-only prototype. All data is held in memory and resets on page refresh. API calls are simulated with `setTimeout`.

---

## Getting Started

No build tools or dependencies are required.

1. Clone or download the project files.
2. Open any `.html` file directly in a modern web browser.
3. Navigate between pages using the sidebar links.

```bash
# Example — open in your default browser (macOS)
open index.html

# Example — open in your default browser (Linux)
xdg-open index.html
```

---

## Sample Household Data

The following households are pre-loaded for development and testing:

| ID | Name | Contact | Address |
|---|---|---|---|
| HH-101 | Kamara Family | SLL 539-5555 | 23 Main St. |
| HH-102 | Sesay Residence | SLL 569-5510 | 45 Liberty Ave. |
| HH-103 | Jallah Household | SLL 712-3334 | 67 Cole St. |
| HH-104 | Conteh Home | SLL 787-2224 | 89 Heritage Rd. |
| HH-105 | Mansaray Villa | SLL 890-5678 | 101 Pine St. |
| HH-106 | Koroma Estate | SLL 234-5678 | 12 Oak Avenue |
| HH-107 | Bangura House | SLL 345-6789 | 34 Elm Street |
| HH-108 | Turay Villa | SLL 456-7890 | 56 Maple Drive |
| HH-109 | Kamara Residence | SLL 567-8901 | 78 Cedar Lane |
| HH-110 | Fofana Home | SLL 678-9012 | 90 Birch Road |

---

## Future Development

Suggested enhancements for a production-ready system:

- Backend integration (REST API or database) for persistent data storage
- User authentication and role-based access control
- Dashboard with payment summary statistics and charts
- Export payment records to PDF or Excel
- SMS/email payment reminders for unpaid households
- Full implementation of placeholder sidebar pages (Reports, Notifications, etc.)

---

## License

Community Water Supply © 2026. All rights reserved.