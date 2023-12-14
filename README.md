# Gatha - get togetha

MERN stack group chat application utilizing socket.io, enabling bidirectional communication between clients and the server.

<div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
  <img src="./client/public/logo-with-slogan-w-background.png" alt="App screenshot1" width="200px">
  <img src="./client/public/logo-with-slogan-wo-background.png" alt="App screenshot2" width="200px">
  <img src="./client/public/logo-wo-background.png" alt="App screenshot3" width="200px">
</div>

## Project

Gatha is the final project of our Web Dev class at [DCI](https://digitalcareerinstitute.org/courses/web-development/). Our goal, as a group of 3 students within the 7-week project timeframe, was to deliver a functional chat application that our classmates could use on the day of the final presentation (December 14, 2023). We also aimed at writing DRY, clean and well-documented code.

## Technologies

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React.js](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtoken&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-2A3036?style=for-the-badge&logo=npm&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## Demo

Access the application [here](https://gatha.netlify.app/). Optionally, join our public demo group by entering group code 'YAZKQGRY' from within the application.

## Team

| [<img src="https://avatars.githubusercontent.com/u/113168196?v=4" width="100" alt="Yesim Demir" />](https://github.com/besincielement) | [<img src="https://avatars.githubusercontent.com/u/120386826?u=bde7bfb40f3f0b9c80385fd78a5ae6b28bba6ab5&v=4" width="100" alt="Abdulwase Naeemi" />](https://github.com/Naeemi7) | [<img src="https://avatars.githubusercontent.com/u/120386975?v=4" width="100" alt="Felix Schmidt" />](https://github.com/felixschmidt89) |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Yesim Demir](https://github.com/besincielement)                                                                                       | [Abdulwase Naeemi](https://github.com/Naeemi7)                                                                                                                                  | [Felix Schmidt](https://github.com/felixschmidt89)                                                                                       |
| Design Lead & Full-Stack Allrounder                                                                                                    | Backend & Socket.io Lead                                                                                                                                                        | Frontend Lead & Product Manager                                                                                                          |

## Key features

- Design:

  - Responsive design including distinct page structure for smartphones.
  - Two different designs based on the user's logged-in status.

- General:
  - User creation and authentication using JWT token security, with automatic logout when the token expires.
  - Group creation and management, allowing users to create groups, add other users (via sharing a human-readable group code or manually adding them), promote users to group admins, and remove non-admin users from groups.
  - Continuous synchronization of users' views and the database.
- Chat:
  - Real-time messaging with other users in a group.
  - Rendering all groups of a user and allowing seamless switching between them.
  - Sending and deleting messages, always displaying the most recent message while allowing users to browse the entire group chat history.
  - Rendering group info, including a list of group members and their admin status, and allowing users to leave the group.
  - Displaying user online status and a typing indicator.
  - Emoji picker for desktop devices.
- Development Tools:

  - Separate development deploy infrastructure (e.g., URL and database) to test on the web before pushing to production.

## License

Gatha is licensed under the MIT License.
[MIT License](https://opensource.org/license/mit/)
