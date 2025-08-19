<a name="readme-top"></a>

# Clonedbook

## :rocket: About the project

This project is a basic clone of Facebook, replicating many of the features found on the home, profile, and friends pages. It includes interactive elements such as portals and poppers to enhance user interaction.

The interface closely matches the original design, is fully responsive, and supports dark mode. Components are organized using the Atomic Design methodology.

Currently, there's no authentication system, so users are represented by dummy/random data, allowing anyone to log in with just a click. The data is generated using scripts included in this repository that utilize Faker.js to create realistic user profiles, posts, comments, and more.

Data is stored in Firebase and optimized to reduce document reads by consolidating essential information into single documents. User data is indexed using Algolia to provide fast and efficient search autocomplete.

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## :wrench: Getting Started

### Prerequisites

- **Bun**: Install from `https://bun.sh/` and ensure it's on your PATH
- **Firebase CLI**: Required to run local emulators
  - Install (global): `npm i -g firebase-tools`
  - Verify: `firebase --version`
- **Java 11+**: Required by Firebase Emulators
  - Verify: `java -version`

### Quick Start for Local Development

1. **Clone the repo and install dependencies**:

   ```bash
   git clone https://github.com/zivavu/Clonedbook.git
   cd Clonedbook
   bun install  # or npm/yarn/pnpm install
   ```

2. **Generate test data**:

   ```bash
   # Generate test data (creates data files)
   bun run generate-data
   ```

   Note: The generation process can take some time because it downloads images for the test data.

3. **Start Firebase emulators**:

   ```bash
   bun run emulators
   ```

4. **Populate emulators with data**:

   ```bash
   bun run emulators:populate
   ```

5. **Start the development server**:
   ```bash
   bun run dev:local
   ```
6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

> **Note**: The project uses Bun as the default JavaScript runtime, but you can use other runtimes like Node.js if you prefer. Just make sure your runtime supports TypeScript files (.ts) for the data generation scripts.

### Running Tests

The project includes end-to-end tests using TestCafe that cover key functionality:

- **Home page tests**: Validates post loading and infinite scroll
- **Friend interaction flow**: Tests sending, accepting, and removing friend requests
- **Likes interaction flow**: Tests post liking, unliking, and comment interactions
- **Profile page tests**: Tests profile page navigation and content display
- **Account details flow**: Tests viewing and interacting with user account information

To run a specific test:

```bash
bun run test:e2e src/tests/homePage.ts
```

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

## :memo: License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## :speech_balloon: Contact

Tomasz Kierzenkowski - zivavu@gmail.com

Project Link: [https://github.com/zivavuu/Clonedbook](https://github.com/zivavuu/Clonedbook)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
