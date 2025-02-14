const metadata = {
    name: "{AlmaConnect}",
    pageTitle: "{AlmaConnect} Alumni network | AlmaConnect",
    networkBaseUrl: "https://www.almaconnect.com/",
    logo: "{logoImport}",
    favicon: "{faviconImport}",
    mainMenuItems: [
      {
        name: "News",
        url: "/contributions/sneak_peek",
      },
      {
        name: "Careers",
        url: "/job_posting",
      },
      {
        name: "HomeComings",
        url: "/memories"
      },
      {
        name: "Engage",
        url: "/directory/filter",
      },
    ],
    bannerImages: ["{banner1Import}", "{banner2Import}"],
    bannerText: {
      primaryText: "With over <b>{4,500}+</b> alumni across the globe, {AlmaConnectians} are flagbearers of excellence in the field of strategic marketing and communication",
      secondaryText: "This Alumni portal looks to help them reconnect with their Alma Mater"
    },
    networkAndLogin: {
      enabled: true,
      collage: "{collage}",
    },
    alumniMap: {
      enabled: false,
      image: "{alumniChaptersImageImport}",
    },
    alumniNews: {
      enabled: false,
    },
    twitterFeed: {
      enabled: false,
      screenName: "almaconnect",
      displayName: "AlmaConnect",
      logo: "{twitterLogoImport}",
    },
    upcomingEvents: {
      enabled: false,
    },
    recentMemories: {
      enabled: false,
    },
    distinguishedAlumni: {
      enabled: false,
      nominationEmail: "coordinator@almaconnect.com",
      data: [
        {
          name: "Alum Name",
          picture: "{alumImageImport}",
          description: "Batch, Designation, Location String",
        },
      ],
    },
  
    theme: {
      colors: {
        charcoalGrey: "#3a3f42",
        coolGrey: "#b6b9bb",
        turquoise: "#00c4b5",
        lightTurquoise: "#ebfbf9",
        battleshipGrey: "#707274",
        rosyPink: "#ef5d60",
        paleGrey: "#eef0f2",
        lightGrey: "#e7eceb",
        border: "#f1f0f0",
      },
    }
  }
  
  export {metadata as default};