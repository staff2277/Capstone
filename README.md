# StreamVibe

StreamVibe is a modern video streaming web application built with React (Vite) for the frontend and Django for the backend. It offers a seamless, high-performance user experience with Tailwind CSS for styling and Framer Motion for animations.

## Features

- **User Authentication** (Login, Signup)
- **Video Upload & Streaming**
- **Like & Comment System**
- **Responsive UI with Tailwind CSS**
- **Optimized Performance with Vite**
- **Django Backend API for Data Management**

## Tech Stack

### Frontend:

- **React (Vite)** – Fast and optimized frontend framework
- **Tailwind CSS** – Utility-first styling framework
- **Framer Motion** – Smooth animations

### Backend:

- **Django** – Web framework for handling backend logic
- **Django Rest Framework (DRF)** – API handling
- **SQLite** – Default database (can be switched to PostgreSQL/MySQL)

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js & npm
- Python & pip

### Clone the Repository

```sh
git clone https://github.com/yourusername/streamvibe.git
cd streamvibe
```

### Backend Setup

1. Create a virtual environment:
   ```sh
   python -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run database migrations:
   ```sh
   python manage.py migrate
   ```
4. Start the Django server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the `StreamVibe` directory:
   ```sh
   cd StreamVibe
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the frontend:
   ```sh
   npm run build
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Deployment

To deploy StreamVibe, configure Django for production and serve the frontend using a static file server like Nginx or AWS S3.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Contact

For inquiries, reach out to [Your Name] at [your email].

mustaff2277\@gmail.com
