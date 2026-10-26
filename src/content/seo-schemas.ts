// JSON-LD supplied by the SEO team, grouped by the app route.
export const sitewideSchemas: unknown[] = [
  {
    "@context": "https://schema.org",
    "@type": [
      "Organization",
      "ProfessionalService"
    ],
    "@id": "https://inkpixelstudios.com/#organization",
    "name": "Ink Pixel Studios",
    "url": "https://inkpixelstudios.com/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://inkpixelstudios.com/_next/static/media/black-logo.0ri7wmvmm9mwr.svg"
    },
    "image": "https://inkpixelstudios.com/opengraph-image",
    "description": "Ink Pixel Studios is a digital studio in Karachi building websites, apps, custom software, brands, and AI automation for businesses worldwide.",
    "email": "info@inkpixelstudios.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office 308, 3rd Floor, Anum Empire, Shahra-e-Faisal, Jinnah Housing Society",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "74200",
      "addressCountry": "PK"
    },
    "areaServed": "Worldwide",
    "knowsAbout": [
      "Branding",
      "Web development",
      "Custom software development",
      "Mobile app development",
      "Digital marketing",
      "AI automation"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "info@inkpixelstudios.com",
        "availableLanguage": [
          "English"
        ],
        "areaServed": "Worldwide"
      }
    ],
    "sameAs": []
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://inkpixelstudios.com/#website",
    "url": "https://inkpixelstudios.com/",
    "name": "Ink Pixel Studios",
    "inLanguage": "en",
    "publisher": {
      "@id": "https://inkpixelstudios.com/#organization"
    }
  }
];

