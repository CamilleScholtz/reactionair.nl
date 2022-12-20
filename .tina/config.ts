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
      mediaRoot: "uploads",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "artikelen",
        label: "Artikelen",
        path: "content/artikelen",
        format: "mdx",
        fields: [
          {
            name: "title",
            label: "Titel",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "body",
            label: "Content",
            type: "rich-text",
            isBody: true,
            templates: [
              {
                 name: "Shortcode",
                 label: "Shortcode",
                 inline: true,
                 match: {
                   start: "{{<",
                   end: ">}}",
                 },
                 fields: [
                   {
                     name: "text",
                     label: "Text",
                     type: "string",
                     required: true,
                     isTitle: true,
                     ui: {
                       component: "textarea",
                     },
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
    ],
  },
});
