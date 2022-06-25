import { defineSchema } from 'tinacms'

const authors = require('../public/auteurs/index.json')

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
            timeFormat: false,
          },*/
        },
        {
          label: 'Auteurs',
          name: 'auteurs',
          type: 'string',
          list: true,
          ui: {
          	component: 'select',
          },
          options: authors,
        },
        {
          label: 'Dossiers',
          name: 'dossiers',
          type: 'string',
          list: true,
        },
        {
          label: 'Aangehaald',
          name: 'aangehaald',
          type: 'string',
          list: true,
          ui: {
          	component: 'tags',
          },
          options: [
          	'Politiek & Actualiteit',
            'Cultuur & Maatschappij',
            'Recensie & Biografie',
            'Religie & Metafysica',
            'Klikaas',
          ],
        },
        {
          label: 'Thema',
          name: 'themas',
          type: 'string',
          options: [
          	'Politiek & Actualiteit',
            'Cultuur & Maatschappij',
            'Recensie & Biografie',
            'Religie & Metafysica',
            'Klikaas',
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
