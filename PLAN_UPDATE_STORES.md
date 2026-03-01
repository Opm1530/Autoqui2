I have updated the plan to include **Store Management** directly within the Company creation process.

**Data Model Updates**:
*   Companies will now have a `stores` array.
*   Each store will have: Name, Address (for location routing), and WhatsApp (for order routing).

**UI Updates**:
*   The "Create Company" modal will now let you add multiple stores dynamically (click "Add Store" -> type details).

This structure enables your AI (via n8n) to read the company's full configuration and route orders intelligently based on the customer's location.

I will proceed with updating the `Companies.ts` interface.
