# Embeds and Icons Parsing from Post Text

## Context
- The database structure and `IPost` interface are fixed and cannot be changed.
- All special content (Spotify, YouTube, SoundCloud embeds, drawings, icons) must be parsed from the `text` field of a post.

## Approach
1. **Parsing**
   - Detect Spotify, YouTube, SoundCloud links by URL pattern in the text.
   - Recognize special drawing/image markers (e.g., `[drawing:base64data]`).
   - Recognize icon markers (e.g., `:music:`, `:art:`, etc.).
2. **Rendering**
   - The UI layer parses the text and renders the appropriate embeds, icons, or drawings inline.

## Example Patterns
- **Spotify**: `https://open.spotify.com/track/...`
- **YouTube**: `https://www.youtube.com/watch?v=...` or `https://youtu.be/...`
- **SoundCloud**: `https://soundcloud.com/...`
- **Drawing**: `[drawing:<base64 or url>]`
- **Icons**: `:music:`, `:art:`, etc.

## Next Steps
- Implement a parser utility to extract these elements from the text.
- Update post rendering components to use the parser and display embeds/icons/drawings. 