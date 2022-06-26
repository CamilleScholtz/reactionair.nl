import TinaCMS, { defineSchema, TinaAdmin } from "tinacms"
import { TinaEditProvider, setEditing } from "tinacms/dist/edit-state"
import { MarkdownFieldPlugin } from "react-tinacms-editor/dist/index"
import schema from "../../.tina/schema"

function App() {
  setEditing(true);

  const branch   = "main";
  const clientId = "79dc3577-e67a-423b-bfb5-76fea2b0a155";
  const apiURL   = process.env.NODE_ENV == "development"
    ? "http://localhost:4001/graphql"
    : `https://content.tinajs.io/content/${clientId}/github/${branch}`;
//DateFieldPlugin
//import { DateFieldPlugin } from 'react-tinacms-date'

  return (
    <TinaEditProvider
      editMode={
        <TinaCMS
          apiURL={apiURL}
          schema={schema}
          cmsCallback={(cms) => {
            cms.plugins.add(MarkdownFieldPlugin)

            return cms
          }}
        >
          <TinaAdmin />
        </TinaCMS>
      }
    >
      <div>Need to be in edit mode!</div>
    </TinaEditProvider>
  );
}

export default App;
