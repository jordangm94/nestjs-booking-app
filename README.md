# 📘 Appointment Booking API (Back-End)

A simple and scalable appointment booking API built with **NestJS**, **Prisma**, and **PostgreSQL**, designed to handle appointment creation, user management, and confirmation email notifications.

---

## 🚀 Features

- ✅ **POST `/appointments`**  
  Creates a new appointment with user details and preferred time.

- ✅ **GET `/appointments`**  
  Returns a list of **confirmed** appointment time slots to help the frontend avoid double-booking.

- ✅ **Automatic user management**  
  If a user doesn't exist, they are created automatically during appointment creation.

- ✅ **Conflict handling**  
  Prevents double-booking by checking if an appointment time is already taken.

- ✅ **Email confirmation**  
  Sends a confirmation email to the user after booking using [Resend](https://resend.com/).

---

## 🧱 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL (Dockerized)
- **Email Provider**: Resend
---
## 🛠️ Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install the dependencies:**
    ```bash
    npm install
    ```

3. **Set up your environment variables**

    Create a `.env` file at the root of the project and include the following:

    ```env
    POSTGRES_DB=nestjs_prisma
    POSTGRES_USER=root
    POSTGRES_PASSWORD=nestjs_booking

    DATABASE_URL="postgresql://root:nestjs_booking@localhost:5438/nestjs_prisma"

    RESEND_API_KEY=your_resend_api_key
    ```

4. **Start the PostgreSQL container via Docker:**

    Make sure Docker is running on your machine, then start the PostgreSQL container using:

    ```bash
    docker-compose up
    ```

5. **Run Prisma migrations:**
    ```bash
    npx prisma migrate dev --name init_schema
    ```

6. **Start the dev server:**
    ```bash
    npm run start:dev
    ```
---

## 📬 API Endpoints

### `POST /appointments`

Creates a new appointment and sends a confirmation email.

If a user with the provided email **already exists**, the appointment is associated with that user.  
Otherwise, a new user is automatically created using the submitted information before the appointment is saved.

#### 📝 Request Body:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "appointmentDateTime": "2025-03-28T13:00:00.000Z"
}
```
#### ✅ Response:

- **201 Created** – Returns the created appointment.
- **409 Conflict** – If the appointment slot is already taken.

### `GET /appointments (BONUS)`

Returns confirmed appointment time slots.

Used by the frontend to prevent users from selecting already-booked times.

#### 📤 Response:

```json
[
  { "appointmentDateTime": "2025-03-28T13:00:00.000Z" },
  { "appointmentDateTime": "2025-03-28T14:00:00.000Z" }
]
```
---

## 📈 Future Enhancements

- Add user-specific time zone support for more personalized email confirmations.
- Implement authentication and authorization using the existing `User` table structure (with future additions like password hashing and role-based access).
- Currently, `ALL` confirmed appointments are returned to the frontend. In the future, only return **confirmed appointments from today’s date forward**, as past bookings have no relevance when booking future appointment.
---


## 👥 Author

**Jordan Ostin**  
[LinkedIn](https://www.linkedin.com/in/jordanostin/) · Developer on a mission to build smooth, reliable user experiences through clean backend architecture.