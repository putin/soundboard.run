import { siteConfig } from "./site";

export const content = {
  header: {
    title: siteConfig.name,
    search: {
      placeholder: "Search sounds, memes, effects...",
      ariaLabel: "Search audio sounds and effects",
      buttonAriaLabel: "Search sounds",
    },
    navigation: {
      links: [
        { text: "Home", href: "/" },
        { text: "Categories", href: "#sound-board-list" },
        { text: "Blog", href: "/blog" },
      ]
    }
  },
  footer: {
    about: {
      title: "About",
      description: `${siteConfig.name} - Free sound buttons and soundboards with hilarious audio clips. Download MP3 sound effects, meme sounds, and viral audio for free!`,
    },
    connectUs: {
      title: "Connect Us",
      links: [
        { text: "Trending Sounds", href: "#trending" },
        { text: "Meme Sounds", href: "#memes" },
        { text: "Sound Board", href: "#sound-board" },
        { text: "Reaction Sounds", href: "#reactions" },
        { text: "Download All", href: "#download" },
      ]
    },
    categories: {
      title: "Categories",
      links: [
        { text: "Trending", href: "#trending" },
        { text: "Memes", href: "#memes" },
        { text: "Sound Board", href: "#sound-board" },
        { text: "Reactions", href: "#reactions" },
        { text: "Games", href: "#games" },
        { text: "Music", href: "#music" },
        { text: "Anime", href: "#anime" },
        { text: "Movies", href: "#movies" },
        { text: "Pranks", href: "#pranks" },
      ]
    },
    social: {
      title: "Share",
      links: [
        {
          icon: "Facebook",
          href: `https://www.facebook.com/sharer.php?t=${encodeURIComponent(siteConfig.name)}&u=${encodeURIComponent(siteConfig.url)}`
        },
        {
          icon: "Twitter",
          href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(siteConfig.name)}&url=${encodeURIComponent(siteConfig.url)}&hashtags=${siteConfig.social.twitter},Soundboard,MP3`
        }
      ]
    },
    legal: {
      title: "Legal",
      links: [
        { text: "About Us", href: "/about" },
        { text: "Contact Us", href: "/contact" },
        { text: "Privacy Policy", href: "/privacy-policy" },
        { text: "Terms of Service", href: "/terms-of-service" }
      ]
    },
    copyright: {
      text: "© {year} SoundBoard.run. All rights reserved.",
      subText: "All sounds on this platform are free to download and use."
    }
  },
  rating: {
    title: "Rate SoundBoard.run",
    votes: "votes",
    initialRating: 4.8,
    initialVotes: 146
  },
  soundBoard: {
    title: "Sound Categories",
    cardLabels: {
      playButton: "Play",
    }
  }
} as const;


