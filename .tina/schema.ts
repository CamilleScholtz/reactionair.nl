import { defineSchema } from 'tinacms'
import fetch from 'sync-fetch';

// TODO: In the future replace this with references. See https://github.com/tinacms/tinacms/issues/2347
const auteurs    = fetch('https://reactionair.nl/auteurs/index.json').json()
const dossiers   = fetch('https://reactionair.nl/dossiers/index.json').json()
const aangehaald = fetch('https://reactionair.nl/aangehaald/index.json').json()

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
          options: auteurs,
        },
        {
          label: 'Dossiers',
          name: 'dossiers',
          type: 'string',
          list: true,
          options: dossiers,
        },
        {
          label: 'Aangehaald',
          name: 'aangehaald',
          type: 'string',
          list: true,
          options: aangehaald,
          ui: {
          	component: 'tags',
          },
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
