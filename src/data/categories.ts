/**
 * 100 Movie & TV Entertainment Categories for global cinema catalog.
 * High-ranking zero-competition niche categories and micro-genres.
 */

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
}

export const ENTERTAINMENT_CATEGORIES: CategoryItem[] = [
  // 1-10: Mainstream Core
  { id: 'action', name: 'Action & Adventure', slug: 'action', icon: '⚔️', description: 'High-octane stunts, battles and thrilling expeditions.', count: 3420 },
  { id: 'comedy', name: 'Comedy & Humour', slug: 'comedy', icon: '😂', description: 'Laugh out loud blockbusters and clever satire.', count: 2850 },
  { id: 'sci-fi', name: 'Sci-Fi & Futuristic', slug: 'sci-fi', icon: '🚀', description: 'Cosmic discoveries, AI rebellions and space exploration.', count: 1940 },
  { id: 'horror', name: 'Horror & Paranormal', slug: 'horror', icon: '👻', description: 'Spine-chilling hauntings, slashers and jump scares.', count: 1680 },
  { id: 'drama', name: 'Emotional Drama', slug: 'drama', icon: '🎭', description: 'Deep human relationships, tear-jerkers and true stories.', count: 4210 },
  { id: 'romance', name: 'Romance & Love', slug: 'romance', icon: '❤️', description: 'Passionate love stories, rom-coms and heartbreaking lovers.', count: 2150 },
  { id: 'thriller', name: 'Psychological Thriller', slug: 'thriller', icon: '🔍', description: 'Edge of the seat tension, twists and conspiracies.', count: 2470 },
  { id: 'animation', name: 'Animation & Anime', slug: 'animation', icon: '🎨', description: 'Stunning 3D, 2D anime and wholesome family cartoons.', count: 1890 },
  { id: 'crime', name: 'Crime & Gangsters', slug: 'crime', icon: '🔫', description: 'Underworld mobs, forensic investigations and heist crews.', count: 1760 },
  { id: 'fantasy', name: 'Epic Fantasy & Magic', slug: 'fantasy', icon: '🧙‍♂️', description: 'Mythical beasts, sorcery, dragons and ancient realms.', count: 1540 },

  // 11-20: Regional & Language Giants
  { id: 'hindi-dubbed', name: 'Hindi Dubbed HD', slug: 'hindi-dubbed', icon: '🇮🇳', description: 'Hollywood & South blockbusters in clear Hindi audio.', count: 3820 },
  { id: 'bollywood', name: 'Bollywood Hits', slug: 'bollywood', icon: '🌟', description: 'Hindi cinema blockbusters, masalas and musical hits.', count: 2980 },
  { id: 'south-hindi', name: 'South Indian Hindi Dubbed', slug: 'south-hindi', icon: '🔥', description: 'High-energy mass action from Telugu, Tamil, Kannada.', count: 2430 },
  { id: 'hollywood', name: 'Hollywood Cinema', slug: 'hollywood', icon: '🎬', description: 'English theatrical blockbusters and Academy Award winners.', count: 5200 },
  { id: 'k-drama', name: 'Korean K-Drama & Thrillers', slug: 'k-drama', icon: '🇰🇷', description: 'Korean trending dramas, romantic series and revenge sagas.', count: 1450 },
  { id: 'anime-series', name: 'Anime Series & Movies', slug: 'anime', icon: '⚡', description: 'Top Japanese anime series with sub and dub tracks.', count: 1620 },
  { id: 'punjabi', name: 'Punjabi Cinema', slug: 'punjabi', icon: '🪕', description: 'Pollywood comedies, village dramas and romances.', count: 540 },
  { id: 'tamil', name: 'Tamil Cinema (Kollywood)', slug: 'tamil', icon: '🐘', description: 'Tamil masterclass cinema, gangster sagas and thrillers.', count: 1320 },
  { id: 'telugu', name: 'Telugu Cinema (Tollywood)', slug: 'telugu', icon: '🏹', description: 'Grand mass commercial cinema and visual spectacles.', count: 1410 },
  { id: 'turkish-drama', name: 'Turkish Dramas & Series', slug: 'turkish-drama', icon: '🇹🇷', description: 'Historical Ottoman epics and passionate Turkish series.', count: 680 },

  // 21-30: Tech & Quality Formats
  { id: '4k-uhd', name: '4K Ultra HD (2160p)', slug: '4k-uhd', icon: '💎', description: 'Pristine 4K master resolution with crystal clear detail.', count: 2890 },
  { id: 'imax', name: 'IMAX Enhanced 60fps', slug: 'imax', icon: '📽️', description: 'Expanded aspect ratio with thunderous soundstage.', count: 870 },
  { id: 'dual-audio', name: 'Dual Audio (Eng + Hin)', slug: 'dual-audio', icon: '🎧', description: 'Switchable English and Hindi 5.1 surround sound.', count: 3120 },
  { id: 'web-dl', name: 'WEB-DL 1080p Pure', slug: 'web-dl', icon: '📦', description: 'Zero compression loss rips from official streaming platforms.', count: 4190 },
  { id: 'hdr10', name: 'HDR10+ & Dolby Vision', slug: 'hdr10', icon: '🌈', description: 'Deep blacks, vibrant highlights and wide dynamic range.', count: 1240 },
  { id: 'netflix-original', name: 'Netflix Originals', slug: 'netflix-original', icon: '🔴', description: 'Award-winning original movies and binge-worthy series.', count: 1650 },
  { id: 'amazon-prime', name: 'Amazon Prime Video', slug: 'amazon-prime', icon: '🔵', description: 'Action-packed series, thrillers and exclusive originals.', count: 1140 },
  { id: 'disney-plus', name: 'Disney+ & Marvel MCU', slug: 'disney-plus', icon: '✨', description: 'Superhero epics, Star Wars lore and Disney classics.', count: 980 },
  { id: 'hbo-max', name: 'HBO Max Originals', slug: 'hbo-max', icon: '👑', description: 'Prestigious cinematic television and adult thrillers.', count: 850 },
  { id: 'apple-tv', name: 'Apple TV+ Exclusives', slug: 'apple-tv', icon: '🍏', description: 'Mind-bending sci-fi series and premium award dramas.', count: 420 },

  // 31-40: Thriller & Suspense Micro-Genres
  { id: 'cyberpunk', name: 'Cyberpunk & Dystopia', slug: 'cyberpunk', icon: '🤖', description: 'Neon cities, rogue cyborgs and dark hacker conspiracies.', count: 670 },
  { id: 'zombie', name: 'Zombie Apocalypse', slug: 'zombie', icon: '🧟', description: 'Flesh-eating undead outbreaks and desperate survival.', count: 740 },
  { id: 'time-travel', name: 'Time Travel & Multiverse', slug: 'time-travel', icon: '⏳', description: 'Temporal paradoxes, alternate timelines and time loops.', count: 590 },
  { id: 'heist', name: 'Heist & Mastermind Con', slug: 'heist', icon: '💰', description: 'Bank vaults, clever robbers and multi-million dollar jobs.', count: 820 },
  { id: 'spy', name: 'Spy & Undercover Espionage', slug: 'spy', icon: '🕵️', description: 'MI6, CIA, undercover agents and nuclear secrets.', count: 960 },
  { id: 'survival', name: 'Survival Against Nature', slug: 'survival', icon: '❄️', description: 'Shipwrecks, deserted islands, mountains and cold blizzards.', count: 630 },
  { id: 'alien', name: 'Alien Invasion & UFOs', slug: 'alien', icon: '🛸', description: 'Extraterrestrial first contact and planetary invasions.', count: 710 },
  { id: 'whodunit', name: 'Whodunit Murder Mystery', slug: 'whodunit', icon: '🔎', description: 'Eccentric detectives solving closed-door murders.', count: 680 },
  { id: 'dark-fantasy', name: 'Dark Fantasy & Witchcraft', slug: 'dark-fantasy', icon: '🔮', description: 'Grim realms, dark covenants and cursed bloodlines.', count: 540 },
  { id: 'prison', name: 'Prison Break & Escape', slug: 'prison', icon: '⛓️', description: 'Maximum security lockups and intricate jail escapes.', count: 480 },

  // 41-50: Action & Adrenaline Micro-Genres
  { id: 'martial-arts', name: 'Martial Arts & Kung Fu', slug: 'martial-arts', icon: '🥋', description: 'Hand-to-hand fight choreography, swords and dojos.', count: 890 },
  { id: 'superhero', name: 'Superhero & Comic Books', slug: 'superhero', icon: '🦸', description: 'Caped vigilantes, super powers and world saving.', count: 1120 },
  { id: 'kaiju', name: 'Kaiju & Giant Monsters', slug: 'kaiju', icon: '🦖', description: 'Godzilla, King Kong and prehistoric titan brawls.', count: 390 },
  { id: 'car-chase', name: 'Street Racing & Fast Cars', slug: 'car-chase', icon: '🏎️', description: 'High-speed nitro pursuits and drifting underground.', count: 510 },
  { id: 'military-war', name: 'Modern Military Combat', slug: 'military-war', icon: '🎖️', description: 'Navy SEALs, frontline warfare and special ops extractions.', count: 780 },
  { id: 'historical-war', name: 'WWII & Historical Battles', slug: 'historical-war', icon: '⚔️', description: 'D-Day, trenches, Roman legions and medieval sieges.', count: 920 },
  { id: 'western-cowboy', name: 'Western & Gunslingers', slug: 'western', icon: '🤠', description: 'Outlaws, sheriffs, dusty saloons and quick-draw duels.', count: 610 },
  { id: 'revenge-saga', name: 'Brutal Revenge Sagas', slug: 'revenge', icon: '🩸', description: 'Unstoppable antiheroes settling bloody scores.', count: 830 },
  { id: 'disaster', name: 'Earthquakes & Asteroid Disasters', slug: 'disaster', icon: '🌋', description: 'Mega-tsunamis, volcanic eruptions and cataclysms.', count: 450 },
  { id: 'assassin', name: 'Hitman & Contract Killers', slug: 'assassin', icon: '🎯', description: 'Silent snipers, underground continental hotels and targets.', count: 690 },

  // 51-60: Horror & Supernatural Subgenres
  { id: 'slasher', name: 'Slasher & Masked Killers', slug: 'slasher', icon: '🔪', description: 'Relentless stalkers, cabins in the woods and final girls.', count: 590 },
  { id: 'haunted-house', name: 'Haunted Houses & Ghost Lore', slug: 'haunted-house', icon: '🏚️', description: 'Creaky floorboards, possessed dolls and poltergeists.', count: 710 },
  { id: 'exorcism', name: 'Exorcism & Demonic Possession', slug: 'exorcism', icon: '✝️', description: 'Priests battling ancient demonic entities and curses.', count: 480 },
  { id: 'vampire', name: 'Vampires & Bloodlines', slug: 'vampire', icon: '🧛', description: 'Immortal bloodsuckers and gothic night wars.', count: 520 },
  { id: 'werewolf', name: 'Werewolves & Shapeshifters', slug: 'werewolf', icon: '🐺', description: 'Full moon transformations and beastly curses.', count: 310 },
  { id: 'found-footage', name: 'Found Footage & Camcorders', slug: 'found-footage', icon: '📹', description: 'Lost tapes, amateur cameras and terrifying real footage.', count: 340 },
  { id: 'cosmic-horror', name: 'Cosmic Lovecraftian Horror', slug: 'cosmic-horror', icon: '🐙', description: 'Ancient elder gods and sanity-shattering cosmic dread.', count: 290 },
  { id: 'body-horror', name: 'Body Horror & Mutations', slug: 'body-horror', icon: '🧬', description: 'Biological anomalies, viral mutations and grotesque shifts.', count: 260 },
  { id: 'creature-feature', name: 'Deep Sea & Creature Features', slug: 'creature-feature', icon: '🦈', description: 'Megalodons, subterranean beasts and jungle apex predators.', count: 430 },
  { id: 'folk-horror', name: 'Folk Horror & Pagans', slug: 'folk-horror', icon: '🌾', description: 'Isolated villages, cult rituals and ancient harvest deities.', count: 280 },

  // 61-70: Romance, Heart & Drama
  { id: 'rom-com', name: 'Romantic Comedy (Rom-Com)', slug: 'rom-com', icon: '🥂', description: 'Meet-cutes, fake dating and heartwarming happy endings.', count: 1450 },
  { id: 'teen-drama', name: 'High School & Coming of Age', slug: 'teen-drama', icon: '🎒', description: 'First loves, adolescent struggles and school milestones.', count: 930 },
  { id: 'forbidden-love', name: 'Forbidden & Royal Romance', slug: 'forbidden-love', icon: '👑', description: 'Star-crossed lovers across rival dynasties and borders.', count: 720 },
  { id: 'sports-drama', name: 'Underdog Sports Drama', slug: 'sports-drama', icon: '🏆', description: 'Championship glory, boxing rings and triumph against odds.', count: 640 },
  { id: 'musical', name: 'Musicals & Broadway Cinema', slug: 'musical', icon: '🎶', description: 'Sensational stage choreography and original vocal anthems.', count: 580 },
  { id: 'biopic', name: 'Biographical & True Story', slug: 'biopic', icon: '📜', description: 'The incredible lives of real world icons and legends.', count: 890 },
  { id: 'courtroom', name: 'Courtroom Legal Drama', slug: 'courtroom', icon: '⚖️', description: 'Jury trials, fierce defense attorneys and verdict reveals.', count: 520 },
  { id: 'road-trip', name: 'Cross-Country Road Trip', slug: 'road-trip', icon: '🛣️', description: 'Soul-searching adventures across endless highways.', count: 410 },
  { id: 'family-values', name: 'Wholesome Family Bonding', slug: 'family', icon: '👨‍👩‍👧‍👦', description: 'Heartfelt bonding suitable for kids, parents and elders.', count: 1780 },
  { id: 'holiday-christmas', name: 'Holiday & Christmas Specials', slug: 'holiday', icon: '🎄', description: 'Snowy winter romance, festive cheer and Santa adventures.', count: 510 },

  // 71-80: Intellect, Sci-Fi & Mind-Benders
  { id: 'mind-bender', name: 'Mind-Benders & Plot Twists', slug: 'mind-bender', icon: '🧠', description: 'Reality-questioning illusions and jaw-dropping endings.', count: 860 },
  { id: 'space-opera', name: 'Space Opera & Starships', slug: 'space-opera', icon: '🌌', description: 'Galactic empires, laser cannons and intergalactic fleets.', count: 730 },
  { id: 'virtual-reality', name: 'Virtual Reality & The Matrix', slug: 'virtual-reality', icon: '🕶️', description: 'Digital simulations, metaverse hacks and avatar combat.', count: 380 },
  { id: 'post-apocalyptic', name: 'Post-Apocalyptic Wasteland', slug: 'post-apocalyptic', icon: '☣️', description: 'Nuclear winter, scavengers and desert convoy wars.', count: 680 },
  { id: 'steampunk', name: 'Steampunk & Victorian Sci-Fi', slug: 'steampunk', icon: '⚙️', description: 'Brass gears, zeppelins and Victorian industrial wonders.', count: 240 },
  { id: 'neo-noir', name: 'Neo-Noir & Detective Crime', slug: 'neo-noir', icon: '🚬', description: 'Rain-soaked alleys, smoky bars and cynical detectives.', count: 590 },
  { id: 'conspiracy', name: 'Political Conspiracies & Deep State', slug: 'conspiracy', icon: '🏛️', description: 'Covert government plots, leaked files and whistleblowers.', count: 610 },
  { id: 'robot-ai', name: 'Sentient Robots & Artificial Intelligence', slug: 'robot-ai', icon: '🦾', description: 'Self-aware algorithms, android companions and machine wars.', count: 540 },
  { id: 'ocean-deep', name: 'Submarine & Deep Ocean Lore', slug: 'ocean-deep', icon: '🌊', description: 'Pressurized sonar duels and uncharted abyssal trenches.', count: 320 },
  { id: 'mythology', name: 'Gods & Ancient Mythology', slug: 'mythology', icon: '⚡', description: 'Greek gods, Norse mythology and Hindu Mahabharat epics.', count: 670 },

  // 81-90: Cult & Independent Gems
  { id: 'oscar-winner', name: 'Academy Award Oscar Winners', slug: 'oscar-winner', icon: '🎖️', description: 'Best Picture, Best Director and timeless cinematic classics.', count: 760 },
  { id: 'indie-cinema', name: 'Independent Film Festival Hits', slug: 'indie-cinema', icon: '🎟️', description: 'Sundance, Cannes and raw auteur storytelling.', count: 910 },
  { id: 'cult-classic', name: 'Midnight Cult Classics', slug: 'cult-classic', icon: '🍿', description: 'Fan-favorite underground b-movies with dedicated followings.', count: 620 },
  { id: 'dark-comedy', name: 'Dark & Black Comedy', slug: 'dark-comedy', icon: '🖤', description: 'Morbidly funny humor, hitman blunders and ironic twists.', count: 540 },
  { id: 'parody-spoof', name: 'Parody & Spoof Movies', slug: 'parody', icon: '🤪', description: 'Outrageous mockeries of pop culture and cinema tropes.', count: 410 },
  { id: 'silent-classic', name: 'Golden Era Golden Oldies (1950-1980)', slug: 'classic', icon: '📽️', description: 'Hitchcock, classic Westerns and Hollywood golden years.', count: 850 },
  { id: 'true-crime-doc', name: 'True Crime Documentaries', slug: 'true-crime', icon: '📁', description: 'Real-life serial killers, cold case files and confessions.', count: 680 },
  { id: 'nature-doc', name: 'Wildlife & Nature Documentaries', slug: 'nature-doc', icon: '🦁', description: 'BBC Planet Earth scale footage, oceans and rainforests.', count: 490 },
  { id: 'gaming-cinema', name: 'Video Game Adaptations', slug: 'gaming', icon: '🎮', description: 'PlayStation, Xbox and retro console game lore turned live.', count: 380 },
  { id: 'interactive', name: 'Anthology & Short Stories', slug: 'anthology', icon: '📚', description: 'Bite-sized episodic tales and twisted anthology shorts.', count: 420 },

  // 91-100: Global Exotics & Trending Phenomenon
  { id: 'french-cinema', name: 'French New Wave & Thrillers', slug: 'french', icon: '🇫🇷', description: 'Romantic Paris dramas and pulse-pounding French crime.', count: 730 },
  { id: 'spanish-thrillers', name: 'Spanish Mysteries & Heists', slug: 'spanish', icon: '🇪🇸', description: 'Clever Madrid heists, mystery thrillers and telenovelas.', count: 890 },
  { id: 'scandinavian-noir', name: 'Nordic Noir & Cold Murders', slug: 'nordic', icon: '❄️', description: 'Bleak snowy landscapes and Scandinavian detective sagas.', count: 460 },
  { id: 'japanese-yakuza', name: 'Japanese Yakuza & Samurai', slug: 'japanese', icon: '⚔️', description: 'Katana blade duels and Tokyo syndicate underworld honor.', count: 620 },
  { id: 'chinese-wuxia', name: 'Chinese Wuxia & Flying Swords', slug: 'wuxia', icon: '🐉', description: 'Mythic Chinese folklore, wire-fu stunts and emperors.', count: 580 },
  { id: 'indonesian-action', name: 'Indonesian Silat Combat', slug: 'indonesian', icon: '🇮🇩', description: 'Gory relentless martial arts masterpieces like The Raid.', count: 230 },
  { id: 'african-cinema', name: 'Nollywood & African Epics', slug: 'african', icon: '🌍', description: 'Vibrant Nigerian cinema and rich continental folklore.', count: 340 },
  { id: 'german-thrillers', name: 'German Dark Suspense', slug: 'german', icon: '🇩🇪', description: 'Mind-bending time sagas and Berlin Cold War espionage.', count: 410 },
  { id: 'russian-sci-fi', name: 'Russian Sci-Fi & War Cinema', slug: 'russian', icon: '🇷🇺', description: 'Heavy tank war battles and space station survival.', count: 390 },
  { id: 'trending-today', name: 'Global Viral Phenomenon Today', slug: 'trending', icon: '🚀', description: 'The absolute most talked-about movies in the world right now.', count: 5900 },
];
