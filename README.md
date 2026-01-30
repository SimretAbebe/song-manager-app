# Song Manager App

A modern full-stack application to manage a list of Ethiopian songs, built with a robust React frontend and a simulated backend.

## Features

-   **React Frontend:** Built from scratch with Webpack & Babel (no Create React App).
-   **State Management:** Redux Toolkit for predictable state, with Redux-Saga for handling side effects.
-   **Styling:** Emotion for powerful CSS-in-JS theming and responsive design.
-   **Mock API:** MirageJS to simulate a RESTful API for songs (GET, POST, PUT, DELETE) with Ethiopian song data.
-   **Performance:** Lazy loading of components using `React.lazy` and `Suspense` for optimized bundle size.
-   **Testing:** Jest for unit tests (reducers) and component tests.

## Technologies Used

**Frontend:**
-   ReactJS
-   Redux Toolkit
-   Redux-Saga
-   Emotion (CSS-in-JS)
-   Webpack
-   Babel

**Backend (Simulated):**
-   MirageJS
-   Faker.js

**Testing:**
-   Jest
-   React Testing Library

## Setup and Run

To get the project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SimretAbebe/song-manager-app.git
    cd song-manager-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```

    The application will open in your browser at `http://localhost:3003`.

4.  **Run tests:**
    ```bash
    npm test
    ```

