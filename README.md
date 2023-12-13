# Gatha: A Seamless Tapestry of connection

Welcome to Gatha, your cutting-edge chat application that transforms communication into an art form. Crafted with care and powered by the latest technologies, Gatha invites you to embark on a journey of vibrant connections with family, friends, colleagues, and beyond. Simply create your personal account, and let the conversations unfold!

## 🔑 Key Features

1. **User Authentication:** Create and secure personal accounts with robust authentication.
2. **Group Chat Creation:** Establish collaborative discussions through group chats.
3. **Unique Code Access:** Join group chats effortlessly using human-readable group codes.
4. **Member Management:** Admins can add, designate roles, and remove members for effective group dynamics.
5. **Admin Privileges:** Assign admin roles to empower specific users with administrative capabilities.
6. **Graceful Exit: Users** can seamlessly leave groups when necessary.
7. **Real-time Messaging:** Experience instant communication with real-time updates.
8. **Chat Deletion:** Effortlessly delete chats for enhanced privacy and organization.
9. **Online Presence:** Track online users within group chats.
10. **Typing Indicators:** Visual cues for when someone is actively typing.
11. **Emoji Expression:** Enrich conversations with a diverse range of emojis, available on desktop.
12. **Description Editing:** Keep information current by easily editing group descriptions.

## 🚀 Technology Used

### Client-Side Harmony:

- **React.js:** The core of our elegant user interfaces.
- **CSS:** Crafting a visual symphony for an enchanting experience.
- **emoji-picker-react:** Express emotions with an extensive emoji palette.
- **react-icons:** Infusing interfaces with visually stunning icons.
- **react-helmet-async:** Dynamic document head tags crafted asynchronously.
- **socket.io-client:** Real-time, bidirectional communication for seamless interactions.
- **vite:** Shaping the future of front-end tooling.
- **date-fns:** The art of date manipulation at your fingertips.

### Server-Side Mastery:

- **Node.js:** Orchestrating the server-side symphony.
- **Express.js:** A framework transforming ideas into web applications.
- **socket.io:** Magic of real-time web sockets for instant communication.
- **MongoDB:** Nurturing data with the elegance of NoSQL.
- **bcrypt:** Fortifying passwords with an impenetrable layer.
- **luxon:** Mastering the art of handling dates and times.
- **nanoId:** Generating unique and concise IDs effortlessly.
- **jwt:** Sealing the bond of trust with JSON Web Tokens.

## 🛠️ Getting Started

1. **Clone the Repository:** [gatha]("https://github.com/gatha-afly/gatha")
2. **Install Dependencies:**

   - Navigate to the project directory.
   - Run the following commands:

     ```
     cd client
     npm install
     ```

     ```
     cd server
     npm install
     ```

### 🛠️ Configuring the Environment

1. **Client Configuration:**

   - Create a `.env` file in the `client` directory.
   - As the necessary environmental variables, such as API endpoints.

2. **Server Configuration:**
   - Create a `.env` file in the `server` directory.
   - Include configurations for MongoDB connection, JWT secret, etc.

### 🚀 Running the Application

1. **Start the client:**

   - In the `client` directory, run:
     ```
      npm run dev
     ```
   - The `client` will be accessible at `http://localhost:3000`.

2. **Start the Server:**
   - In the `server` directory, run:
     ```
     nodemon server.js
     ```
   - The `server` will run at `http://localhost:3001`.

### 🤝 Contributing

Contributions to the Yoga with Sheetal website project are welcome. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b your-branch`
3. Make your changes and commit them: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin your-branch`
5. Submit a `pull` request.

## 🙌 Contributors

The following individuals have contributed to the development of this project:

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/besincielement">
          <img src="https://avatars.githubusercontent.com/u/113168196?v=4" width="100px;" alt="Yesim Demir" style="border-radius: 50%;">
          <br />
          <sub><b>Yesim Demir</b></sub>
        </a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/Naeemi7">
          <img src="https://avatars.githubusercontent.com/u/120386826?u=bde7bfb40f3f0b9c80385fd78a5ae6b28bba6ab5&v=4" width="100px;" alt="Abdulwase Naeemi" style="border-radius: 50%;">
          <br />
          <sub><b>Abdulwase Naeemi</b></sub>
        </a>
      </td>
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/felixschmidt89">
          <img src="https://avatars.githubusercontent.com/u/120386975?v=4" width="100px;" alt="Felix Schmidt" style="border-radius: 50%;">
          <br />
          <sub><b>Felix Schmidt</b></sub>
        </a>
      </td>
    </tr>
  </tbody>
</table>

## 📄 License

The Yoga, Meditation, and Counseling website project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
