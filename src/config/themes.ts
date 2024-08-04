const TYPE_BEATS: string[] = [
  "J COLE",
  "Randy Newman",
  "The Beatles",
  "Kendrick Lamar",
  "Beach Boys",
  "Miles Davis",
  "Knxwledge",
  "Daft Punk",
  "Taylor Swift",
  "Marvin Gaye",
  "Stevie Wonder",
  "Earth Wind & Fire",
  "Yes",
  "Pink Floyd",
  "Drake",
  "Bee Gees",
  "Prince",
  "Boyz II Men",
  "Stereolab",
  "MF DOOM",
  "Tyler, The Creator",
];

const GENRES: string[] = [
  "Folk",
  "Funk",
  "Techno",
  "Ambient",
  "Jazz",
  "City Pop",
  "Classical",
  "Bossa Nova / Samba",
  "Dub",
  "Dubstep",
  "Soul",
  "Soundtrack",
  "Singer Songwriter",
  "Country",
  "Afrobeat",
];

const YOUTUBE_VIDEOS: string[] = [
  "https://www.youtube.com/watch?v=DYzT-Pk6Ogw",
  "https://www.youtube.com/watch?v=WaBz8hF2Gwk",
  "https://www.youtube.com/watch?v=Hy8kmNEo1i8",
  "https://www.youtube.com/watch?v=J---aiyznGQ",
  "https://www.youtube.com/shorts/QZmCVs4i2c8",
  "https://www.youtube.com/watch?v=zBJU9ndpH1Q",
  "https://www.youtube.com/watch?v=26j1pkS83dQ",
  "https://www.youtube.com/watch?v=wwOipTXvNNo",
  "https://www.youtube.com/watch?v=rajXrf_Dzfw",
  "https://www.youtube.com/watch?v=seFHSuL0nsw",
  "https://www.youtube.com/watch?v=-UYgORr5Qhg",
  "https://www.youtube.com/watch?v=r49FjKg2Ebk",
  "https://www.youtube.com/watch?v=7FlvTU_7U4A",
  "https://www.youtube.com/watch?v=fW8NQgqYoVQ",
  "https://www.youtube.com/watch?v=mrpsUKzDdIw",
  "https://www.youtube.com/watch?v=lkk6m14htzw",
  "https://www.youtube.com/watch?v=qXnT3LFTc-s",
  "https://www.youtube.com/watch?v=L1M_Huiq2aQ",
  "https://www.youtube.com/watch?v=5nj1HWC-dQs",
  "https://www.youtube.com/watch?v=D0a4vuKQR5w",
  "https://www.youtube.com/watch?v=Dyq9zlYMw9g",
  "https://www.youtube.com/watch?v=te2klTPtILs",
  "https://www.youtube.com/watch?v=AbonVshOLf0",
  "https://www.youtube.com/watch?v=-gGEr4LHGJE",
  "https://www.youtube.com/watch?v=Vq9dX8z4_Kw",
  "https://www.youtube.com/watch?v=FI-4HNQg1JI",
];

const MOVIES: string[] = ["Fantastic Planet", "El Dorado", "Prince of Egypt"];

export const themes = [
  ...TYPE_BEATS.map((typeBeat) => `${typeBeat} type beat`),
  ...GENRES,
  ...YOUTUBE_VIDEOS,
  ...MOVIES,
];

export const getRandomTheme = () =>
  themes[Math.floor(Math.random() * themes.length)];
