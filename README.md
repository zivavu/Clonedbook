<a name="readme-top"></a>

<h1 align="center">Clonedbook</h1>
<p align="center">
  <a href="https://clonedbook.vercel.app/">View app</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">Technologies used</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/zivavu/facebook-clone/issues">Report Bug</a>
</p>

## :rocket: About the project

This project is a basic clone of Facebook, replicating many of the features found on the home, profile, and friends pages. It includes interactive elements such as portals and poppers to enhance user interaction.

The interface closely matches the original design, is fully responsive, and supports dark mode. Components are organized using the Atomic Design methodology.

Currently, there's no authentication system, so users are represented by dummy/random data, allowing anyone to log in with just a click. The data for users, chats, photos, posts, comments, reactions, and friendships is generated using a script (not included in this repository) that utilizes Faker and LoremFlickr.

Data is stored in Firebase and optimized to reduce document reads by consolidating essential information into single documents. Since the focus is not on scaling to a large number of users, this approach prioritizes simplicity and efficiency. Additionally, user data is indexed using Algolia to provide fast and efficient search autocomplete.

![Screenshot_1](https://github.com/zivavu/facebook-clone/assets/107223633/2d419cbd-4869-4a79-8007-445d65b4c9b8)

## :sparkles: Implemented Features

### Interface

- Built with MUI
- Supports both light and dark modes (with state persistence)
- Fully responsive design
- Modular component structure

### Home Page

- Interactive post feed with infinite scrolling, sorted by date
- Contacts sidebar displaying recently added friends and search functionality
- Shortcuts sidebar (most links not yet implemented)

### Profile Page

- User info including background, profile picture, mutual friends, and friendship management buttons
- Built with modular, responsive tiles
- Tabs for:
  - Posts
  - About
  - Friends
  - Photos

### Friends Page

- Tabs for:
  - Home
  - Friend Requests
  - Friend Suggestions
  - All Friends
- Preview users using the original profile page layout and manage friendship status

### Navbar

- **Search Box**
  - User search powered by [Algolia](https://www.algolia.com/)
  - Displays results as a user list with autocomplete functionality
- **Chats Popper**
  - Displays all chats and recent messages
  - Allows users to open chats and view all messages
- **Logged User Popper**
  - Displays the logged-in user
  - Option to switch to a different random user
  - Dark mode toggle

### Posts & Pictures

- Create posts (image uploads optimized for size and quality using Canvas)
- Optimized image sizes using `next/image`
- View posts and pictures in custom full-screen portals
- Comment, react, edit, and delete functionality

### Comments

- Ability to react, edit, and delete comments

### Reactions

- Custom component for displaying the most popular reactions with a count
- Custom popper for choosing reactions
- Custom dialog for viewing all reactions and their owners

### User Preview Popper

- Displays user profile picture, name, and mutual friends when hovering over links or photos
- Includes buttons for managing friendship status

### Chats Portal

- Limits the number of open chats based on screen size
- Persistent chat list
- Displays all messages in each chat
- Supports sending new messages
- Custom emoji support

### Tests

- End-to-end tests with TestCafe
- Coverage includes key user flows such as:
  - Searching for users
  - Infinite scrolling on the home page
  - Creating, editing, and deleting posts on the profile page

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## :technologist: Technologies used

[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![Redux][Redux.js]][Redux-url]
[![MUI][MaterialUI]][MaterialUI-url]
[![FontAwesome][FontAwesome]][FontAwesome-url]
[![Vercel][Vercel]][Vercel-url]
[![Firebase][Firebase]][Firebase-url]
[![Algolia][Algolia]][Algolia-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## :memo: License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## :speech_balloon: Contact

Tomasz Kierzenkowski - zivavu@gmail.com

Project Link: [https://github.com/zivavu/Clonedbook](https://github.com/zivavu/Clonedbook)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Next.js]: https://a11ybadges.com/badge?logo=nextdotjs
[Next-url]: https://nextjs.org/
[React.js]: https://a11ybadges.com/badge?logo=react
[React-url]: https://reactjs.org/
[Redux.js]: https://a11ybadges.com/badge?logo=redux
[Redux-url]: https://redux.js.org/
[MaterialUI]: https://a11ybadges.com/badge?logo=materialui
[MaterialUI-url]: https://mui.com/
[FontAwesome]: https://a11ybadges.com/badge?logo=fontawesome
[FontAwesome-url]: https://fontawesome.com/
[Firebase]: https://a11ybadges.com/badge?logo=firebase
[Firebase-url]: https://firebase.google.com/
[Algolia]: https://a11ybadges.com/badge?logo=algolia
[Algolia-url]: https://www.algolia.com/
[Vercel]: https://a11ybadges.com/badge?logo=vercel
[Vercel-url]: https://vercel.com
