/*
  tarot-data.js
  ─────────────────────────────────────────────────────────────────────
  Source of truth for the web reading panel.
  Synced from tarot-readings/upright/ and tarot-readings/reversed/.
*/

var TAROT_DATA = [
  {
    id: 'fool',
    name: 'The Fool',
    image: 'images/tarot card/fool.jpeg',
    upright: {
      luck: 'Fresh starts are favored; taking a leap of faith leads to growth.',
      mood: 'Curious, optimistic, and ready to explore the unknown.',
      event: 'I may begin something new without overthinking, embracing uncertainty.'
    },
    reversed: {
      luck: 'Risk-taking becomes reckless or overly cautious; timing feels off.',
      mood: 'Anxious about stepping into the unknown or afraid of making mistakes.',
      event: 'I may either act impulsively without thinking or avoid starting something new out of fear.'
    }
  },
  {
    id: 'magician',
    name: 'The Magician',
    image: 'images/tarot card/magician.jpg',
    upright: {
      luck: 'Strong manifestation energy; skills and resources align effectively.',
      mood: 'Confident, capable, and in control.',
      event: 'I may successfully initiate a plan or turn an idea into reality.'
    },
    reversed: {
      luck: 'Potential is present but misused or blocked; results don\'t match effort.',
      mood: 'Insecure, manipulative, or doubting my own abilities.',
      event: 'I might miscommunicate, lack confidence in execution, or encounter deception.'
    }
  },
  {
    id: 'lover',
    name: 'The Lovers',
    image: 'images/tarot card/lover.jpg',
    upright: {
      luck: 'Harmony and alignment support positive outcomes in choices and relationships.',
      mood: 'Connected, loving, and clear about values.',
      event: 'I may deepen a relationship or make an important decision aligned with my heart.'
    },
    reversed: {
      luck: 'Disharmony affects decisions; misalignment leads to poor outcomes.',
      mood: 'Conflicted, emotionally disconnected, or uncertain about commitments.',
      event: 'I may experience tension in a relationship or struggle to make an important choice.'
    }
  },
  {
    id: 'moon',
    name: 'The Moon',
    image: 'images/tarot card/moon.png',
    upright: {
      luck: 'Uncertainty clouds outcomes; intuition becomes the main guide.',
      mood: 'Anxious, intuitive, and sensitive to hidden dynamics.',
      event: 'I may face confusion or illusions and need to rely on instincts.'
    },
    reversed: {
      luck: 'Confusion begins to clear, but uncertainty still lingers.',
      mood: 'Less anxious than before, yet still uneasy or suspicious.',
      event: 'I may realize the truth about a situation, but not fully trust it yet.'
    }
  },
  {
    id: 'sun',
    name: 'The Sun',
    image: 'images/tarot card/sun.jpg',
    upright: {
      luck: 'Strong positive energy; success, clarity, and joy are highly supported.',
      mood: 'Happy, confident, and full of vitality.',
      event: 'I may experience success, recognition, or a genuinely joyful moment.'
    },
    reversed: {
      luck: 'Positivity is muted; success is delayed or feels less satisfying.',
      mood: 'Slightly down, lacking enthusiasm or confidence.',
      event: 'I may achieve something but not feel as happy or fulfilled as expected.'
    }
  },
  {
    id: 'cup1',
    name: 'Ace of Cups',
    image: 'images/tarot card/cup1.jpg',
    upright: {
      luck: 'Emotional opportunities flow naturally; new connections or joy come easily.',
      mood: 'Open-hearted, receptive, and emotionally fulfilled.',
      event: 'I may start a new relationship or experience a meaningful emotional moment.'
    },
    reversed: {
      luck: 'Emotional flow is blocked; opportunities for connection or joy may be missed or feel unfulfilling.',
      mood: 'Emotionally drained, closed off, or unable to express feelings naturally.',
      event: 'May struggle to start a new relationship or feel disconnected even in meaningful moments.'
    }
  },
  {
    id: 'cup4',
    name: 'Four of Cups',
    image: 'images/tarot card/cup4.jpg',
    upright: {
      luck: 'Opportunities exist but may be overlooked due to lack of awareness.',
      mood: 'Apathetic, withdrawn, or dissatisfied with current options.',
      event: 'I might ignore a good opportunity because I feel bored or disconnected.'
    },
    reversed: {
      luck: 'A chance to re-engage appears, but clarity is inconsistent—risk of hesitation or confusion.',
      mood: 'Restless, slightly more open than before but still uncertain about what I want.',
      event: 'I might reconsider an opportunity I previously ignored, but feel unsure whether to act.'
    }
  },
  {
    id: 'wand1',
    name: 'Ace of Wands',
    image: 'images/tarot card/wand1.jpg',
    upright: {
      luck: 'New creative energy sparks strong beginnings.',
      mood: 'Inspired, motivated, and ready to act.',
      event: 'I may start a new project or feel a sudden burst of passion.'
    },
    reversed: {
      luck: 'Creative energy is blocked; new beginnings stall.',
      mood: 'Uninspired, low motivation, struggling to take initiative.',
      event: 'I may delay starting a project or feel stuck without direction.'
    }
  },
  {
    id: 'wands7',
    name: 'Seven of Wands',
    image: 'images/tarot card/wands7.png',
    upright: {
      luck: 'Standing your ground leads to success despite challenges.',
      mood: 'Determined, defensive, and confident in position.',
      event: 'I may defend my ideas or overcome competition through persistence.'
    },
    reversed: {
      luck: 'Defense weakens; it\'s harder to maintain position or boundaries.',
      mood: 'Overwhelmed, easily discouraged, lacking confidence to stand ground.',
      event: 'I may give up on a challenge or avoid confrontation instead of asserting myself.'
    }
  },
  {
    id: 'swords7',
    name: 'Seven of Swords',
    image: 'images/tarot card/swords7.jpeg',
    upright: {
      luck: 'Situations require strategy; success may come through indirect methods.',
      mood: 'Cautious, secretive, or calculating.',
      event: 'I may act discreetly, avoid confrontation, or deal with hidden agendas.'
    },
    reversed: {
      luck: 'Truth surfaces; hidden issues are exposed.',
      mood: 'Guilty, defensive, or ready to come clean.',
      event: 'I may confess something, get caught, or decide to act more honestly.'
    }
  },
  {
    id: 'knight-swords',
    name: 'Knight of Swords',
    image: 'images/tarot card/KNIGHT \u2022 SWORDS.jpg',
    upright: {
      luck: 'Fast progress and decisive action bring results.',
      mood: 'Driven, focused, mentally sharp but intense.',
      event: 'I may take quick action, speak directly, or push forward aggressively.'
    },
    reversed: {
      luck: 'Momentum is chaotic; plans may fail due to poor judgment or rushed decisions.',
      mood: 'Irritable, impatient, mentally scattered.',
      event: 'I might argue unnecessarily or make a hasty decision that leads to complications.'
    }
  },
  {
    id: 'pentacle9',
    name: 'Nine of Pentacles',
    image: 'images/tarot card/pentacle9.png',
    upright: {
      luck: 'Financial and personal independence bring comfort and stability.',
      mood: 'Self-sufficient, confident, and content with achievements.',
      event: 'I may enjoy personal success, financial security, or time alone.'
    },
    reversed: {
      luck: 'Independence weakens; reliance on others increases unexpectedly.',
      mood: 'Insecure about self-worth or material stability.',
      event: 'I may overspend, feel financially uneasy, or depend on someone else more than intended.'
    }
  }
];
