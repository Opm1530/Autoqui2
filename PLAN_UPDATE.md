I have updated the plan to support the scalable SaaS architecture you requested.

**Key Features:**
1.  **Multi-Tenancy**: Data (Products, Orders, Employees) will be scoped to each Company.
2.  **Super Admin**: Can create Companies, configure AI settings, and create the initial Owner account without logging out (using a secondary app trick).
3.  **Owner Capabilities**: Can manage Products (if enabled by AI config) and their Team (Employees).
4.  **Employee Role**: New role with restricted access (Orders/Products only).

I will start by setting up the database services and updating the authentication system to handle user creation properly. Shall I proceed?
