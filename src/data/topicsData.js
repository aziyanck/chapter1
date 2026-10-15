export const PRESENTATION_INFO = {
  subject: "Wireless Communication Networks",
  unit: "Unit 1: Introduction",
  courseCode: "WCN-SEM7",
  presenters: [
    { name: "Muhammed Rayees", role: "Presenter / Speaker 1" },
    { name: "Abdulla Aziyan C K", role: "Presenter / Speaker 2" }
  ],
  academicYear: "Semester 7 - Computer Science & Engineering",
  description: "Comprehensive lecture and interactive study portal covering the foundations of wireless transmission, antenna fundamentals, radio wave propagation modes, multipath fading mechanisms, and analog/digital signal encoding conversions."
};

export const TOPICS = [
  {
    id: "topic-1",
    number: 1,
    title: "Wireless Communication Technology",
    shortTitle: "Wireless Comm Tech",
    tagline: "Principles, Components, Types of Wireless Comm, Networks & Applications",
    category: "Foundations",
    duration: "15 mins",
    keyConcepts: [
      "Definition: Transmitting data without physical cables using electromagnetic waves",
      "Basic Principle: Converting info into signals & sending through air via Tx, Channel, and Rx",
      "4 Core Components: Transmitter, Antenna, Channel, and Receiver",
      "7 Types: Radio, Microwave, Satellite, Infrared, Cellular, Wi-Fi, and Bluetooth",
      "4 Network Categories: WPAN, WLAN, WMAN, and WWAN",
      "Real-world Applications: Cellular, Wi-Fi, GPS, Satellite, IoT Smart-home & Emergency"
    ],
    slides: [
      {
        id: "slide-1",
        number: 1,
        title: "1. Definition of Wireless Communication",
        subtitle: "Foundation & Core Concept",
        accent: "bg-[#bae6fd]",
        points: [
          "Wireless communication is the process of transmitting information between two or more devices without using physical cables.",
          "It uses electromagnetic waves, such as radio waves, to transfer data across free space.",
          "Enables flexible, untethered mobility for voice, data, video, and control signals."
        ],
        examples: ["Wi-Fi", "Bluetooth", "Mobile Networks (4G/5G)", "Satellite Communication"],
        badge: "Core Definition"
      },
      {
        id: "slide-2",
        number: 2,
        title: "2. Basic Principle of Wireless Communication",
        subtitle: "Signal Conversion & Step-by-Step Flow",
        accent: "bg-[#fef08a]",
        summary: "Wireless communication works by converting information into signals and transmitting them through the air.",
        steps: [
          { step: "1", title: "Transmitter", desc: "Converts information into electrical signals." },
          { step: "2", title: "Transmitting antenna", desc: "Sends electromagnetic waves through the air." },
          { step: "3", title: "Wireless channel", desc: "Carries the signals through unguided space to the destination." },
          { step: "4", title: "Receiving antenna", desc: "Captures and intercepts the transmitted waves." },
          { step: "5", title: "Receiver", desc: "Converts the received signals back into original information." }
        ],
        badge: "Working Principle"
      },
      {
        id: "slide-3",
        number: 3,
        title: "3. Components of a Wireless Communication System",
        subtitle: "The 4 Essential Hardware & Media Building Blocks",
        accent: "bg-[#bbf7d0]",
        components: [
          { name: "Transmitter", role: "Sends the information by processing, encoding, and modulating the source data into RF energy." },
          { name: "Antenna", role: "Transducer that transmits and receives electromagnetic waves into or from free space." },
          { name: "Channel", role: "The physical medium (air / atmosphere / vacuum) through which the electromagnetic signals travel." },
          { name: "Receiver", role: "Receives, amplifies, demodulates, and processes the signals back to recognizable output." }
        ],
        badge: "System Architecture"
      },
      {
        id: "slide-4",
        number: 4,
        title: "4. Types of Wireless Communication",
        subtitle: "7 Major Wireless Transmission Technologies",
        accent: "bg-[#fed7aa]",
        types: [
          { name: "Radio Communication", desc: "Uses radio waves to transmit information.", example: "FM radio broadcasting" },
          { name: "Microwave Communication", desc: "Uses high-frequency electromagnetic waves for line-of-sight links.", example: "Point-to-point telecom links" },
          { name: "Satellite Communication", desc: "Uses orbiting satellites to relay signals over vast planetary distances.", example: "Satellite television (DTH)" },
          { name: "Infrared Communication", desc: "Uses infrared light spectrum for direct short-distance transmission.", example: "TV remote controls" },
          { name: "Cellular Communication", desc: "Uses a network of geographical cells and base stations for wide mobility.", example: "4G LTE and 5G NR" },
          { name: "Wi-Fi", desc: "Provides high-speed wireless local network access to devices.", example: "Connecting a laptop to a home router" },
          { name: "Bluetooth", desc: "Enables low-power, short-range wireless data exchange between devices.", example: "Wireless headphones & smartwatches" }
        ],
        badge: "Technologies"
      },
      {
        id: "slide-5",
        number: 5,
        title: "5. Types of Wireless Networks",
        subtitle: "Geographical Coverage & Classification",
        accent: "bg-[#e9d5ff]",
        networks: [
          { code: "WPAN", name: "Wireless Personal Area Network", scope: "Very short distance (a few meters)", example: "Bluetooth, Zigbee (smart peripherals)" },
          { code: "WLAN", name: "Wireless Local Area Network", scope: "Limited area (home, office, campus)", example: "Wi-Fi (IEEE 802.11 standards)" },
          { code: "WMAN", name: "Wireless Metropolitan Area Network", scope: "City or metropolitan scale", example: "WiMAX, city-wide municipal wireless" },
          { code: "WWAN", name: "Wireless Wide Area Network", scope: "Large nationwide / global geographical areas", example: "Cellular networks (4G/5G), Satellite links" }
        ],
        badge: "Network Scales"
      },
      {
        id: "slide-6",
        number: 6,
        title: "6. Applications of Wireless Communication",
        subtitle: "Everyday, Industrial, and Critical Domains",
        accent: "bg-[#fbcfe8]",
        applications: [
          { title: "Mobile Phones & Cellular Networks", desc: "Global mobile voice, messaging, and high-speed packet data on the go." },
          { title: "Wi-Fi & Internet Access", desc: "Broadband connectivity in homes, offices, coffee shops, and universities." },
          { title: "Bluetooth Peripherals", desc: "Connecting wireless audio, keyboards, mice, wearables, and healthcare sensors." },
          { title: "Satellite Communication", desc: "Intercontinental broadcasting, maritime vessels, aviation, and remote internet." },
          { title: "GPS Navigation", desc: "Global positioning satellites providing real-time location and turn-by-turn routing." },
          { title: "Wireless Sensors & Smart Home", desc: "IoT climate sensors, security cameras, smart lighting, and automated locks." },
          { title: "Emergency & Military Communication", desc: "Disaster recovery, police/fire radio dispatch, and encrypted tactical field links." }
        ],
        badge: "Practical Uses"
      }
    ],
    formulas: [],
    examTips: []
  },
  {
    id: "topic-2",
    number: 2,
    title: "Antennas",
    shortTitle: "Antennas",
    tagline: "Antenna Basics, Types, Radiation Pattern, Gain, Directivity, Efficiency, Polarization, Beamwidth, Bandwidth & Aperture",
    category: "Electromagnetics",
    duration: "20 mins",
    keyConcepts: [
      "Antenna: Converts electrical signals into EM waves (transmission) and EM waves into electrical signals (reception)",
      "7 Types: Dipole, Monopole, Loop, Yagi-Uda, Parabolic Reflector, Horn, and Microstrip (Patch)",
      "Radiation Pattern: Omnidirectional, Directional, and Isotropic",
      "Parameters: Gain, Directivity, Efficiency, Beamwidth, Bandwidth, and Effective Aperture",
      "Polarization: Linear, Circular, and Elliptical orientation of the electric field"
    ],
    slides: [
      {
        id: "slide-1",
        number: 1,
        title: "1. Antenna",
        subtitle: "Definition & Examples",
        accent: "bg-[#bae6fd]",
        definition: "An antenna is a device that converts electrical signals into electromagnetic waves for transmission and electromagnetic waves into electrical signals during reception.",
        examples: ["Mobile Phones", "Wi-Fi Routers", "Satellite Dishes"],
        badge: "Antenna"
      },
      {
        id: "slide-2",
        number: 2,
        title: "2. Types of Antennas",
        subtitle: "7 Common Antenna Structures",
        accent: "bg-[#fef08a]",
        items: [
          { name: "Dipole Antenna", desc: "Consists of two conductive elements.", example: "Radio communication", image: "/imgs/dipole antenna.png" },
          { name: "Monopole Antenna", desc: "Consists of a single radiating element.", example: "Mobile and vehicle communication", image: "/imgs/monopol.png" },
          { name: "Loop Antenna", desc: "Consists of a conductor arranged in a closed loop.", example: "Radio receivers and RFID systems", image: "/imgs/loop antenna.png" },
          { name: "Yagi-Uda Antenna", desc: "A directional antenna with a driven element, reflector and directors.", example: "Television reception", image: "/imgs/yagi uda antenna.png" },
          { name: "Parabolic Reflector Antenna", desc: "Uses a dish-shaped reflector to concentrate signals in a particular direction.", example: "Satellite communication", image: "/imgs/parabolic.png" },
          { name: "Horn Antenna", desc: "Uses a flared structure to transmit or receive electromagnetic waves.", example: "Radar and microwave communication", image: "/imgs/horn.png" },
          { name: "Microstrip (Patch) Antenna", desc: "A compact, flat antenna.", example: "Mobile phones, GPS devices and wireless systems", image: "/imgs/patch antenna.png" }
        ],
        badge: "Types"
      },
      {
        id: "slide-3",
        number: 3,
        title: "3. Radiation Pattern",
        subtitle: "Strength of Radiation vs Direction",
        accent: "bg-[#fed7aa]",
        definition: "A radiation pattern is a graphical representation of the strength of radiation in different directions around an antenna.",
        typesLabel: "Types of Radiation Pattern",
        types: [
          { name: "Omnidirectional", desc: "Provides broad coverage around the antenna in a particular plane." },
          { name: "Directional", desc: "Concentrates radiation in a specific direction." },
          { name: "Isotropic", desc: "Radiates equally in all directions." }
        ],
        image: { src: "/imgs/2.3 compare.png", alt: "Isotropic (0 dBi), omnidirectional (+4 dBi) and directional (+12 dBi) radiation patterns" },
        badge: "Radiation Pattern"
      },
      {
        id: "slide-4",
        number: 4,
        title: "4. Antenna Gain",
        subtitle: "Directing Energy Compared to a Reference",
        accent: "bg-[#e9d5ff]",
        definition: "Antenna gain indicates how effectively an antenna directs energy in a particular direction compared with a reference antenna.",
        points: [
          "High gain generally means more concentrated radiation.",
          "Gain is commonly measured in dBi or dBd.",
          "High-gain antennas are useful for long-distance communication.",
          "Zero gain (0 dBi) means the antenna radiates the same as an isotropic antenna, with no concentration of energy in any direction."
        ],
        badge: "Gain"
      },
      {
        id: "slide-5",
        number: 5,
        title: "5. Directivity",
        subtitle: "Concentration of Radiation vs an Isotropic Radiator",
        accent: "bg-[#fbcfe8]",
        definition: "Directivity measures how strongly an antenna concentrates its radiation in a particular direction compared with an isotropic radiator.",
        points: [
          "High directivity means radiation is more concentrated in a particular direction.",
          "It does not account for antenna losses.",
          "Gain = Efficiency × Directivity (G = η · D), so gain includes losses but directivity does not."
        ],
        formula: {
          expr: "D = 4π · U_max / P_rad",
          where: [
            "U_max = maximum radiation intensity",
            "P_rad = total radiated power"
          ]
        },
        badge: "Directivity"
      },
      {
        id: "slide-6",
        number: 6,
        title: "6. Antenna Efficiency",
        subtitle: "Radiated Power vs Input Power",
        accent: "bg-[#bae6fd]",
        definition: "Antenna efficiency is the ratio of the power radiated by an antenna to the power supplied to it.",
        formula: {
          expr: "η = (P_rad / P_in) × 100%",
          where: [
            "P_rad = power radiated by the antenna",
            "P_in = input power supplied to the antenna"
          ]
        },
        example: "If an antenna receives 100 W of input power and radiates 80 W, its radiation efficiency is 80%.",
        badge: "Efficiency"
      },
      {
        id: "slide-7",
        number: 7,
        title: "7. Antenna Polarization",
        subtitle: "Orientation of the Electric Field",
        accent: "bg-[#fef08a]",
        definition: "Polarization describes the orientation and movement of the electric field of an electromagnetic wave.",
        typesLabel: "Types of Polarization",
        types: [
          { name: "Linear", desc: "The electric field oscillates along a straight line (vertical or horizontal).", example: "FM/AM radio, mobile towers (vertical)" },
          { name: "Circular", desc: "The electric field rotates in a circular path with constant strength (RHCP or LHCP).", example: "GPS, satellite TV, RFID" },
          { name: "Elliptical", desc: "The electric field traces an elliptical path. Linear and circular are special cases of elliptical.", example: "Most practical antennas" }
        ],
        notesLabel: "Why Polarization Matters",
        notes: [
          "The antenna's shape and orientation decide the polarization: a vertical rod sends vertically polarized waves.",
          "The receiving antenna must match the transmitter's polarization, otherwise signal is lost (polarization mismatch loss)."
        ],
        table: {
          label: "Polarization Mismatch",
          headers: ["Transmitter", "Receiver", "Result"],
          rows: [
            ["Vertical", "Vertical", "Full signal"],
            ["Vertical", "Tilted 45°", "Half the power lost"],
            ["Vertical", "Horizontal", "Almost no signal"],
            ["Circular", "Linear (any angle)", "Half the power lost"]
          ]
        },
        badge: "Polarization"
      },
      {
        id: "slide-8",
        number: 8,
        title: "8. Beamwidth",
        subtitle: "Angular Width of the Main Lobe",
        accent: "bg-[#bbf7d0]",
        definition: "Beamwidth is the angular width of an antenna's main radiation lobe.",
        typesLabel: "Narrow vs Wide Beamwidth",
        types: [
          { name: "Narrow Beamwidth", desc: "Concentrates radiation in a smaller angular region." },
          { name: "Wide Beamwidth", desc: "Covers a larger angular region." }
        ],
        example: "Satellite dishes generally have narrow beamwidths, while Wi-Fi router antennas have wide beamwidths to cover an entire room.",
        badge: "Beamwidth"
      },
      {
        id: "slide-9",
        number: 9,
        title: "9. Antenna Bandwidth",
        subtitle: "Usable Range of Operating Frequencies",
        accent: "bg-[#fed7aa]",
        definition: "Antenna bandwidth is the range of frequencies over which an antenna meets specified performance requirements.",
        formula: {
          expr: "BW = f_H − f_L",
          where: [
            "f_H = highest operating frequency",
            "f_L = lowest operating frequency"
          ]
        },
        badge: "Bandwidth"
      },
      {
        id: "slide-10",
        number: 10,
        title: "10. Effective Aperture",
        subtitle: "Power-Capturing Area of a Receiving Antenna",
        accent: "bg-[#fbcfe8]",
        definition: "Effective aperture represents an antenna's ability to capture power from an incoming electromagnetic wave.",
        points: [
          "It is measured in square metres (m²).",
          "Effective aperture is usually smaller than the physical aperture, because part of the incoming power is lost or not captured."
        ],
        typesLabel: "Physical vs Effective Aperture",
        types: [
          { name: "Physical Aperture", desc: "The actual physical area of the antenna that faces the incoming wave (e.g. the full surface of a dish)." },
          { name: "Effective Aperture", desc: "The equivalent area that actually captures power from the wave. Depends on gain and wavelength, not just size." }
        ],
        image: { src: "/imgs/aperture.png", alt: "Satellite dish showing physical aperture versus the smaller effective aperture, with Ae = G × λ² / 4π" },
        formula: {
          expr: "A_e = G · λ² / 4π",
          where: [
            "G = linear antenna gain",
            "λ = wavelength"
          ]
        },
        badge: "Effective Aperture"
      }
    ],
    formulas: [
      {
        name: "Directivity",
        latex: "D = 4π · U_max / P_rad",
        description: "U_max is the maximum radiation intensity and P_rad is the total radiated power."
      },
      {
        name: "Antenna Efficiency",
        latex: "η = (P_rad / P_in) × 100%",
        description: "Ratio of the power radiated by an antenna to the power supplied to it."
      },
      {
        name: "Antenna Bandwidth",
        latex: "BW = f_H − f_L",
        description: "f_H is the highest and f_L is the lowest operating frequency."
      },
      {
        name: "Effective Aperture",
        latex: "A_e = G · λ² / 4π",
        description: "G is the linear antenna gain and λ is the wavelength."
      }
    ],
    examTips: [
      "Define antenna gain, directivity and efficiency, and explain how they differ.",
      "An antenna receives 100 W and radiates 80 W — its efficiency is 80%."
    ]
  },
  {
    id: "topic-3",
    number: 3,
    title: "Propagation Modes",
    shortTitle: "Propagation Modes",
    tagline: "Ground Wave, Sky Wave, Line-of-Sight Propagation & Factors Affecting Propagation",
    category: "Electromagnetics",
    duration: "20 mins",
    interactiveVisual: false,
    keyConcepts: [
      "Propagation modes: The different ways EM waves travel from a transmitting antenna to a receiving antenna",
      "Ground wave: Travels along the Earth's surface, useful at LF and MF",
      "Sky wave: Refracted back to Earth by the ionosphere, HF band (3–30 MHz)",
      "Line-of-sight: Direct path between antennas, used for VHF, UHF and microwave",
      "Radio horizon extends beyond the optical horizon due to atmospheric refraction",
      "Factors: Frequency, distance, atmosphere, obstacles, ground conductivity, antenna height, power and interference"
    ],
    slides: [
      {
        id: "slide-1",
        number: 1,
        title: "1. Propagation Modes",
        subtitle: "How Radio Waves Travel from Tx to Rx",
        accent: "bg-[#bae6fd]",
        definition: "Propagation modes are the different ways electromagnetic waves travel from a transmitting antenna to a receiving antenna.",
        topImage: { src: "/imgs/props.png", alt: "Ground wave (below 2 MHz), sky wave (2 to 30 MHz) and line-of-sight (above 30 MHz) propagation" },
        points: [
          "Radio waves can travel along the Earth's surface, through the atmosphere, or directly between antennas."
        ],
        typesLabel: "The Main Propagation Modes",
        types: [
          { name: "Ground Wave", desc: "Travels along the Earth's surface." },
          { name: "Sky Wave", desc: "Refracted back to Earth by the ionosphere." },
          { name: "Line-of-Sight", desc: "Travels directly between antennas." }
        ],
        badge: "Definition"
      },
      {
        id: "slide-2",
        number: 2,
        title: "2. Ground-Wave Propagation",
        subtitle: "Along the Earth's Surface",
        accent: "bg-[#bbf7d0]",
        definition: "Ground-wave propagation is the transmission of radio waves along the Earth's surface.",
        diagram: "ground",
        pointsLabel: "Working",
        points: [
          "Radio waves travel close to and follow the Earth's surface.",
          "The waves can bend around the Earth's curvature to some extent.",
          "Propagation depends on frequency and ground conductivity."
        ],
        facts: {
          frequency: "Particularly useful at lower frequencies, such as LF and MF.",
          applications: "AM broadcasting at suitable frequencies, maritime communication and navigation systems."
        },
        pros: [
          "Can cover beyond the visual horizon.",
          "Useful for communication over the Earth's surface."
        ],
        cons: [
          "Signal strength decreases with distance.",
          "Ground absorption can weaken the signal.",
          "Less suitable for high-frequency transmission over long distances."
        ],
        badge: "Ground Wave"
      },
      {
        id: "slide-3",
        number: 3,
        title: "3. Sky-Wave Propagation",
        subtitle: "Refracted Back by the Ionosphere",
        accent: "bg-[#e9d5ff]",
        definition: "Sky-wave propagation is the transmission of radio waves that travel toward the ionosphere and are refracted back toward the Earth.",
        diagram: "sky",
        stepsLabel: "Working",
        steps: [
          { step: "1", title: "Upward transmission", desc: "The transmitting antenna sends radio waves upward." },
          { step: "2", title: "Enters the ionosphere", desc: "The waves enter the ionosphere, a region of the upper atmosphere containing charged particles." },
          { step: "3", title: "Refraction", desc: "Under suitable conditions, the waves are refracted back toward Earth." },
          { step: "4", title: "Long distance", desc: "The signals can travel long distances, sometimes through multiple hops." }
        ],
        facts: {
          frequency: "Commonly associated with the HF band (3–30 MHz).",
          applications: "Shortwave broadcasting, amateur radio and long-distance radio communication."
        },
        pros: [
          "Enables communication over very long distances.",
          "Can reach beyond the line of sight."
        ],
        cons: [
          "Depends on ionospheric conditions.",
          "Signal strength and quality may vary.",
          "Communication can be affected by solar activity and atmospheric changes."
        ],
        badge: "Sky Wave"
      },
      {
        id: "slide-4",
        number: 4,
        title: "4. Line-of-Sight (LOS) Propagation",
        subtitle: "Direct Path Between Antennas",
        accent: "bg-[#fef08a]",
        definition: "Line-of-sight propagation occurs when radio waves travel along a direct path between the transmitting and receiving antennas.",
        diagram: "los",
        pointsLabel: "Working",
        points: [
          "The transmitting antenna sends radio waves toward the receiver.",
          "The receiver must be within a suitable radio path, with sufficient clearance from obstacles.",
          "The Earth's curvature limits the distance between antennas near the ground.",
          "Radio horizon: the maximum distance for a direct radio path. It extends slightly beyond the optical (visual) horizon because the atmosphere bends radio waves, and increases with antenna height."
        ],
        facts: {
          frequency: "Commonly used for VHF, UHF and microwave communication.",
          applications: "Television broadcasting, mobile communication, Wi-Fi links, microwave links and satellite communication."
        },
        pros: [
          "Supports high data rates with suitable equipment.",
          "Provides relatively predictable propagation when the path is clear.",
          "Suitable for directional communication links."
        ],
        cons: [
          "Buildings, hills and other obstacles can block or weaken signals.",
          "Coverage is limited by the radio horizon.",
          "Often requires suitable antenna placement."
        ],
        badge: "Line-of-Sight"
      },
      {
        id: "slide-5",
        number: 5,
        title: "5. Factors Affecting Propagation Modes",
        subtitle: "What Changes How Radio Waves Travel",
        accent: "bg-[#fed7aa]",
        typesLabel: "8 Key Factors",
        typeExampleLabel: "Example",
        types: [
          { name: "Frequency", desc: "Different frequencies behave differently during propagation.", example: "AM radio (MF) travels far along the ground, while Wi-Fi (2.4 GHz) barely reaches the next room." },
          { name: "Distance", desc: "Greater distances generally cause greater signal loss.", example: "Your phone shows fewer signal bars as you move away from the mobile tower." },
          { name: "Atmospheric Conditions", desc: "Temperature, humidity and ionospheric conditions can affect radio waves.", example: "Heavy rain weakens satellite TV (DTH) reception, and shortwave radio reaches farther at night." },
          { name: "Obstacles", desc: "Buildings, mountains and trees may block or weaken signals.", example: "Mobile signal drops inside a lift or basement, or behind a hill." },
          { name: "Ground Conductivity", desc: "Affects ground-wave propagation.", example: "AM ship radio reaches much farther over seawater than over dry desert sand." },
          { name: "Antenna Height", desc: "Influences line-of-sight coverage.", example: "TV and mobile towers are built tall so their signal reaches beyond nearby buildings and the horizon." },
          { name: "Transmitted Power", desc: "Affects the received signal strength.", example: "A high-power FM station covers a whole city, while a walkie-talkie reaches only a few kilometres." },
          { name: "Interference", desc: "Other signals can affect communication quality.", example: "A running microwave oven can slow down 2.4 GHz Wi-Fi, since both use the same frequency." }
        ],
        badge: "Factors"
      }
    ],
    formulas: [],
    examTips: [
      "Compare ground wave, sky wave and line-of-sight propagation by frequency, working and applications.",
      "Explain why the radio horizon extends beyond the optical horizon."
    ]
  },
  {
    id: "topic-4",
    number: 4,
    title: "Fading in Mobile Environment",
    shortTitle: "Fading in Mobile Env",
    tagline: "Causes, Multipath, Path Loss, Shadowing, Doppler, Types of Fading & Effects",
    category: "Channel Dynamics",
    duration: "25 mins",
    interactiveVisual: false,
    keyConcepts: [
      "Fading: Variation in received signal strength over time, distance or frequency",
      "Causes: Multipath, movement, obstacles, atmospheric conditions and interference",
      "Path loss reduces power with distance; shadowing is caused by obstacles",
      "Doppler shift: f_d = (v / λ) cos θ, caused by relative movement",
      "Types: Large/small-scale, fast/slow, Rayleigh/Rician"
    ],
    slides: [
      {
        id: "slide-1",
        number: 1,
        title: "1. Fading",
        subtitle: "Definition & Core Idea",
        accent: "bg-[#bae6fd]",
        definition: "Fading is the variation in the strength of a received signal over time, distance or frequency in a wireless communication system.",
        diagram: "fading",
        points: [
          "It occurs due to obstacles, movement of mobile devices and multipath propagation."
        ],
        example: "While talking on a mobile phone, the signal may become weak when you move behind a building.",
        badge: "Definition"
      },
      {
        id: "slide-2",
        number: 2,
        title: "2. Causes of Fading",
        subtitle: "Why the Received Signal Varies",
        accent: "bg-[#fef08a]",
        typesLabel: "5 Causes",
        types: [
          { name: "Multipath Propagation", desc: "Signals reach the receiver through different paths due to reflection, diffraction and scattering." },
          { name: "Movement of Mobile Devices", desc: "Movement changes the signal paths and their relative phases." },
          { name: "Obstacles", desc: "Buildings, trees and hills can block or weaken signals." },
          { name: "Atmospheric Conditions", desc: "Changes in the environment can affect radio-wave propagation." },
          { name: "Interference", desc: "Multiple signal components may combine and strengthen or weaken the received signal." }
        ],
        badge: "Causes"
      },
      {
        id: "slide-3",
        number: 3,
        title: "3. Multipath Propagation",
        subtitle: "One Signal, Many Paths",
        accent: "bg-[#bbf7d0]",
        definition: "Multipath propagation occurs when a transmitted signal reaches the receiver through multiple paths.",
        diagram: ["multipath", "interference"],
        points: [
          "The signals may arrive at different times and with different phases."
        ],
        typesLabel: "How the Copies Combine",
        types: [
          { name: "Constructive Interference", desc: "Signals combine and strengthen the received signal." },
          { name: "Destructive Interference", desc: "Signals combine and weaken the received signal." }
        ],
        notesLabel: "Important",
        notes: [
          "Multipath propagation is a major cause of fading in mobile communication."
        ],
        badge: "Multipath"
      },
      {
        id: "slide-4",
        number: 4,
        title: "4. Path Loss",
        subtitle: "Power Reduction with Distance",
        accent: "bg-[#fed7aa]",
        definition: "Path loss is the reduction in signal power as the distance between the transmitter and receiver increases.",
        diagram: "pathloss",
        example: "A mobile phone generally receives a weaker signal when it moves farther away from a cell tower, assuming other conditions remain comparable.",
        notesLabel: "Important Difference",
        notes: [
          "Path loss describes the overall reduction in signal power with distance, whereas fading describes signal variations around the expected signal level."
        ],
        badge: "Path Loss"
      },
      {
        id: "slide-5",
        number: 5,
        title: "5. Shadowing",
        subtitle: "Obstacles Blocking the Signal",
        accent: "bg-[#e9d5ff]",
        definition: "Shadowing occurs when obstacles such as buildings, hills or trees obstruct radio waves and cause variations in the received signal strength.",
        diagram: "shadowing",
        points: [
          "Shadowing is also called shadow fading."
        ],
        example: "A mobile signal becomes weaker when a user enters a building.",
        badge: "Shadowing"
      },
      {
        id: "slide-6",
        number: 6,
        title: "6. Doppler Effect and Doppler Shift",
        subtitle: "Frequency Change Due to Movement",
        accent: "bg-[#fbcfe8]",
        definition: "The Doppler effect is the change in the observed frequency of a signal due to relative movement between the transmitter and receiver.",
        diagram: "doppler",
        points: [
          "Greater movement speed generally produces a larger maximum Doppler shift."
        ],
        formula: {
          expr: "f_d = (v / λ) · cos θ",
          where: [
            "f_d = Doppler frequency shift",
            "v = relative speed",
            "λ = wavelength",
            "θ = angle between the direction of motion and the direction of wave arrival"
          ]
        },
        example: "When a person moves while using a mobile phone, the received radio signal may experience a frequency shift.",
        badge: "Doppler"
      },
      {
        id: "slide-7",
        number: 7,
        title: "7. Large-Scale vs Small-Scale Fading",
        subtitle: "Types of Fading (A & B)",
        accent: "bg-[#bae6fd]",
        diagram: "scales",
        typesLabel: "Types",
        types: [
          { name: "Large-Scale Fading", desc: "Variations in the average received signal power over relatively large distances. Includes path loss (power decreases with distance) and shadow fading (obstacles vary the average strength)." },
          { name: "Small-Scale Fading", desc: "Rapid variations in the received signal strength over short distances or periods. Commonly results from multipath propagation and movement." }
        ],
        badge: "Large vs Small"
      },
      {
        id: "slide-8",
        number: 8,
        title: "8. Fast vs Slow Fading",
        subtitle: "Types of Fading (C & D)",
        accent: "bg-[#fef08a]",
        diagram: "fastslow",
        typesLabel: "Types",
        typeExampleLabel: "Example",
        types: [
          { name: "Fast Fading", desc: "The received signal changes rapidly over a short period. Cause: rapid changes in signal paths and relative phases, often associated with movement and Doppler effects.", example: "A moving mobile user experiences rapid signal fluctuations." },
          { name: "Slow Fading", desc: "The received signal changes more gradually over time. Cause: changes in shadowing and the surrounding environment.", example: "A mobile user gradually moving behind a large building experiences a change in signal strength." }
        ],
        badge: "Fast vs Slow"
      },
      {
        id: "slide-9",
        number: 9,
        title: "9. Rayleigh vs Rician Fading",
        subtitle: "Types of Fading (E & F) — Statistical Models",
        accent: "bg-[#fed7aa]",
        diagram: "rayleighrician",
        typesLabel: "Types",
        typeExampleLabel: "Example",
        types: [
          { name: "Rayleigh Fading", desc: "A statistical model for multipath fading when there is no dominant direct line-of-sight component.", example: "Mobile communication in an urban environment where buildings obstruct the direct path." },
          { name: "Rician Fading", desc: "A statistical model used when a dominant signal component, often a direct line-of-sight signal, exists alongside scattered multipath components.", example: "A wireless link with a clear direct path and additional reflected signals." }
        ],
        badge: "Rayleigh vs Rician"
      },
      {
        id: "slide-10",
        number: 10,
        title: "10. Effects of Fading",
        subtitle: "Impact on Communication Quality",
        accent: "bg-[#e9d5ff]",
        cons: [
          "Reduces received signal strength.",
          "Increases the probability of transmission errors.",
          "Can cause dropped calls.",
          "Reduces communication reliability.",
          "May decrease data transmission speed."
        ],
        badge: "Effects"
      }
    ],
    formulas: [
      {
        name: "Doppler Shift",
        latex: "f_d = (v / λ) · cos θ",
        description: "Doppler frequency shift for relative speed v, wavelength λ and arrival angle θ."
      }
    ],
    examTips: [
      "Differentiate path loss, shadowing and multipath fading with examples.",
      "Compare fast vs slow, and Rayleigh vs Rician fading."
    ]
  },
  {
    id: "topic-5",
    number: 5,
    title: "Signal Encoding Techniques",
    shortTitle: "Encoding Techniques",
    tagline: "Definition of Signal Encoding & the Four Encoding Techniques",
    category: "Signal Encoding",
    duration: "10 mins",
    interactiveVisual: false,
    keyConcepts: [
      "Signal encoding: Converting data into a signal suitable for transmission over a medium",
      "Digital data → Digital signal",
      "Digital data → Analog signal",
      "Analog data → Digital signal",
      "Analog data → Analog signal"
    ],
    slides: [
      {
        id: "slide-1",
        number: 1,
        title: "1. Signal Encoding Techniques",
        subtitle: "Definition & the Four Techniques",
        accent: "bg-[#bae6fd]",
        definition: "Signal encoding is the process of converting data (digital or analog) into a signal (digital or analog) that is suitable for transmission over a communication medium.",
        typesLabel: "The Four Encoding Techniques",
        typeExampleLabel: "Example",
        types: [
          { name: "Digital Data → Digital Signal", example: "A computer sending data to another computer over an Ethernet (LAN) cable." },
          { name: "Digital Data → Analog Signal", example: "A Wi-Fi router or dial-up modem sending digital data as radio or telephone-line waves." },
          { name: "Analog Data → Digital Signal", example: "Your voice on a mobile call being digitized, or a song recorded as an MP3 file." },
          { name: "Analog Data → Analog Signal", example: "AM and FM radio broadcasting a presenter's voice." }
        ],
        badge: "Encoding Techniques"
      }
    ],
    formulas: [],
    examTips: [
      "Define signal encoding.",
      "List the four signal encoding techniques with a one-line definition of each."
    ]
  },
  {
    id: "topic-6",
    number: 6,
    title: "Digital Data to Analog Signal",
    shortTitle: "Digital Data → Analog",
    tagline: "Digital-to-Analog Modulation: BASK, BFSK, PSK & QPSK",
    category: "Digital Modulation",
    duration: "20 mins",
    interactiveVisual: false,
    keyConcepts: [
      "Digital-to-analog conversion: Converting digital data (0s and 1s) into analog signals for transmission",
      "BASK: Carrier amplitude changes according to the data",
      "BFSK: Carrier frequency changes according to the data",
      "PSK: Carrier phase changes according to the data (BPSK, QPSK, DPSK)",
      "QPSK: Four phases, each dibit (2 bits) mapped to one phase"
    ],
    slides: [
      {
        id: "slide-1",
        number: 1,
        title: "1. Digital-to-Analog Conversion",
        subtitle: "Definition & Types",
        accent: "bg-[#bae6fd]",
        definition: "Digital-to-analog conversion is the process of converting digital data (0s and 1s) into analog signals for transmission through a communication medium.",
        diagram: "d2aflow",
        points: [
          "It is also called digital-to-analog modulation."
        ],
        typesLabel: "The Important Techniques",
        types: [
          { name: "BASK", desc: "Binary Amplitude Shift Keying" },
          { name: "BFSK", desc: "Binary Frequency Shift Keying" },
          { name: "PSK", desc: "Phase Shift Keying" },
          { name: "QPSK", desc: "Quadrature Phase Shift Keying" }
        ],
        example: "A digital modem uses modulation to transmit computer data over a communication channel.",
        badge: "Definition"
      },
      {
        id: "slide-2",
        number: 2,
        title: "2. Binary Amplitude Shift Keying (BASK)",
        subtitle: "Amplitude Changes with the Data",
        accent: "bg-[#fef08a]",
        definition: "BASK is a digital modulation technique in which the amplitude of the carrier signal changes according to the digital data.",
        lab: "bask",
        pointsLabel: "Working",
        points: [
          "When the input bit is 1, a carrier signal with a particular amplitude is transmitted.",
          "When the input bit is 0, the carrier may have zero or a different amplitude, depending on the scheme.",
          "The receiver detects the amplitude to recover the transmitted bits."
        ],
        table: {
          label: "Example: Binary Amplitude Shift Keying (BASK)",
          headers: ["Input bit", "Carrier amplitude"],
          rows: [["1", "High"], ["0", "Zero or low"]]
        },
        pros: ["Simple to implement.", "Requires relatively simple circuitry."],
        cons: ["Sensitive to noise and amplitude variations."],
        badge: "BASK"
      },
      {
        id: "slide-3",
        number: 3,
        title: "3. Binary Frequency Shift Keying (BFSK)",
        subtitle: "Frequency Changes with the Data",
        accent: "bg-[#fed7aa]",
        definition: "BFSK is a digital modulation technique in which the frequency of the carrier changes according to the digital data.",
        lab: "bfsk",
        pointsLabel: "Working",
        points: [
          "Bit 1 is represented by one frequency.",
          "Bit 0 is represented by another frequency.",
          "The receiver identifies the frequency and recovers the bits."
        ],
        table: {
          label: "Example: Binary Frequency Shift Keying (BFSK)",
          headers: ["Input bit", "Carrier frequency"],
          rows: [["1", "Higher frequency"], ["0", "Lower frequency"]]
        },
        pros: [
          "Generally less sensitive to amplitude variations than BASK.",
          "Can provide reliable communication in noisy environments."
        ],
        cons: ["Can require more bandwidth than some other modulation techniques."],
        badge: "BFSK"
      },
      {
        id: "slide-4",
        number: 4,
        title: "4. Phase Shift Keying (PSK)",
        subtitle: "Phase Changes with the Data",
        accent: "bg-[#fbcfe8]",
        definition: "PSK is a digital modulation technique in which the phase of the carrier signal changes according to the digital data.",
        lab: "bpsk",
        pointsLabel: "Working",
        points: [
          "Different digital symbols are represented by different carrier phases.",
          "The receiver detects the phase or phase difference and recovers the transmitted data."
        ],
        table: {
          label: "Example: Binary Phase Shift Keying (BPSK)",
          headers: ["Input bit", "Carrier phase"],
          rows: [["1", "0°"], ["0", "180°"]]
        },
        pros: [
          "Good noise performance compared with BASK in many conditions.",
          "Efficient use of transmission power."
        ],
        cons: ["Some PSK systems require accurate carrier synchronization."],
        badge: "PSK"
      },
      {
        id: "slide-5",
        number: 5,
        title: "5. Quadrature Phase Shift Keying (QPSK)",
        subtitle: "Four Phases, Two Bits per Symbol",
        accent: "bg-[#bbf7d0]",
        definition: "QPSK is a phase shift keying technique that uses four carrier phases, so each symbol carries 2 bits.",
        lab: "qpsk",
        pointsLabel: "Working",
        points: [
          "The input bits are grouped into pairs called dibits (00, 01, 11, 10).",
          "Each dibit is represented by one of four carrier phases.",
          "The receiver detects the phase of each symbol and recovers both bits."
        ],
        table: {
          label: "Example: QPSK Phase Assignment (Gray coded)",
          headers: ["Dibit", "Carrier phase"],
          rows: [["00", "45°"], ["01", "135°"], ["11", "225°"], ["10", "315°"]]
        },
        pros: [
          "Carries twice as many bits per symbol as BPSK.",
          "Needs about half the bandwidth of BPSK for the same bit rate."
        ],
        cons: [
          "The receiver must distinguish four phases, so it is more complex than BPSK.",
          "Requires accurate carrier synchronization."
        ],
        badge: "QPSK"
      }
    ],
    formulas: [],
    examTips: [
      "Explain BASK, BFSK, PSK and QPSK with their working principles.",
      "Compare BASK, BFSK, BPSK and QPSK."
    ]
  },
  {
    id: "topic-7",
    number: 7,
    title: "Analog Data to Analog Signal",
    shortTitle: "Analog Data → Analog",
    tagline: "Analog Modulation: AM, FM & PM",
    category: "Analog Modulation",
    duration: "20 mins",
    interactiveVisual: false,
    keyConcepts: [
      "Analog-to-analog conversion: Transmitting analog information using an analog carrier signal",
      "AM: Carrier amplitude varies with the message; modulation index m = A_m / A_c",
      "FM: Instantaneous frequency varies with the message; β = Δf / f_m",
      "PM: Carrier phase varies with the message",
      "AM → Amplitude, FM → Frequency, PM → Phase"
    ],
    slides: [
      {
        id: "slide-1",
        number: 1,
        title: "1. Analog-to-Analog Conversion",
        subtitle: "Definition & Types",
        accent: "bg-[#bae6fd]",
        definition: "Analog-to-analog conversion is the process of transmitting analog information using an analog carrier signal.",
        diagram: "analoginputs",
        points: [
          "It is also called analog modulation.",
          "The figure shows the two inputs: the message (the information) and the carrier (a plain high-frequency wave that carries no information on its own).",
          "The modulator combines them into the modulated signal (AM, FM or PM), shown on the next slides."
        ],
        typesLabel: "The Three Main Techniques",
        types: [
          { name: "AM", desc: "Amplitude Modulation" },
          { name: "FM", desc: "Frequency Modulation" },
          { name: "PM", desc: "Phase Modulation" }
        ],
        example: "In conventional AM radio broadcasting, the amplitude of a carrier signal varies according to the audio signal.",
        badge: "Definition"
      },
      {
        id: "slide-2",
        number: 2,
        title: "2. Amplitude Modulation (AM)",
        subtitle: "Carrier Amplitude Follows the Message",
        accent: "bg-[#fef08a]",
        definition: "AM is a modulation technique in which the amplitude of the carrier signal varies according to the instantaneous amplitude of the message signal.",
        lab: "am",
        stepsLabel: "Working",
        steps: [
          { step: "1", title: "Message input", desc: "The message signal, such as audio, is supplied to the modulator." },
          { step: "2", title: "Modulation", desc: "The modulator varies the carrier amplitude according to the message." },
          { step: "3", title: "Transmission", desc: "The modulated signal is transmitted through an antenna." },
          { step: "4", title: "Demodulation", desc: "The receiver demodulates the signal to recover the original audio." }
        ],
        notesLabel: "Important Point",
        notes: [
          "In conventional AM, the carrier frequency remains constant while its amplitude varies."
        ],
        formula: {
          label: "Modulation Index",
          expr: "m = A_m / A_c",
          where: [
            "m = modulation index",
            "A_m = peak amplitude of the modulating signal",
            "A_c = amplitude of the unmodulated carrier"
          ],
          note: "For a single-tone message and conventional AM, m is normally kept at or below 1 to avoid overmodulation."
        },
        pros: ["Simple to generate and demodulate.", "Can be implemented using relatively simple receivers."],
        cons: ["More sensitive to amplitude noise.", "Conventional AM can be power-inefficient."],
        badge: "AM"
      },
      {
        id: "slide-3",
        number: 3,
        title: "3. Frequency Modulation (FM)",
        subtitle: "Carrier Frequency Follows the Message",
        accent: "bg-[#fed7aa]",
        definition: "FM is a modulation technique in which the instantaneous frequency of the carrier varies according to the message signal.",
        lab: "fm",
        stepsLabel: "Working",
        steps: [
          { step: "1", title: "Message input", desc: "The message signal is supplied to the modulator." },
          { step: "2", title: "Modulation", desc: "The carrier frequency increases or decreases according to the message." },
          { step: "3", title: "Transmission", desc: "The modulated signal is transmitted." },
          { step: "4", title: "Demodulation", desc: "The receiver detects the frequency variations and recovers the original message." }
        ],
        notesLabel: "Important Point",
        notes: [
          "In ideal FM, the carrier amplitude remains constant while its instantaneous frequency varies."
        ],
        formula: {
          label: "FM Modulation Index",
          expr: "β = Δf / f_m",
          where: [
            "β = FM modulation index",
            "Δf = peak frequency deviation",
            "f_m = modulating frequency"
          ]
        },
        pros: ["Better resistance to amplitude noise than conventional AM.", "Can provide good audio quality."],
        cons: ["Often requires more bandwidth than conventional AM.", "The transmitter and receiver can be more complex."],
        badge: "FM"
      },
      {
        id: "slide-4",
        number: 4,
        title: "4. Phase Modulation (PM)",
        subtitle: "Carrier Phase Follows the Message",
        accent: "bg-[#fbcfe8]",
        definition: "PM is a modulation technique in which the phase of the carrier signal varies according to the instantaneous amplitude of the message signal.",
        lab: "pm",
        stepsLabel: "Working",
        steps: [
          { step: "1", title: "Message input", desc: "The message signal is supplied to the modulator." },
          { step: "2", title: "Modulation", desc: "The modulator changes the carrier phase according to the message." },
          { step: "3", title: "Transmission", desc: "The modulated signal is transmitted." },
          { step: "4", title: "Demodulation", desc: "The receiver detects the phase variations to recover the message." }
        ],
        notesLabel: "Important Point",
        notes: [
          "In PM, the carrier's phase varies according to the message signal. Its instantaneous frequency also varies when the message phase changes over time."
        ],
        pros: ["Can provide good resistance to amplitude noise.", "Forms an important foundation for digital phase modulation."],
        cons: ["Requires suitable phase-modulation and demodulation circuits.", "The resulting frequency variations depend on how the message changes."],
        badge: "PM"
      }
    ],
    formulas: [
      {
        name: "AM Modulation Index",
        latex: "m = A_m / A_c",
        description: "Peak message amplitude divided by unmodulated carrier amplitude; kept at or below 1."
      },
      {
        name: "FM Modulation Index",
        latex: "β = Δf / f_m",
        description: "Peak frequency deviation divided by modulating frequency."
      }
    ],
    examTips: [
      "Explain AM, FM and PM, and compare them.",
      "Define modulation index and frequency deviation."
    ]
  },
  {
    id: "topic-8",
    number: 8,
    title: "Analog Data to Digital Signal",
    shortTitle: "Analog Data → Digital",
    tagline: "Sampling, Quantization, Encoding & PCM",
    category: "Digital Conversion",
    duration: "25 mins",
    interactiveVisual: false,
    keyConcepts: [
      "Analog-to-digital conversion: Converting continuous analog information into binary data using an ADC",
      "Three steps: Sampling, quantization and encoding",
      "Nyquist: f_s ≥ 2·f_max, otherwise aliasing may occur",
      "PCM: L = 2^n levels, bit rate R_b = n·f_s (8000 × 8 = 64 kbps)"
    ],
    slides: [
      {
        id: "slide-1",
        number: 1,
        title: "1. Analog-to-Digital Conversion",
        subtitle: "Definition & Main Steps",
        accent: "bg-[#bae6fd]",
        definition: "Analog-to-digital conversion is the process of converting continuous analog information into digital data represented by binary bits.",
        diagram: "adcflow",
        points: [
          "It is commonly performed using an Analog-to-Digital Converter (ADC)."
        ],
        typesLabel: "The Three Fundamental Steps",
        types: [
          { name: "Sampling", desc: "Measuring the signal at regular time intervals." },
          { name: "Quantization", desc: "Assigning each sample to a permitted level." },
          { name: "Encoding", desc: "Representing each level with binary bits." }
        ],
        example: "A microphone captures sound as an analog signal. An ADC converts that signal into digital samples so a computer can process or store it.",
        badge: "Definition"
      },
      {
        id: "slide-2",
        number: 2,
        title: "2. Sampling",
        subtitle: "Measuring the Signal at Regular Intervals",
        accent: "bg-[#fef08a]",
        definition: "Sampling is the process of measuring the amplitude of an analog signal at regular time intervals.",
        lab: "sampling",
        pointsLabel: "Working",
        points: [
          "The analog signal enters the sampling system.",
          "Its amplitude is measured at specific time intervals.",
          "These measurements form a sequence of samples."
        ],
        example: "A digital audio system samples an analog sound signal thousands of times per second.",
        badge: "Sampling"
      },
      {
        id: "slide-3",
        number: 3,
        title: "3. Quantization",
        subtitle: "Rounding Samples to Permitted Levels",
        accent: "bg-[#fed7aa]",
        definition: "Quantization is the process of assigning each sampled amplitude to one of a finite number of permitted amplitude levels.",
        lab: "quantization",
        pointsLabel: "Working",
        points: [
          "The sampler produces amplitude measurements.",
          "Each measurement is assigned to the nearest permitted quantization level.",
          "The result is a sequence of discrete amplitude values."
        ],
        notesLabel: "Important Point",
        notes: [
          "Quantization introduces a difference between the original sample and its assigned level. This difference is called quantization error."
        ],
        example: "A sampled voltage of 2.3 V might be assigned to a quantization level of 2.25 V.",
        badge: "Quantization"
      },
      {
        id: "slide-4",
        number: 4,
        title: "4. Encoding",
        subtitle: "Representing Levels with Binary Bits",
        accent: "bg-[#bbf7d0]",
        definition: "Encoding is the process of representing quantized values using binary bits.",
        lab: "encoding",
        pointsLabel: "Working",
        points: [
          "Each quantization level is assigned a binary code.",
          "The encoder converts each quantized sample into its corresponding binary code.",
          "The binary data can then be stored or transmitted digitally."
        ],
        badge: "Encoding"
      },
      {
        id: "slide-5",
        number: 5,
        title: "5. Pulse Code Modulation (PCM)",
        subtitle: "Sampling + Quantization + Encoding",
        accent: "bg-[#e9d5ff]",
        definition: "Pulse Code Modulation (PCM) is a technique that converts an analog signal into digital data through sampling, quantization and encoding.",
        diagram: "pcm",
        stepsLabel: "Working of PCM",
        steps: [
          { step: "1", title: "Sampling", desc: "Measures the analog signal at regular intervals." },
          { step: "2", title: "Quantization", desc: "Assigns each sample to a permitted amplitude level." },
          { step: "3", title: "Encoding", desc: "Converts each quantized level into a binary code." },
          { step: "4", title: "Transmission", desc: "The binary data is transmitted through a digital communication system." },
          { step: "5", title: "Reconstruction", desc: "At the receiving end, the data is decoded and processed to reconstruct an approximation of the original signal." }
        ],
        pros: [
          "Supports digital storage and processing.",
          "Can provide good noise immunity when signals are regenerated correctly.",
          "Works well with digital communication networks."
        ],
        cons: [
          "Requires bandwidth for transmitting the digital data.",
          "Quantization introduces error.",
          "ADC and DAC circuits are required when interfacing with analog signals."
        ],
        badge: "PCM"
      }
    ],
    formulas: [
      {
        name: "Nyquist Sampling Rate",
        latex: "f_s ≥ 2 · f_max",
        description: "Minimum sampling frequency for ideal reconstruction of a band-limited signal."
      },
      {
        name: "Quantization Levels",
        latex: "L = 2ⁿ",
        description: "Number of levels L for n bits per sample."
      },
      {
        name: "PCM Bit Rate",
        latex: "R_b = n · f_s",
        description: "8,000 samples/s × 8 bits = 64 kbps."
      }
    ],
    examTips: [
      "Explain sampling, quantization and encoding, and PCM with a block diagram."
    ]
  }
];

