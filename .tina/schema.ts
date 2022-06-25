import { defineSchema } from 'tinacms'
import fs from 'fs-extra'

const auteurs  = JSON.parse(fs.readFileSync('/srv/reactionair.nl/public/auteurs/index.json').toString())
const dossiers = JSON.parse(fs.readFileSync('/srv/reactionair.nl/public/dossiers/index.json').toString())

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
