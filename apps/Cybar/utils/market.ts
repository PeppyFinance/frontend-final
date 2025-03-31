/**
 * Checks if a given string consists solely of an emoji.
 * @param char - A string to test (typically a single character or emoji).
 * @returns `true` if the string is an emoji, `false` otherwise.
 */
export function isEmoji(char: string): boolean {
  // Ensure input is a non-empty string
  if (typeof char !== "string" || char.length === 0) {
    return false;
  }

  // Regular expression for common emoji ranges
  const emojiRegex =
    /^(?:[\p{Emoji_Presentation}|\p{Emoji}\p{Emoji_Modifier}]+|\p{Regional_Indicator}{2})$/u;

  // Test if the entire string matches the emoji pattern
  return emojiRegex.test(char);
}
