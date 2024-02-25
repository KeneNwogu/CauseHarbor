## READme: Running the CauseHarbour project

This document provides instructions on how to set up the CauseHarbour api and client comprised of two separate sub-projects: a backend and a frontend. 

**Prerequisites:**

* Node.js and npm (or yarn) installed on your system.
* A code editor or IDE of your choice.
* Basic understanding of command-line interface (CLI).

**Project Structure:**

```
cause-harbour/
├── backend/
│   ├── package.json
│   ├── ... (backend source code files)
│   └── ... (backend specific configurations)
└── frontend/
    ├── package.json
    ├── ... (frontend source code files)
    └── ... (frontend specific configurations)
```

**Instructions:**

1. **Clone or Download the Project:**

   Open a terminal window and navigate to the directory where you want to work on the project. Then, use `git clone` or download the entire project repository to your local system.

2. **Navigate to the Backend Project:**

   ```bash
   cd your-project/backend
   ```

3. **Install Backend Dependencies:**

   Run the following command to install all the necessary dependencies for the backend project as listed in the `package.json` file:

   ```bash
   npm install
   ```

   (Alternatively, if your project uses yarn, use the command `yarn install` instead)

4. **Run the Backend Development Server:**

   The Backend project for Cause Harbour is run with the following command:

   ```bash
   npm run dev
   ```

5. **Navigate to the Frontend Project:**

   Once the backend server is running, switch directories to the frontend project:

   ```bash
   cd ../frontend
   ```

6. **Install Frontend Dependencies:**

   Similar to the backend, install the frontend project's dependencies using:

   ```bash
   npm install
   ```

7. **Run the Frontend Development Server:**

   The command to run the Angular development server is:

   ```bash
   npm run start
   ```

8. **Access the Application:**

   The application should be accessible in your web browser, typically at `http://localhost:4200`.

**Additional Notes:**

* Depending on your project setup, you might need to configure the frontend project to communicate with the backend server at its specific URL (e.g., `http://localhost:3000` for a backend server running on port 5000). Refer to your project's documentation for specific configuration instructions.
* This guide provides a general overview of the process. Specific commands and configurations may differ based on your chosen frameworks and project setup. 