export const pageSchemas: Record<string, unknown[]> = {
  "/": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/#webpage",
      "url": "https://inkpixelstudios.com/",
      "name": "Ink Pixel Studios | Software & Digital Studio in Karachi",
      "description": "Ink Pixel Studios is a digital studio in Karachi building websites, apps, custom software, brands, and AI automation for businesses worldwide.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://inkpixelstudios.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Ink Pixel Studios provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ink Pixel Studios offers a wide array of technology and digital solutions such as mobile app development, web development, custom software development, AI development, cloud services, blockchain development, game development, digital marketing, staff augmentation, and technology consulting."
          }
        },
        {
          "@type": "Question",
          "name": "Are you able to build an app for iOS and Android?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Depending on the project needs, our mobile app development teams can create apps designed for iOS and Android, or build cross-platform apps, such as the ones built using Flutter and React Native."
          }
        },
        {
          "@type": "Question",
          "name": "Will Ink Pixel Studios be able to create a custom software solution for my business?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Rather than putting your business into a “one size fits all” solution, we create custom software solutions tailored to your workflows, your users, your requirements for operation, and your business goals."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer AI and automation solutions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. AI Development, AI Agent Development, Generative AI, Machine Learning, Natural Language Processing, Chatbots, and AI Automation Solutions to boost productivity, automate repetitive tasks, and optimize decision-making."
          }
        },
        {
          "@type": "Question",
          "name": "Will you support us in moving our business to the cloud?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our cloud services range from cloud migration, infrastructure migration, cloud application development, managed cloud services, serverless computing, DevOps enablement, cloud infrastructure and cloud cost optimization."
          }
        },
        {
          "@type": "Question",
          "name": "Does your website offer follow up support after it's published?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. App Support and Maintenance, Cloud Support, Software Maintenance, optimization, updates, troubleshooting and continuing technical help are all available to help maintain the security and performance of your digital product."
          }
        },
        {
          "@type": "Question",
          "name": "Are you able to come up with ideas for particular industries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We develop industry specific technology solutions for industries such as fintech, healthcare, real estate, e-commerce, retail, logistics, telecom, construction and on-demand."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Branding",
          "url": "https://inkpixelstudios.com/services/branding"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Development",
          "url": "https://inkpixelstudios.com/services/development"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Marketing",
          "url": "https://inkpixelstudios.com/services/marketing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Software",
          "url": "https://inkpixelstudios.com/services/software"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Applications",
          "url": "https://inkpixelstudios.com/services/applications"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "AI Automation",
          "url": "https://inkpixelstudios.com/services/ai-automation"
        }
      ]
    }
  ],
  "/about": [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://inkpixelstudios.com/about#webpage",
      "url": "https://inkpixelstudios.com/about",
      "name": "About Ink Pixel Studios",
      "description": "Ink Pixel Studios is a digital studio in Karachi building software, brands and experiences for the world.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://inkpixelstudios.com/about"
        }
      ]
    }
  ],
  "/services": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://inkpixelstudios.com/services#webpage",
      "url": "https://inkpixelstudios.com/services",
      "name": "Services | Ink Pixel Studios",
      "description": "Branding, development, marketing, software, applications and AI automation services from Ink Pixel Studios.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Ink Pixel Studios Services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Branding",
          "url": "https://inkpixelstudios.com/services/branding"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Development",
          "url": "https://inkpixelstudios.com/services/development"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Marketing",
          "url": "https://inkpixelstudios.com/services/marketing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Software",
          "url": "https://inkpixelstudios.com/services/software"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Applications",
          "url": "https://inkpixelstudios.com/services/applications"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "AI Automation",
          "url": "https://inkpixelstudios.com/services/ai-automation"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        }
      ]
    }
  ],
  "/services/branding": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://inkpixelstudios.com/services/branding#webpage",
      "url": "https://inkpixelstudios.com/services/branding",
      "name": "Branding | Ink Pixel Studios",
      "description": "Build a unique brand voice, stunning visual identity, and lasting market presence.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/branding#service",
      "url": "https://inkpixelstudios.com/services/branding",
      "name": "Branding",
      "serviceType": "Branding",
      "description": "Build a unique brand voice, stunning visual identity, and lasting market presence.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Branding services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Brand Identity / Logo Design",
          "url": "https://inkpixelstudios.com/services/branding/brand-identity-logo-design"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Brand Guidelines / Brand Book",
          "url": "https://inkpixelstudios.com/services/branding/brand-guidelines"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Stationery Design",
          "url": "https://inkpixelstudios.com/services/branding/stationery-design"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Social Media Branding",
          "url": "https://inkpixelstudios.com/services/branding/social-media-branding"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Website & Digital Branding",
          "url": "https://inkpixelstudios.com/services/branding/digital-branding"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Brand Launch & Implementation",
          "url": "https://inkpixelstudios.com/services/branding/brand-launch"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Branding",
          "item": "https://inkpixelstudios.com/services/branding"
        }
      ]
    }
  ],
  "/services/branding/brand-identity-logo-design": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/branding/brand-identity-logo-design#webpage",
      "url": "https://inkpixelstudios.com/services/branding/brand-identity-logo-design",
      "name": "Brand Identity / Logo Design | Ink Pixel Studios",
      "description": "Primary logo, secondary logo, icon/mark, logo variations and black & white versions.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/branding/brand-identity-logo-design#service",
      "url": "https://inkpixelstudios.com/services/branding/brand-identity-logo-design",
      "name": "Brand Identity / Logo Design",
      "serviceType": "Brand Identity / Logo Design",
      "description": "Primary logo, secondary logo, icon/mark, logo variations and black & white versions.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/branding#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Branding",
          "item": "https://inkpixelstudios.com/services/branding"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Brand Identity / Logo Design",
          "item": "https://inkpixelstudios.com/services/branding/brand-identity-logo-design"
        }
      ]
    }
  ],
  "/services/branding/brand-guidelines": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/branding/brand-guidelines#webpage",
      "url": "https://inkpixelstudios.com/services/branding/brand-guidelines",
      "name": "Brand Guidelines / Brand Book | Ink Pixel Studios",
      "description": "Logo usage, spacing, colors, typography, visual rules, do's and don'ts, and a brand consistency guide.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/branding/brand-guidelines#service",
      "url": "https://inkpixelstudios.com/services/branding/brand-guidelines",
      "name": "Brand Guidelines / Brand Book",
      "serviceType": "Brand Guidelines / Brand Book",
      "description": "Logo usage, spacing, colors, typography, visual rules, do's and don'ts, and a brand consistency guide.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/branding#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Branding",
          "item": "https://inkpixelstudios.com/services/branding"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Brand Guidelines / Brand Book",
          "item": "https://inkpixelstudios.com/services/branding/brand-guidelines"
        }
      ]
    }
  ],
  "/services/branding/stationery-design": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/branding/stationery-design#webpage",
      "url": "https://inkpixelstudios.com/services/branding/stationery-design",
      "name": "Stationery Design | Ink Pixel Studios",
      "description": "Business card, letterhead, envelope, email signature and invoice/quotation templates.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/branding/stationery-design#service",
      "url": "https://inkpixelstudios.com/services/branding/stationery-design",
      "name": "Stationery Design",
      "serviceType": "Stationery Design",
      "description": "Business card, letterhead, envelope, email signature and invoice/quotation templates.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/branding#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Branding",
          "item": "https://inkpixelstudios.com/services/branding"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Stationery Design",
          "item": "https://inkpixelstudios.com/services/branding/stationery-design"
        }
      ]
    }
  ],
  "/services/branding/social-media-branding": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/branding/social-media-branding#webpage",
      "url": "https://inkpixelstudios.com/services/branding/social-media-branding",
      "name": "Social Media Branding | Ink Pixel Studios",
      "description": "Profile and cover designs, social post templates, story templates, highlight covers and ad templates.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/branding/social-media-branding#service",
      "url": "https://inkpixelstudios.com/services/branding/social-media-branding",
      "name": "Social Media Branding",
      "serviceType": "Social Media Branding",
      "description": "Profile and cover designs, social post templates, story templates, highlight covers and ad templates.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/branding#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Branding",
          "item": "https://inkpixelstudios.com/services/branding"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Social Media Branding",
          "item": "https://inkpixelstudios.com/services/branding/social-media-branding"
        }
      ]
    }
  ],
  "/services/branding/digital-branding": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/branding/digital-branding#webpage",
      "url": "https://inkpixelstudios.com/services/branding/digital-branding",
      "name": "Website & Digital Branding | Ink Pixel Studios",
      "description": "Website visual direction, UI style, buttons and icons, web banners and landing-page branding.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/branding/digital-branding#service",
      "url": "https://inkpixelstudios.com/services/branding/digital-branding",
      "name": "Website & Digital Branding",
      "serviceType": "Website & Digital Branding",
      "description": "Website visual direction, UI style, buttons and icons, web banners and landing-page branding.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/branding#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Branding",
          "item": "https://inkpixelstudios.com/services/branding"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Website & Digital Branding",
          "item": "https://inkpixelstudios.com/services/branding/digital-branding"
        }
      ]
    }
  ],
  "/services/branding/brand-launch": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/branding/brand-launch#webpage",
      "url": "https://inkpixelstudios.com/services/branding/brand-launch",
      "name": "Brand Launch & Implementation | Ink Pixel Studios",
      "description": "Final asset organization, launch creatives, brand rollout across website, social and print, and a consistency check.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/branding/brand-launch#service",
      "url": "https://inkpixelstudios.com/services/branding/brand-launch",
      "name": "Brand Launch & Implementation",
      "serviceType": "Brand Launch & Implementation",
      "description": "Final asset organization, launch creatives, brand rollout across website, social and print, and a consistency check.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/branding#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Branding",
          "item": "https://inkpixelstudios.com/services/branding"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Brand Launch & Implementation",
          "item": "https://inkpixelstudios.com/services/branding/brand-launch"
        }
      ]
    }
  ],
  "/services/development": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://inkpixelstudios.com/services/development#webpage",
      "url": "https://inkpixelstudios.com/services/development",
      "name": "Development | Ink Pixel Studios",
      "description": "Websites and web platforms built with modern technologies: online stores, CMS, frontend, backend and APIs, plus ongoing support.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/development#service",
      "url": "https://inkpixelstudios.com/services/development",
      "name": "Development",
      "serviceType": "Development",
      "description": "Websites and web platforms built with modern technologies: online stores, CMS, frontend, backend and APIs, plus ongoing support.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Development services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "E-Commerce Development",
          "url": "https://inkpixelstudios.com/services/development/ecommerce-development"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "CMS Development",
          "url": "https://inkpixelstudios.com/services/development/cms-development"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Frontend Development",
          "url": "https://inkpixelstudios.com/services/development/frontend-development"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Backend & API Development",
          "url": "https://inkpixelstudios.com/services/development/backend-api-development"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Maintenance & Support",
          "url": "https://inkpixelstudios.com/services/development/website-maintenance"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Development",
          "item": "https://inkpixelstudios.com/services/development"
        }
      ]
    }
  ],
  "/services/development/ecommerce-development": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/development/ecommerce-development#webpage",
      "url": "https://inkpixelstudios.com/services/development/ecommerce-development",
      "name": "E-Commerce Development | Ink Pixel Studios",
      "description": "Online stores that are easy to navigate, showcase products and offer a smooth shopping experience.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/development/ecommerce-development#service",
      "url": "https://inkpixelstudios.com/services/development/ecommerce-development",
      "name": "E-Commerce Development",
      "serviceType": "E-Commerce Development",
      "description": "Online stores that are easy to navigate, showcase products and offer a smooth shopping experience.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/development#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Development",
          "item": "https://inkpixelstudios.com/services/development"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "E-Commerce Development",
          "item": "https://inkpixelstudios.com/services/development/ecommerce-development"
        }
      ]
    }
  ],
  "/services/development/cms-development": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/development/cms-development#webpage",
      "url": "https://inkpixelstudios.com/services/development/cms-development",
      "name": "CMS Development | Ink Pixel Studios",
      "description": "Content management systems that let you update and organize website content without technical expertise.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/development/cms-development#service",
      "url": "https://inkpixelstudios.com/services/development/cms-development",
      "name": "CMS Development",
      "serviceType": "CMS Development",
      "description": "Content management systems that let you update and organize website content without technical expertise.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/development#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Development",
          "item": "https://inkpixelstudios.com/services/development"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "CMS Development",
          "item": "https://inkpixelstudios.com/services/development/cms-development"
        }
      ]
    }
  ],
  "/services/development/frontend-development": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/development/frontend-development#webpage",
      "url": "https://inkpixelstudios.com/services/development/frontend-development",
      "name": "Frontend Development | Ink Pixel Studios",
      "description": "Responsive, engaging frontend interfaces built with modern web technologies that work across devices.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/development/frontend-development#service",
      "url": "https://inkpixelstudios.com/services/development/frontend-development",
      "name": "Frontend Development",
      "serviceType": "Frontend Development",
      "description": "Responsive, engaging frontend interfaces built with modern web technologies that work across devices.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/development#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Development",
          "item": "https://inkpixelstudios.com/services/development"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Frontend Development",
          "item": "https://inkpixelstudios.com/services/development/frontend-development"
        }
      ]
    }
  ],
  "/services/development/backend-api-development": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/development/backend-api-development#webpage",
      "url": "https://inkpixelstudios.com/services/development/backend-api-development",
      "name": "Backend & API Development | Ink Pixel Studios",
      "description": "Backend development and API integration covering databases, business logic, user authentication and app communication.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/development/backend-api-development#service",
      "url": "https://inkpixelstudios.com/services/development/backend-api-development",
      "name": "Backend & API Development",
      "serviceType": "Backend & API Development",
      "description": "Backend development and API integration covering databases, business logic, user authentication and app communication.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/development#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Development",
          "item": "https://inkpixelstudios.com/services/development"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Backend & API Development",
          "item": "https://inkpixelstudios.com/services/development/backend-api-development"
        }
      ]
    }
  ],
  "/services/development/website-maintenance": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/development/website-maintenance#webpage",
      "url": "https://inkpixelstudios.com/services/development/website-maintenance",
      "name": "Maintenance & Support | Ink Pixel Studios",
      "description": "Website maintenance and support that keeps your site secure, reliable and running smoothly.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/development/website-maintenance#service",
      "url": "https://inkpixelstudios.com/services/development/website-maintenance",
      "name": "Maintenance & Support",
      "serviceType": "Maintenance & Support",
      "description": "Website maintenance and support that keeps your site secure, reliable and running smoothly.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/development#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Development",
          "item": "https://inkpixelstudios.com/services/development"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Maintenance & Support",
          "item": "https://inkpixelstudios.com/services/development/website-maintenance"
        }
      ]
    }
  ],
  "/services/marketing": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://inkpixelstudios.com/services/marketing#webpage",
      "url": "https://inkpixelstudios.com/services/marketing",
      "name": "Marketing | Ink Pixel Studios",
      "description": "Digital marketing services that grow visibility, leads and revenue.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/marketing#service",
      "url": "https://inkpixelstudios.com/services/marketing",
      "name": "Marketing",
      "serviceType": "Marketing",
      "description": "Digital marketing services that grow visibility, leads and revenue.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Marketing services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Search Engine Optimization (SEO)",
          "url": "https://inkpixelstudios.com/services/marketing/seo"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Paid Advertising",
          "url": "https://inkpixelstudios.com/services/marketing/paid-advertising"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Content Marketing",
          "url": "https://inkpixelstudios.com/services/marketing/content-marketing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Email & WhatsApp Marketing",
          "url": "https://inkpixelstudios.com/services/marketing/email-whatsapp-marketing"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Analytics & Growth Strategy",
          "url": "https://inkpixelstudios.com/services/marketing/analytics-growth-strategy"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Marketing",
          "item": "https://inkpixelstudios.com/services/marketing"
        }
      ]
    }
  ],
  "/services/marketing/seo": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/marketing/seo#webpage",
      "url": "https://inkpixelstudios.com/services/marketing/seo",
      "name": "Search Engine Optimization (SEO) | Ink Pixel Studios",
      "description": "Keyword research, on-page optimization, technical optimization and content optimization to boost search visibility.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/marketing/seo#service",
      "url": "https://inkpixelstudios.com/services/marketing/seo",
      "name": "Search Engine Optimization (SEO)",
      "serviceType": "Search Engine Optimization (SEO)",
      "description": "Keyword research, on-page optimization, technical optimization and content optimization to boost search visibility.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/marketing#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Marketing",
          "item": "https://inkpixelstudios.com/services/marketing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Search Engine Optimization (SEO)",
          "item": "https://inkpixelstudios.com/services/marketing/seo"
        }
      ]
    }
  ],
  "/services/marketing/paid-advertising": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/marketing/paid-advertising#webpage",
      "url": "https://inkpixelstudios.com/services/marketing/paid-advertising",
      "name": "Paid Advertising | Ink Pixel Studios",
      "description": "Google Ads and social media advertising based on business goals, reach, frequency and targets.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/marketing/paid-advertising#service",
      "url": "https://inkpixelstudios.com/services/marketing/paid-advertising",
      "name": "Paid Advertising",
      "serviceType": "Paid Advertising",
      "description": "Google Ads and social media advertising based on business goals, reach, frequency and targets.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/marketing#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Marketing",
          "item": "https://inkpixelstudios.com/services/marketing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Paid Advertising",
          "item": "https://inkpixelstudios.com/services/marketing/paid-advertising"
        }
      ]
    }
  ],
  "/services/marketing/content-marketing": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/marketing/content-marketing#webpage",
      "url": "https://inkpixelstudios.com/services/marketing/content-marketing",
      "name": "Content Marketing | Ink Pixel Studios",
      "description": "Blogs, website content, social media content and useful brand resources that engage customers.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/marketing/content-marketing#service",
      "url": "https://inkpixelstudios.com/services/marketing/content-marketing",
      "name": "Content Marketing",
      "serviceType": "Content Marketing",
      "description": "Blogs, website content, social media content and useful brand resources that engage customers.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/marketing#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Marketing",
          "item": "https://inkpixelstudios.com/services/marketing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Content Marketing",
          "item": "https://inkpixelstudios.com/services/marketing/content-marketing"
        }
      ]
    }
  ],
  "/services/marketing/email-whatsapp-marketing": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/marketing/email-whatsapp-marketing#webpage",
      "url": "https://inkpixelstudios.com/services/marketing/email-whatsapp-marketing",
      "name": "Email & WhatsApp Marketing | Ink Pixel Studios",
      "description": "Tailored email and WhatsApp campaigns that share updates and offers and nurture leads.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/marketing/email-whatsapp-marketing#service",
      "url": "https://inkpixelstudios.com/services/marketing/email-whatsapp-marketing",
      "name": "Email & WhatsApp Marketing",
      "serviceType": "Email & WhatsApp Marketing",
      "description": "Tailored email and WhatsApp campaigns that share updates and offers and nurture leads.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/marketing#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Marketing",
          "item": "https://inkpixelstudios.com/services/marketing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Email & WhatsApp Marketing",
          "item": "https://inkpixelstudios.com/services/marketing/email-whatsapp-marketing"
        }
      ]
    }
  ],
  "/services/marketing/analytics-growth-strategy": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/marketing/analytics-growth-strategy#webpage",
      "url": "https://inkpixelstudios.com/services/marketing/analytics-growth-strategy",
      "name": "Analytics & Growth Strategy | Ink Pixel Studios",
      "description": "Data-driven analytics and growth strategy that help businesses make smart decisions and grow sustainably.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/marketing/analytics-growth-strategy#service",
      "url": "https://inkpixelstudios.com/services/marketing/analytics-growth-strategy",
      "name": "Analytics & Growth Strategy",
      "serviceType": "Analytics & Growth Strategy",
      "description": "Data-driven analytics and growth strategy that help businesses make smart decisions and grow sustainably.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/marketing#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Marketing",
          "item": "https://inkpixelstudios.com/services/marketing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Analytics & Growth Strategy",
          "item": "https://inkpixelstudios.com/services/marketing/analytics-growth-strategy"
        }
      ]
    }
  ],
  "/services/software": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://inkpixelstudios.com/services/software#webpage",
      "url": "https://inkpixelstudios.com/services/software",
      "name": "Software | Ink Pixel Studios",
      "description": "Custom business software built around your workflows and scale.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/software#service",
      "url": "https://inkpixelstudios.com/services/software",
      "name": "Software",
      "serviceType": "Software",
      "description": "Custom business software built around your workflows and scale.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Software services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "ERP & CRM Systems",
          "url": "https://inkpixelstudios.com/services/software/erp-crm-systems"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "POS & Inventory Software",
          "url": "https://inkpixelstudios.com/services/software/pos-inventory-software"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "SaaS Product Development",
          "url": "https://inkpixelstudios.com/services/software/saas-development"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Software Integration & Migration",
          "url": "https://inkpixelstudios.com/services/software/software-integration-migration"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "QA, Testing & Support",
          "url": "https://inkpixelstudios.com/services/software/qa-testing"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Software",
          "item": "https://inkpixelstudios.com/services/software"
        }
      ]
    }
  ],
  "/services/software/erp-crm-systems": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/software/erp-crm-systems#webpage",
      "url": "https://inkpixelstudios.com/services/software/erp-crm-systems",
      "name": "ERP & CRM Systems | Ink Pixel Studios",
      "description": "Bespoke ERP and CRM solutions that streamline processes across departments and manage customer relationships.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/software/erp-crm-systems#service",
      "url": "https://inkpixelstudios.com/services/software/erp-crm-systems",
      "name": "ERP & CRM Systems",
      "serviceType": "ERP & CRM Systems",
      "description": "Bespoke ERP and CRM solutions that streamline processes across departments and manage customer relationships.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/software#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Software",
          "item": "https://inkpixelstudios.com/services/software"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "ERP & CRM Systems",
          "item": "https://inkpixelstudios.com/services/software/erp-crm-systems"
        }
      ]
    }
  ],
  "/services/software/pos-inventory-software": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/software/pos-inventory-software#webpage",
      "url": "https://inkpixelstudios.com/services/software/pos-inventory-software",
      "name": "POS & Inventory Software | Ink Pixel Studios",
      "description": "POS and inventory management software for transactions, inventory tracking and sales management.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/software/pos-inventory-software#service",
      "url": "https://inkpixelstudios.com/services/software/pos-inventory-software",
      "name": "POS & Inventory Software",
      "serviceType": "POS & Inventory Software",
      "description": "POS and inventory management software for transactions, inventory tracking and sales management.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/software#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Software",
          "item": "https://inkpixelstudios.com/services/software"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "POS & Inventory Software",
          "item": "https://inkpixelstudios.com/services/software/pos-inventory-software"
        }
      ]
    }
  ],
  "/services/software/saas-development": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/software/saas-development#webpage",
      "url": "https://inkpixelstudios.com/services/software/saas-development",
      "name": "SaaS Product Development | Ink Pixel Studios",
      "description": "Scalable Software as a Service applications delivered on cloud-based, easily accessible platforms.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/software/saas-development#service",
      "url": "https://inkpixelstudios.com/services/software/saas-development",
      "name": "SaaS Product Development",
      "serviceType": "SaaS Product Development",
      "description": "Scalable Software as a Service applications delivered on cloud-based, easily accessible platforms.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/software#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Software",
          "item": "https://inkpixelstudios.com/services/software"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "SaaS Product Development",
          "item": "https://inkpixelstudios.com/services/software/saas-development"
        }
      ]
    }
  ],
  "/services/software/software-integration-migration": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/software/software-integration-migration#webpage",
      "url": "https://inkpixelstudios.com/services/software/software-integration-migration",
      "name": "Software Integration & Migration | Ink Pixel Studios",
      "description": "Seamless data transfer, system integration and migration to new platforms with minimal disruption.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/software/software-integration-migration#service",
      "url": "https://inkpixelstudios.com/services/software/software-integration-migration",
      "name": "Software Integration & Migration",
      "serviceType": "Software Integration & Migration",
      "description": "Seamless data transfer, system integration and migration to new platforms with minimal disruption.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/software#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Software",
          "item": "https://inkpixelstudios.com/services/software"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Software Integration & Migration",
          "item": "https://inkpixelstudios.com/services/software/software-integration-migration"
        }
      ]
    }
  ],
  "/services/software/qa-testing": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/software/qa-testing#webpage",
      "url": "https://inkpixelstudios.com/services/software/qa-testing",
      "name": "QA, Testing & Support | Ink Pixel Studios",
      "description": "Functional and performance testing, compatibility checks, bug tracking and continuous support.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/software/qa-testing#service",
      "url": "https://inkpixelstudios.com/services/software/qa-testing",
      "name": "QA, Testing & Support",
      "serviceType": "QA, Testing & Support",
      "description": "Functional and performance testing, compatibility checks, bug tracking and continuous support.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/software#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Software",
          "item": "https://inkpixelstudios.com/services/software"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "QA, Testing & Support",
          "item": "https://inkpixelstudios.com/services/software/qa-testing"
        }
      ]
    }
  ],
  "/services/applications": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://inkpixelstudios.com/services/applications#webpage",
      "url": "https://inkpixelstudios.com/services/applications",
      "name": "Applications | Ink Pixel Studios",
      "description": "Mobile apps for iOS and Android, from design to scaling.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/applications#service",
      "url": "https://inkpixelstudios.com/services/applications",
      "name": "Applications",
      "serviceType": "Applications",
      "description": "Mobile apps for iOS and Android, from design to scaling.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Applications services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "iOS App Development",
          "url": "https://inkpixelstudios.com/services/applications/ios-app-development"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cross-Platform Apps",
          "url": "https://inkpixelstudios.com/services/applications/cross-platform-apps"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Android App Development",
          "url": "https://inkpixelstudios.com/services/applications/android-app-development"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "UI/UX Design for Apps",
          "url": "https://inkpixelstudios.com/services/applications/app-ui-ux-design"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "App Maintenance & Scaling",
          "url": "https://inkpixelstudios.com/services/applications/app-maintenance"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Applications",
          "item": "https://inkpixelstudios.com/services/applications"
        }
      ]
    }
  ],
  "/services/applications/ios-app-development": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/applications/ios-app-development#webpage",
      "url": "https://inkpixelstudios.com/services/applications/ios-app-development",
      "name": "iOS App Development | Ink Pixel Studios",
      "description": "Robust iOS apps for iPhone and iPad with intuitive design and integration with the Apple ecosystem.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/applications/ios-app-development#service",
      "url": "https://inkpixelstudios.com/services/applications/ios-app-development",
      "name": "iOS App Development",
      "serviceType": "iOS App Development",
      "description": "Robust iOS apps for iPhone and iPad with intuitive design and integration with the Apple ecosystem.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/applications#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Applications",
          "item": "https://inkpixelstudios.com/services/applications"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "iOS App Development",
          "item": "https://inkpixelstudios.com/services/applications/ios-app-development"
        }
      ]
    }
  ],
  "/services/applications/cross-platform-apps": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/applications/cross-platform-apps#webpage",
      "url": "https://inkpixelstudios.com/services/applications/cross-platform-apps",
      "name": "Cross-Platform Apps | Ink Pixel Studios",
      "description": "Apps that work on both iOS and Android from a shared codebase.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/applications/cross-platform-apps#service",
      "url": "https://inkpixelstudios.com/services/applications/cross-platform-apps",
      "name": "Cross-Platform Apps",
      "serviceType": "Cross-Platform Apps",
      "description": "Apps that work on both iOS and Android from a shared codebase.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/applications#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Applications",
          "item": "https://inkpixelstudios.com/services/applications"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Cross-Platform Apps",
          "item": "https://inkpixelstudios.com/services/applications/cross-platform-apps"
        }
      ]
    }
  ],
  "/services/applications/android-app-development": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/applications/android-app-development#webpage",
      "url": "https://inkpixelstudios.com/services/applications/android-app-development",
      "name": "Android App Development | Ink Pixel Studios",
      "description": "Custom Android applications optimized for performance, usability and device compatibility.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/applications/android-app-development#service",
      "url": "https://inkpixelstudios.com/services/applications/android-app-development",
      "name": "Android App Development",
      "serviceType": "Android App Development",
      "description": "Custom Android applications optimized for performance, usability and device compatibility.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/applications#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Applications",
          "item": "https://inkpixelstudios.com/services/applications"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Android App Development",
          "item": "https://inkpixelstudios.com/services/applications/android-app-development"
        }
      ]
    }
  ],
  "/services/applications/app-ui-ux-design": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/applications/app-ui-ux-design#webpage",
      "url": "https://inkpixelstudios.com/services/applications/app-ui-ux-design",
      "name": "UI/UX Design for Apps | Ink Pixel Studios",
      "description": "Mobile app UI/UX design focused on intuitive navigation, clear layouts and user journeys.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/applications/app-ui-ux-design#service",
      "url": "https://inkpixelstudios.com/services/applications/app-ui-ux-design",
      "name": "UI/UX Design for Apps",
      "serviceType": "UI/UX Design for Apps",
      "description": "Mobile app UI/UX design focused on intuitive navigation, clear layouts and user journeys.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/applications#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Applications",
          "item": "https://inkpixelstudios.com/services/applications"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "UI/UX Design for Apps",
          "item": "https://inkpixelstudios.com/services/applications/app-ui-ux-design"
        }
      ]
    }
  ],
  "/services/applications/app-maintenance": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/applications/app-maintenance#webpage",
      "url": "https://inkpixelstudios.com/services/applications/app-maintenance",
      "name": "App Maintenance & Scaling | Ink Pixel Studios",
      "description": "App maintenance and scaling that handles user growth, data growth and changing business requirements.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/applications/app-maintenance#service",
      "url": "https://inkpixelstudios.com/services/applications/app-maintenance",
      "name": "App Maintenance & Scaling",
      "serviceType": "App Maintenance & Scaling",
      "description": "App maintenance and scaling that handles user growth, data growth and changing business requirements.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/applications#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Applications",
          "item": "https://inkpixelstudios.com/services/applications"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "App Maintenance & Scaling",
          "item": "https://inkpixelstudios.com/services/applications/app-maintenance"
        }
      ]
    }
  ],
  "/services/ai-automation": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://inkpixelstudios.com/services/ai-automation#webpage",
      "url": "https://inkpixelstudios.com/services/ai-automation",
      "name": "AI Automation | Ink Pixel Studios",
      "description": "AI chatbots, agents and automation that reduce manual work.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/ai-automation#service",
      "url": "https://inkpixelstudios.com/services/ai-automation",
      "name": "AI Automation",
      "serviceType": "AI Automation",
      "description": "AI chatbots, agents and automation that reduce manual work.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "AI Automation services",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "AI Chatbots & Virtual Assistants",
          "url": "https://inkpixelstudios.com/services/ai-automation/ai-chatbots"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Marketing Automation",
          "url": "https://inkpixelstudios.com/services/ai-automation/ai-marketing-automation"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Document & Data Processing",
          "url": "https://inkpixelstudios.com/services/ai-automation/document-data-processing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Custom AI Agents & Integrations",
          "url": "https://inkpixelstudios.com/services/ai-automation/ai-agents"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "AI Consulting & Training",
          "url": "https://inkpixelstudios.com/services/ai-automation/ai-consulting"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Automation",
          "item": "https://inkpixelstudios.com/services/ai-automation"
        }
      ]
    }
  ],
  "/services/ai-automation/ai-chatbots": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/ai-automation/ai-chatbots#webpage",
      "url": "https://inkpixelstudios.com/services/ai-automation/ai-chatbots",
      "name": "AI Chatbots & Virtual Assistants | Ink Pixel Studios",
      "description": "AI chatbots and virtual assistants that automate customer support and answer common questions.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/ai-automation/ai-chatbots#service",
      "url": "https://inkpixelstudios.com/services/ai-automation/ai-chatbots",
      "name": "AI Chatbots & Virtual Assistants",
      "serviceType": "AI Chatbots & Virtual Assistants",
      "description": "AI chatbots and virtual assistants that automate customer support and answer common questions.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/ai-automation#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Automation",
          "item": "https://inkpixelstudios.com/services/ai-automation"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "AI Chatbots & Virtual Assistants",
          "item": "https://inkpixelstudios.com/services/ai-automation/ai-chatbots"
        }
      ]
    }
  ],
  "/services/ai-automation/ai-marketing-automation": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/ai-automation/ai-marketing-automation#webpage",
      "url": "https://inkpixelstudios.com/services/ai-automation/ai-marketing-automation",
      "name": "Marketing Automation | Ink Pixel Studios",
      "description": "AI-based content creation, campaign building and automation of repetitive marketing tasks.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/ai-automation/ai-marketing-automation#service",
      "url": "https://inkpixelstudios.com/services/ai-automation/ai-marketing-automation",
      "name": "Marketing Automation",
      "serviceType": "Marketing Automation",
      "description": "AI-based content creation, campaign building and automation of repetitive marketing tasks.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/ai-automation#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Automation",
          "item": "https://inkpixelstudios.com/services/ai-automation"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Marketing Automation",
          "item": "https://inkpixelstudios.com/services/ai-automation/ai-marketing-automation"
        }
      ]
    }
  ],
  "/services/ai-automation/document-data-processing": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/ai-automation/document-data-processing#webpage",
      "url": "https://inkpixelstudios.com/services/ai-automation/document-data-processing",
      "name": "Document & Data Processing | Ink Pixel Studios",
      "description": "AI-driven document handling, data extraction, classification and information processing.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/ai-automation/document-data-processing#service",
      "url": "https://inkpixelstudios.com/services/ai-automation/document-data-processing",
      "name": "Document & Data Processing",
      "serviceType": "Document & Data Processing",
      "description": "AI-driven document handling, data extraction, classification and information processing.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/ai-automation#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Automation",
          "item": "https://inkpixelstudios.com/services/ai-automation"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Document & Data Processing",
          "item": "https://inkpixelstudios.com/services/ai-automation/document-data-processing"
        }
      ]
    }
  ],
  "/services/ai-automation/ai-agents": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/ai-automation/ai-agents#webpage",
      "url": "https://inkpixelstudios.com/services/ai-automation/ai-agents",
      "name": "Custom AI Agents & Integrations | Ink Pixel Studios",
      "description": "Custom AI agents that complete specific tasks and connect with other business tools and software.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/ai-automation/ai-agents#service",
      "url": "https://inkpixelstudios.com/services/ai-automation/ai-agents",
      "name": "Custom AI Agents & Integrations",
      "serviceType": "Custom AI Agents & Integrations",
      "description": "Custom AI agents that complete specific tasks and connect with other business tools and software.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/ai-automation#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Automation",
          "item": "https://inkpixelstudios.com/services/ai-automation"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Custom AI Agents & Integrations",
          "item": "https://inkpixelstudios.com/services/ai-automation/ai-agents"
        }
      ]
    }
  ],
  "/services/ai-automation/ai-consulting": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/services/ai-automation/ai-consulting#webpage",
      "url": "https://inkpixelstudios.com/services/ai-automation/ai-consulting",
      "name": "AI Consulting & Training | Ink Pixel Studios",
      "description": "AI strategy consulting, automation planning, tool selection, employee training and integration guidance.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://inkpixelstudios.com/services/ai-automation/ai-consulting#service",
      "url": "https://inkpixelstudios.com/services/ai-automation/ai-consulting",
      "name": "AI Consulting & Training",
      "serviceType": "AI Consulting & Training",
      "description": "AI strategy consulting, automation planning, tool selection, employee training and integration guidance.",
      "provider": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "areaServed": "Worldwide",
      "isRelatedTo": {
        "@id": "https://inkpixelstudios.com/services/ai-automation#service"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://inkpixelstudios.com/services"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Automation",
          "item": "https://inkpixelstudios.com/services/ai-automation"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "AI Consulting & Training",
          "item": "https://inkpixelstudios.com/services/ai-automation/ai-consulting"
        }
      ]
    }
  ],
  "/case-studies": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://inkpixelstudios.com/case-studies#webpage",
      "url": "https://inkpixelstudios.com/case-studies",
      "name": "Our Work | Ink Pixel Studios",
      "description": "Selected projects by Ink Pixel Studios.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Case studies",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Cathy O’Bryan’s Books",
          "url": "https://inkpixelstudios.com/case-studies/cathy-obryans-books"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Terminal Gateway CRM",
          "url": "https://inkpixelstudios.com/case-studies/crm-terminal-gateway"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Gulbaan",
          "url": "https://inkpixelstudios.com/case-studies/gulbaan"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Our Work",
          "item": "https://inkpixelstudios.com/case-studies"
        }
      ]
    }
  ],
  "/case-studies/cathy-obryans-books": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/case-studies/cathy-obryans-books#webpage",
      "url": "https://inkpixelstudios.com/case-studies/cathy-obryans-books",
      "name": "Cathy O’Bryan’s Books | Ink Pixel Studios",
      "description": "A mobile app that brings Cathy O’Bryan’s books, stories, and artwork together in one reading and gallery experience.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": "https://inkpixelstudios.com/case-studies/cathy-obryans-books#project",
      "name": "Cathy O’Bryan’s Books",
      "description": "A mobile app that brings Cathy O’Bryan’s books, stories, and artwork together in one reading and gallery experience.",
      "url": "https://inkpixelstudios.com/case-studies/cathy-obryans-books",
      "creator": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Our Work",
          "item": "https://inkpixelstudios.com/case-studies"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Cathy O’Bryan’s Books",
          "item": "https://inkpixelstudios.com/case-studies/cathy-obryans-books"
        }
      ]
    }
  ],
  "/case-studies/crm-terminal-gateway": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/case-studies/crm-terminal-gateway#webpage",
      "url": "https://inkpixelstudios.com/case-studies/crm-terminal-gateway",
      "name": "Terminal Gateway CRM | Ink Pixel Studios",
      "description": "An all-in-one CRM that brings contacts, sales, projects, communication, and files into one dashboard.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": "https://inkpixelstudios.com/case-studies/crm-terminal-gateway#project",
      "name": "Terminal Gateway CRM",
      "description": "An all-in-one CRM that brings contacts, sales, projects, communication, and files into one dashboard.",
      "url": "https://inkpixelstudios.com/case-studies/crm-terminal-gateway",
      "creator": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Our Work",
          "item": "https://inkpixelstudios.com/case-studies"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Terminal Gateway CRM",
          "item": "https://inkpixelstudios.com/case-studies/crm-terminal-gateway"
        }
      ]
    }
  ],
  "/case-studies/gulbaan": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/case-studies/gulbaan#webpage",
      "url": "https://inkpixelstudios.com/case-studies/gulbaan",
      "name": "Gulbaan | Ink Pixel Studios",
      "description": "A flower retail and delivery service offering fresh, premium flowers across Lahore and Islamabad.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": "https://inkpixelstudios.com/case-studies/gulbaan#project",
      "name": "Gulbaan",
      "description": "A flower retail and delivery service offering fresh, premium flowers across Lahore and Islamabad.",
      "url": "https://inkpixelstudios.com/case-studies/gulbaan",
      "creator": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Our Work",
          "item": "https://inkpixelstudios.com/case-studies"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Gulbaan",
          "item": "https://inkpixelstudios.com/case-studies/gulbaan"
        }
      ]
    }
  ],
  "/contact": [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": "https://inkpixelstudios.com/contact#webpage",
      "url": "https://inkpixelstudios.com/contact",
      "name": "Contact Ink Pixel Studios",
      "description": "Start a project or book a free call with Ink Pixel Studios in Karachi.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://inkpixelstudios.com/contact"
        }
      ]
    }
  ],
  "/privacy-policy": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/privacy-policy#webpage",
      "url": "https://inkpixelstudios.com/privacy-policy",
      "name": "Privacy Policy | Ink Pixel Studios",
      "description": "Privacy Policy of Ink Pixel Studios.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacy Policy",
          "item": "https://inkpixelstudios.com/privacy-policy"
        }
      ]
    }
  ],
  "/terms-and-conditions": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/terms-and-conditions#webpage",
      "url": "https://inkpixelstudios.com/terms-and-conditions",
      "name": "Terms and Conditions | Ink Pixel Studios",
      "description": "Terms and Conditions of Ink Pixel Studios.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Terms and Conditions",
          "item": "https://inkpixelstudios.com/terms-and-conditions"
        }
      ]
    }
  ],
  "/refund-policy": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://inkpixelstudios.com/refund-policy#webpage",
      "url": "https://inkpixelstudios.com/refund-policy",
      "name": "Refund Policy | Ink Pixel Studios",
      "description": "Refund Policy of Ink Pixel Studios.",
      "inLanguage": "en",
      "isPartOf": {
        "@id": "https://inkpixelstudios.com/#website"
      },
      "about": {
        "@id": "https://inkpixelstudios.com/#organization"
      },
      "publisher": {
        "@id": "https://inkpixelstudios.com/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://inkpixelstudios.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Refund Policy",
          "item": "https://inkpixelstudios.com/refund-policy"
        }
      ]
    }
  ]
};
