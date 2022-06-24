import { defineSchema } from 'tinacms';

export default defineSchema({
  collections: [
    {
      label: 'Artikelen',
      name: 'artikelen',
      path: 'content/artikelen',
      fields: [
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
          type: 'datetime',
          ui: {
            dateFormat: 'YYYY-MM-DD'
          },
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
          label: 'Concept',
          name: 'draft',
          type: 'boolean',
        },
        {
          label: 'Content',
          name: 'body',
          isBody: true,
          type: 'string',
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
