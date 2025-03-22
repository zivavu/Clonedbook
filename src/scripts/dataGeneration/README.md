# Data Generation Scripts for Clonedbook

This directory contains scripts to generate realistic test data for the Clonedbook app, creating users, posts, comments, reactions, and chat messages with proper relationships between them.

## Files

- `dataGenerator.ts` - Core module with interfaces and data generation logic
- `generateData.ts` - Script to run data generation and save output to files

## How It Works

The data generator creates:

- Users with varying profile completeness based on popularity tiers
- Relationships (partners, relatives, friends)
- Posts with various privacy settings and content types
- Comments and replies with realistic distribution
- Reactions to posts and comments
- Chat conversations between friends
- Firebase-compatible data structure
- Algolia search objects

## Running the Generator

```bash
# From the project root
npx ts-node src/scripts/dataGeneration/generateData.ts
```

The script will generate two files:

- `src/data/firebase-data.json` - Data formatted for Firebase import
- `src/data/algolia-data.json` - Data formatted for Algolia search index

## Configuration

You can modify the generation options in `generateData.ts`:

```typescript
const options = {
  userCount: 50, // Number of users to generate
  maxFriendsPerUser: 20, // Maximum friends per user
  postsPerUser: 10, // Posts created per user
  maxCommentsPerPost: 5, // Maximum comments on each post
  maxRepliesPerComment: 3, // Maximum replies to each comment
  maxReactionsPerPost: 15, // Maximum reactions to each post
  maxReactionsPerComment: 5, // Maximum reactions to each comment
  maxMessagesPerChat: 20, // Maximum messages in each chat
};
```

## Data Model

The generator creates data that matches the Clonedbook application's data model:

### User

- Basic info (name, profile picture, email)
- Extended profile (bio, birthday, location, education, etc.)
- Relationships (partnership status, relatives)
- Activity level and popularity tier (used for data generation)

### Posts

- Author reference
- Content (text and/or images)
- Privacy settings
- Creation and update timestamps
- Share count

### Comments

- Post reference
- Author reference
- Content
- Parent comment (for replies)
- Creation and update timestamps

### Reactions

- Type (like, love, care, haha, wow, sad, angry)
- User reference
- Reference to post or comment
- Creation timestamp

### Chats

- Participant references
- Last message and timestamp
- Optional customization (emoji, color)

## Testing

The generated data can be validated using Jest tests in `src/tests/dataGeneration.test.ts`:

```bash
# From the project root
npm test src/tests/dataGeneration.test.ts
```

These tests verify the integrity and consistency of the generated data.
