import { defineSchema } from 'tinacms'
import fetch from 'sync-fetch';

// TODO: In the future replace this with references. See https://github.com/tinacms/tinacms/issues/2347
const aangehaald = fetch('https://reactionair.nl/aangehaald/index.json').json()
const auteurs    = fetch('https://reactionair.nl/auteurs/index.json').json()
const dossiers   = fetch('https://reactionair.nl/dossiers/index.json').json()
const themas     = fetch('https://reactionair.nl/themas/index.json').json()

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
          label: 'Titel',
          name: 'title',
          type: 'string',
          isTitle: true,
          required: true,
        },
        {
          label: 'Ondertitel',
          name: 'subtitle',
          type: 'string',
          required: true,
        },
        {
          label: 'Datum',
          name: 'date',
          type: 'string',
          required: true,
          /*ui: {
            dateFormat: 'YYYY-MM-DD',
            timeFormat: false,
          },*/
        },
        {
          label: 'Auteurs',
          name: 'auteurs',
          type: 'string',
          required: true,
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
        },
        {
          label: 'Thema',
          name: 'themas',
          required: true,
          type: 'string',
          options: themas,
        },
        {
          label: 'Content',
          name: 'body',
          type: 'string',
          isBody: true,
          ui: {
            component: 'markdown',
          },
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
          isTitle: true,
          required: true,
      	},
       	{
          label: 'Titel (op paginas)',
          name: 'heading',
          type: 'string',
          required: true,
      	},
       	{
          label: 'Beschrijving',
          name: 'description',
          type: 'string',
          required: true,
      	},
      ],
    }
  ],
});
