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

### Interface & Design

- Built with MUI (Material-UI) with custom theme and component overrides
- Supports both light and dark modes with state persistence using `next-themes`
- Fully responsive design with custom breakpoints
- Custom scrollbars and animations
- Modular component structure following Atomic Design methodology
- Beautiful loading states with gradient placeholders
- Font Awesome icons integration

### Home Page

- Interactive post feed with infinite scrolling, sorted by date
- Smart post layout adaptation based on content length
- Contacts sidebar with:
  - Recently added friends display
  - Real-time friend search functionality
  - Online status indicators
- Shortcuts sidebar with quick navigation links

### Profile Page

- Rich user info display including:
  - Background and profile pictures
  - Mutual friends counter
  - Smart friendship management buttons
- Modular tile-based layout with:
  - Posts Feed
  - About Section with multiple categories:
    - Overview
    - Contact and Basic Info
    - Work and Education
    - Family and Relationships
    - Places Lived
  - Friends Grid
  - Photos Collection

### Friends Page

- Comprehensive friendship management with tabs for:
  - Home Overview
  - Friend Requests
  - Friend Suggestions
  - All Friends List
- Interactive user preview cards
- Friendship status management
- Smart mutual friends display

### Navbar

- **Smart Search**
  - Powered by [Algolia](https://www.algolia.com/) for lightning-fast results
  - Real-time user search with autocomplete
  - Rich preview cards for search results
- **Chat System**
  - Persistent chat list with recent messages
  - Responsive chat window management
  - Unread messages indicators
- **User Menu**
  - Quick profile access
  - Theme toggle (Light/Dark mode)
  - Session management

### Posts & Media

- Rich post creation with:
  - Text formatting
  - Multiple image upload support
  - Smart image optimization:
    - Automatic resizing
    - WebP conversion
    - Dominant color extraction
    - Blur placeholder generation
- Interactive post viewing:
  - Full-screen image viewer
  - Smart layout adaptation
  - Rich text formatting
- Complete post management:
  - Create, edit, delete operations
  - Rich media attachments
  - Privacy controls

### Social Interactions

- **Comments System**
  - Nested comments support
  - Rich text formatting
  - Edit and delete capabilities
  - Smart pagination
- **Reactions System**
  - Multiple reaction types
  - Real-time updates
  - Reaction summaries
  - User lists for each reaction
- **Friend System**
  - Friend requests
  - Friendship suggestions
  - Mutual friends tracking
  - Relationship status management

### Performance Optimizations

- Image optimization pipeline:
  - Automatic WebP conversion
  - Resolution optimization
  - Dominant color extraction
  - Blur hash generation
- Infinite scrolling with smart pagination
- Real-time updates using Redux
- Optimized bundle size with dynamic imports
- Vercel Analytics integration

### Testing

- End-to-end tests with TestCafe
- Key user flows coverage:
  - User search functionality
  - Infinite scroll behavior
  - Post CRUD operations
  - Profile interactions

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
