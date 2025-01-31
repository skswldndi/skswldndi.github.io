// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/al-folio/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "I work on AI-related software and enjoy creating illustrations with the coolest design tools in my free time.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/al-folio/cv/";
          },
        },{id: "projects-11th-street-bridge",
          title: '11th Street Bridge',
          description: "Reimagining OMA’s Park Design",
          section: "Projects",handler: () => {
              window.location.href = "/al-folio/projects/11th/";
            },},{id: "projects-ai-provides-real-time-listening-feedback",
          title: 'AI Provides Real-time Listening Feedback',
          description: "in natural language, as users ask a question",
          section: "Projects",handler: () => {
              window.location.href = "/al-folio/projects/backchannels/";
            },},{id: "projects-interactive-typing-display",
          title: 'Interactive Typing Display',
          description: "Showing which key you are pressing",
          section: "Projects",handler: () => {
              window.location.href = "/al-folio/projects/hhkbtyping/";
            },},{id: "projects-hotel-des-horlogers",
          title: 'Hotel des Horlogers',
          description: "Reimagining BIG&#39;s Design",
          section: "Projects",handler: () => {
              window.location.href = "/al-folio/projects/hotel/";
            },},{id: "projects-ai-answers-before-the-question-ends",
          title: 'AI Answers Before the Question Ends',
          description: "Sometimes before the user completes their thought",
          section: "Projects",handler: () => {
              window.location.href = "/al-folio/projects/preemptive/";
            },},{id: "projects-interrupting-ai-by-natural-language",
          title: 'Interrupting AI by Natural Language',
          description: "Combining Stop Generating function with your prompt",
          section: "Projects",handler: () => {
              window.location.href = "/al-folio/projects/stopgenerating/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%79%6F%75@%65%78%61%6D%70%6C%65.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-inspire',
        title: 'Inspire HEP',
        section: 'Socials',
        handler: () => {
          window.open("https://inspirehep.net/authors/1010907", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/al-folio/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=qc6CJjYAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