export const EXAM_CHECKLIST = [
  { topic: "1. Wireless Comm Tech", item: "Explain 1G through 5G cellular architecture and key specifications" },
  { topic: "1. Wireless Comm Tech", item: "Identify EM spectrum bands used in cellular, Wi-Fi, and satellite" },
  { topic: "2. Antennas", item: "Define radiation pattern, directivity, gain, HPBW, and effective aperture" },
  { topic: "2. Antennas", item: "Sketch radiation patterns of isotropic, dipole, and directional antennas" },
  { topic: "2. Antennas", item: "Compare dipole, monopole, Yagi-Uda, and microstrip patch antennas" },
  { topic: "3. Propagation Modes", item: "Differentiate Ground Wave, Sky Wave, and Line-of-Sight propagation" },
  { topic: "3. Propagation Modes", item: "Explain Reflection, Refraction, Knife-edge Diffraction, and Scattering" },
  { topic: "3. Propagation Modes", item: "Calculate radio horizon distance and first Fresnel zone clearance" },
  { topic: "4. Fading", item: "Contrast Large-scale fading (path loss & shadowing) with Small-scale multipath" },
  { topic: "4. Fading", item: "Differentiate Fast vs Slow fading" },
  { topic: "4. Fading", item: "Explain Rayleigh vs Rician distributions" },
  { topic: "5. Encoding Techniques", item: "Define signal encoding and list the four encoding techniques with definitions" },
  { topic: "6. Digital Data to Analog", item: "Define digital-to-analog modulation and explain BASK, BFSK, PSK and QPSK" },
  { topic: "6. Digital Data to Analog", item: "Compare BASK, BFSK, BPSK and QPSK" },
  { topic: "7. Analog Data to Analog", item: "Define analog modulation and explain AM, FM and PM" },
  { topic: "7. Analog Data to Analog", item: "Define modulation index and frequency deviation; compare AM, FM and PM" },
  { topic: "8. Analog Data to Digital", item: "Explain sampling, quantization, encoding and the Nyquist rate" },
  { topic: "8. Analog Data to Digital", item: "Explain PCM with a block diagram and calculate PCM bit rate" }
];
