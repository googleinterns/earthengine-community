/**
 *  @fileoverview This file acts as a mock database storing our templates.
 */
interface TemplateItem {
  id: string;
  name: string;
  variant: string;
  template: {
    [key: string]: {
      name: string;
      imageUrl: string;
      template: string;
    };
  };
}

/**
 * Placeholder database. This data will be stored on Datastore and will be fetched from an API endpoint.
 */
export const database: TemplateItem[] = [
  {
    id: 'side-panel',
    name: 'Side Panel',
    variant: 'left',
    template: {
      left: {
        name: 'Left Layout',
        imageUrl: 'https://miro.medium.com/max/552/0*aR2TiedsgbC4n0uQ',
        template:
          '{"id":"side-panel","name":"Side Panel","panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["panel-template-1","map-template-0"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":[],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"0px","margin":"0px","color":"black","backgroundColor":"#FFFFFF","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4", "latitude": "37.419857", "longitude": "-122.078827", "zoomControl": "false", "fullscreenControl": "false", "streetViewControl": "false", "mapTypeControl": "false", "mapStyles": "standard", "customMapStyles": ""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","color":"black","backgroundColor":"#FFFFFF","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true" }}}',
      },
      right: {
        name: 'Right Layout',
        imageUrl: 'https://miro.medium.com/max/552/0*aR2TiedsgbC4n0uQ',
        template:
          '{"id":"side-panel","name":"Side Panel","panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["map-template-0","panel-template-1"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":[],"uniqueAttributes":{"layout":"column"},"style":{"height":"100%","width":"40%","padding":"0px","margin":"0px","color":"black","backgroundColor":"#FFFFFF","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4", "latitude": "37.419857", "longitude": "-122.078827", "zoomControl": "false", "fullscreenControl": "false", "streetViewControl": "false", "mapTypeControl": "false", "mapStyles": "standard", "customMapStyles": ""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","color":"black","backgroundColor":"#FFFFFF","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true" }}}',
      },
    },
  },
  {
    id: 'map-with-legend',
    name: 'Map with legend',
    variant: 'default',
    template: {
      default: {
        name: 'Map with legend',
        imageUrl: 'https://miro.medium.com/max/552/0*9G1jji4Xq99VBeIk',
        template: `{"id":"map-with-legend","name":"Map with legend","panel-template-0":{"id":"panel-template-0","editable":false,"hasDropzone":false,"children":["map-template-0","panel-template-1"],"uniqueAttributes":{"layout":"row"},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","position":"relative"}},"panel-template-1":{"id":"panel-template-1","editable":true,"hasDropzone":true,"children":[],"uniqueAttributes":{"layout":"column"},"style":{"height":"40%","width":"40%","padding":"0px","margin":"0px","color":"black","backgroundColor":"#FFFFFF","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true","position":"absolute","bottom":"16px","left":"16px"}},"map-template-0":{"id":"map-template-0","children":[],"uniqueAttributes":{"zoom":"4", "latitude": "37.419857", "longitude": "-122.078827", "zoomControl": "false", "fullscreenControl": "false", "streetViewControl": "false", "mapTypeControl": "false", "mapStyles": "standard", "customMapStyles": ""},"style":{"height":"100%","width":"100%","padding":"0px","margin":"0px","color":"black","backgroundColor":"#FFFFFF","borderWidth":"0px","borderStyle":"solid","borderColor":"black","fontSize":"12px","fontWeight":"300","fontFamily":"Roboto","textAlign":"left","whiteSpace":"normal","shown":"true" }}}`,
      },
    },
  },
];
