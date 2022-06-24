import { defineSchema } from 'tinacms';

export default defineSchema({
  collections: [
    {
      label: 'Artikelen',
      name: 'artikelen',
      path: 'content/artikelen',
      fields: [
        {
          label: 'Concept',
          name: 'draft',
          type: 'boolean',
        },
        {
          label: 'Title',
          name: 'title',
          type: 'string',
        },
        {
          label: 'Ondertitel',
          name: 'subtitle',
          type: 'string',
        },
        {
          label: 'Datum',
          name: 'date',
          type: 'string',
          /*ui: {
            dateFormat: 'YYYY-MM-DD',
          },*/
        },
        {
          label: 'Auteurs',
          name: 'auteurs',
          type: 'string',
          list: true,
        },
        {
          label: 'Thema',
          name: 'themas',
          type: 'string',
          options: [
            {
              value: 'Politiek & Actualiteit',
              label: 'Politiek & Actualiteit',
            },
            {
              value: 'Cultuur & Maatschappij',
              label: 'Cultuur & Maatschappij',
            },
            {
              value: 'Recensie & Biografie',
              label: 'Recensie & Biografie',
            },
            {
              value: 'Religie & Metafysica',
              label: 'Religie & Metafysica',
            },
            {
              value: 'Klikaas',
              label: 'Klikaas',
            },
          ],
        },
        {
          label: 'Content',
          name: 'body',
          type: 'rich-text',
          isBody: true,
        },
      ],
    },
    {
      label: 'Dossiers',
      name: 'dossiers',
      path: 'content/dossiers',
      fields: [
      	{
          label: 'Titel',
          name: 'title',
          type: 'string',
      	},
       	{
          label: 'Titel (op paginas)',
          name: 'heading',
          type: 'string',
      	},
       	{
          label: 'Beschrijving',
          name: 'description',
          type: 'string',
      	},
      ],
    }
  ],
});
