import { defineSchema } from "@tinacms/cli";

export default defineSchema({
  collections: [
    {
      label: "Artikelen",
      name: "artikelen",
      path: "content/artikelen",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Ondertitel",
          name: "subtitle",
        },
        {
          type: "string",
          label: "Datum",
          name: "date",
        },
        {
          type: "boolean",
          label: "Concept",
          name: "draft",
        },
        {
          type: "string",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
});
