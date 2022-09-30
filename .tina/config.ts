import { defineStaticConfig } from "tinacms";

const branch = "main";

export default defineStaticConfig({
  branch,
  clientId: "575f9e63-32ef-43ec-854b-8b83e1d6369c",
  token: "dff1d8e18e10e9bf513311e4a30f353f34bc33b9",
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
        name: "articles",
        label: "Articles",
        path: "content/articles",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
