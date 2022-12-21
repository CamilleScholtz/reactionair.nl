import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "575f9e63-32ef-43ec-854b-8b83e1d6369c",
  token: "1363ce5db3a28b35ac51098d2d6048ac818a2d5a",

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },

  media: {
    tina: {
      mediaRoot: "assets/media",
      publicFolder: "",
    },
  },

  schema: {
    collections: [
      {
        name: "artikelen",
        label: "Artikelen",
        path: "content/artikelen",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Titel",
            type: "string",
            isTitle: true,
            required: true,
          },

          {
            name: "subtitle",
            label: "Ondertitel",
            type: "string",
            required: true,
          },

          {
            name: "date",
            label: "Publicatie datum",
            type: "datetime",
            required: true,
            ui: {
              dateFormat: 'YYYY-MM-DD'
            },
          },

          {
            name: "auteurs",
            label: "Auteurs",
            type: "object",
            required: true,
            list: true,
            fields: [
              {
                name: "auteur",
                label: "Auteur",
                type: "reference",
                collections: ["auteurs"],
              },
            ],
          },

          {
            name: "themas",
            label: "Thema",
            type: "reference",
            required: true,
            collections: ["themas"],
          },

          {
            name: "dossiers",
            label: "Dossiers",
            type: "object",
            list: true,
            fields: [
              {
                name: "dossier",
                label: "Dossier",
                type: "reference",
                collections: ["dossiers"],
              },
            ],
          },

          {
            name: "aangehaald",
            label: "Aangehaald",
            type: "string",
            list: true,
          },

          {
          	name: "image",
          	label: "Afbeelding",
          	type: "image",
          	required: true,
          },
 
          {
            name: "body",
            label: "Content",
            type: "rich-text",
            isBody: true,
            templates: [
              {
                name: "quote",
                label: "Citaat",
                match: {
                  start: "{{< quote",
                  end: ">}}",
                },
                fields: [
                  {
                    name: "text",
                    label: "Tekst",
                    type: "string",
                    required: true,
                    isTitle: true,
                    ui: {
                      component: "textarea",
                    },
                  },

                  {
                    name: "author",
                    label: "Auteur",
                    type: "string",
                    required: true,
                  },
                ],
              },

              /*{
                name: "boekencast",
                label: "Boekencast",
                match: {
                  start: "{{< boekencast",
                  end: ">}}",
                },
              },

              {
                name: "basmala",
                label: "Basmala",
                match: {
                  start: "{{< basmala",
                  end: ">}}",
                },
              },*/

              {
                name: "tweet",
                label: "Tweet",
                match: {
                  start: "{{< tweet",
                  end: ">}}",
                },
                fields: [
                  {
                    name: "author",
                    label: "Auteur",
                    type: "string",
                    required: true,
                    isTitle: true,
                  },

                  {
                    name: "tweet",
                    label: "tweet",
                    type: "string",
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        name: "auteurs",
        label: "Auteurs",
        path: "content/auteurs",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Naam",
            type: "string",
            isTitle: true,
            required: true,
          },
        ],
      },

      {
        name: "themas",
        label: "Themas",
        path: "content/themas",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Naam",
            type: "string",
            isTitle: true,
            required: true,
          },
        ],
      },

      {
        name: "dossiers",
        label: "Dossiers",
        path: "content/dossiers",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Naam",
            type: "string",
            isTitle: true,
            required: true,
          },
        ],
      },
    ],
  },
});
