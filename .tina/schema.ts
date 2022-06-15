import { defineSchema } from '@tinacms/cli';

export default defineSchema({
  collections: [
    {
      label: 'Artikelen',
      name: 'artikelen',
      path: 'content/artikelen',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Ondertitel',
          name: 'subtitle',
        },
        {
          type: 'datetime',
          label: 'Datum',
          name: 'date',
          ui: {
            dateFormat: 'YYYY-MM-DD'
          },
        },
        {
          type: 'string',
          label: 'Auteurs',
          name: 'auteurs',
          list: true,
        },
        {
          type: 'string',
          label: 'Thema',
          name: 'themas',
          list: true,
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
          type: 'boolean',
          label: 'Concept',
          name: 'draft',
        },
        {
          type: 'string',
          label: 'Content',
          name: 'body',
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
          type: 'string',
          label: 'Titel',
          name: 'title',
      	},
       	{
          type: 'string',
          label: 'Titel (op paginas)',
          name: 'heading',
      	},
       	{
          type: 'string',
          label: 'Beschrijving',
          name: 'description',
      	},
      ],
    }
  ],
});
