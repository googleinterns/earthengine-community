/**
 * @license
 * Copyright 2020 The Google Earth Engine Community Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview This file acts as a mock database storing our templates.
 */

import {DeviceType} from '../redux/types/enums';

export interface TemplateItem {
  id: string;
  name: string;
  imageUrl: string;
  device: DeviceType;
  template: string;
}

/**
 * Placeholder database. This data will be stored on Datastore and will be
 * fetched from an API endpoint.
 */
export const database: TemplateItem[] = [
  {
    id: 'left-side-panel',
    name: 'Left Side Panel',
    imageUrl:
        'https://storage.cloud.google.com/ee-app-creator.appspot.com/left-panel.png',
    device: DeviceType.DESKTOP,
    template: `{
        "config": {
            "parentID": "left-side-panel",
            "parentName": "Left Side Panel",
            "id": "left-side-panel-desktop",
            "name": "Left Side Panel Desktop",
            "device": "desktop"
        },
        "widgets": {
            "panel-template-0": {
                "id": "panel-template-0",
                "editable": false,
                "hasDropzone": false,
                "children": ["panel-template-1", "map-template-0"],
                "uniqueAttributes": {
                    "layout": "row"
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "shown": "true",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-1": {
                "id": "panel-template-1",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "100%",
                    "width": "30%",
                    "margin": "0px",
                    "borderColor": "#e28b59",
                    "boxSizing": "border-box"
                }
            },
            "map-template-0": {
                "id": "map-template-0",
                "children": [],
                "uniqueAttributes": {
                    "zoom": "10",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "retro",
                    "customMapStyles": ""
                },
                "style": {
                    "height": "100%",
                    "width": "auto",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            }
        }
    }`,
  },
  {
    id: 'left-drawer-mobile',
    name: 'Left Drawer Mobile',
    imageUrl:
        'https://storage.googleapis.com/ee-app-creator.appspot.com/left-drawer-mobile.png',
    device: DeviceType.MOBILE,
    template: `{
        "config": {
            "parentID": "left-drawer-mobile",
            "parentName": "Left Drawer Mobile",
            "id": "left-drawer-mobile",
            "name": "Left Side Panel Mobile",
            "device": "mobile"
        },
        "widgets": {
            "panel-template-0": {
                "id": "panel-template-0",
                "editable": false,
                "hasDropzone": false,
                "children": ["sidemenu-template-0", "map-template-0"],
                "uniqueAttributes": {
                    "layout": "row"
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "color": "black",
                    "box-sizing": "border-box",
                    "position": "relative"
                }
            },
            "sidemenu-template-0": {
                "id": "sidemenu-template-0",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "100%",
                    "width": "80%",
                    "padding": "0px",
                    "margin": "0px",
                    "color": "black",
                    "box-sizing": "border-box",
                    "position": "absolute",
                    "top":0,
                    "left":0,
                    "zIndex": 10
                }
            },
            "map-template-0": {
                "id": "map-template-0",
                "children": [],
                "uniqueAttributes": {
                    "zoom": "4",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "standard",
                    "customMapStyles": ""
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "color": "black",
                    "box-sizing": "border-box"
                }
            }
        }
    }`,
  },
  {
    id: 'right-side-panel',
    name: 'Right Side Panel',
    imageUrl:
        'https://storage.cloud.google.com/ee-app-creator.appspot.com/right-panel.png',
    device: DeviceType.DESKTOP,
    template: `{
        "config": {
            "parentID": "right-side-panel",
            "parentName": "Right Side Panel",
            "id": "right-side-panel-desktop",
            "name": "Right Side Panel Desktop",
            "device": "desktop"
        },
        "widgets": {
            "panel-template-0": {
                "id": "panel-template-0",
                "editable": false,
                "hasDropzone": false,
                "children": ["map-template-0", "panel-template-1"],
                "uniqueAttributes": {
                    "layout": "row"
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-1": {
                "id": "panel-template-1",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "100%",
                    "width": "30%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            },
            "map-template-0": {
                "id": "map-template-0",
                "children": [],
                "uniqueAttributes": {
                    "zoom": "4",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "silver",
                    "customMapStyles": ""
                },
                "style": {
                    "height": "100%",
                    "width": "auto",
                    "margin": "0px",
                    "backgroundColor": "#FFFFFFFF",
                    "backgroundOpacity": "100",
                    "boxSizing": "border-box"
                }
            }
        }
    }`,
  },
  {
    id: 'left-side-legend',
    name: 'Left Side Legend',
    imageUrl:
        'https://storage.cloud.google.com/ee-app-creator.appspot.com/legend-example.png',
    device: DeviceType.DESKTOP,
    template: `{
        "config": {
            "parentID": "left-side-legend",
            "parentName": "Left Side Legend",
            "id": "left-side-legend-desktop",
            "device": "desktop",
            "name": "Left Side Legend Desktop"
        },
        "widgets": {
            "panel-template-0": {
                "id": "panel-template-0",
                "editable": false,
                "hasDropzone": false,
                "children": ["map-template-0"],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "position": "relative",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-1": {
                "id": "panel-template-1",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "35%",
                    "width": "400px",
                    "margin": "0px",
                    "backgroundColor": "#0e1626CC",
                    "backgroundOpacity": "80",
                    "borderStyle": "solid",
                    "borderColor": "#85b7b0",
                    "position": "absolute",
                    "bottom": "32px",
                    "left": "16px",
                    "boxSizing": "border-box"
                }
            },
            "map-template-0": {
                "id": "map-template-0",
                "children": ["panel-template-1"],
                "uniqueAttributes": {
                    "zoom": "4",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "aubergine",
                    "customMapStyles": ""
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            }
        }
    }`,
  },
  {
    id: 'right-side-legend',
    name: 'Right Side Legend',
    imageUrl:
        'https://storage.googleapis.com/ee-app-creator.appspot.com/map-with-legend-right-side.png',
    device: DeviceType.DESKTOP,
    template: `{
        "config": {
            "parentID": "right-side-legend",
            "parentName": "Right Side Legend",
            "id": "right-side-legend-desktop",
            "device": "desktop",
            "name": "Right Side Legend desktop"
        },
        "widgets": {
            "panel-template-0": {
                "id": "panel-template-0",
                "editable": false,
                "hasDropzone": false,
                "children": ["map-template-0"],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "position": "relative",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-1": {
                "id": "panel-template-1",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "35%",
                    "width": "400px",
                    "margin": "0px",
                    "backgroundColor": "#0e1626CC",
                    "backgroundOpacity": "80",
                    "borderStyle": "solid",
                    "borderColor": "#85b7b0",
                    "position": "absolute",
                    "bottom": "32px",
                    "right": "16px",
                    "boxSizing": "border-box"
                }
            },
            "map-template-0": {
                "id": "map-template-0",
                "children": ["panel-template-1"],
                "uniqueAttributes": {
                    "zoom": "4",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "aubergine",
                    "customMapStyles": ""
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            }
        }
    }`,
  },
  {
    id: 'two-maps',
    name: 'Two Maps',
    imageUrl:
        'https://storage.cloud.google.com/ee-app-creator.appspot.com/two-map.png',
    device: DeviceType.DESKTOP,
    template: `{
        "config": {
            "parentID": "two-maps",
            "parentName": "Two Maps",
            "id": "two-maps-desktop",
            "device": "desktop",
            "name": "Two Maps Desktop"
        },
        "widgets": {
            "panel-template-0": {
                "id": "panel-template-0",
                "editable": false,
                "hasDropzone": false,
                "children": ["map-template-0", "map-template-1"],
                "uniqueAttributes": {
                    "layout": "row"
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "position": "relative",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-1": {
                "id": "panel-template-1",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "300px",
                    "width": "250px",
                    "margin": "0px",
                    "backgroundColor": "#17263CF2",
                    "backgroundOpacity": "95",
                    "borderStyle": "solid",
                    "borderColor": "#dfd2ae",
                    "position": "absolute",
                    "top": "16px",
                    "left": "16px",
                    "boxSizing": "border-box",
                    "zIndex": "1"
                }
            },
            "panel-template-2": {
                "id": "panel-template-2",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "300px",
                    "width": "250px",
                    "margin": "0px",
                    "backgroundColor": "#DFD2AEF2",
                    "backgroundOpacity": "95",
                    "borderStyle": "solid",
                    "borderColor": "#17263c",
                    "position": "absolute",
                    "bottom": "16px",
                    "right": "16px",
                    "boxSizing": "border-box"
                }
            },
            "map-template-0": {
                "id": "map-template-0",
                "children": ["panel-template-1"],
                "uniqueAttributes": {
                    "zoom": "10",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "retro",
                    "customMapStyles": ""
                },
                "style": {
                    "height": "100%",
                    "width": "50%",
                    "margin": "0px",
                    "backgroundColor": "#FFFFFFFF",
                    "backgroundOpacity": "100",
                    "boxSizing": "border-box"
                }
            },
            "map-template-1": {
                "id": "map-template-1",
                "children": ["panel-template-2"],
                "uniqueAttributes": {
                    "zoom": "10",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "night",
                    "customMapStyles": ""
                },
                "style": {
                    "height": "100%",
                    "width": "50%",
                    "margin": "0px",
                    "backgroundColor": "#FFFFFFFF",
                    "backgroundOpacity": "100",
                    "boxSizing": "border-box"
                }
            }
        }
           
    }`,
  },
  {
    id: 'four-maps',
    name: 'Four Maps',
    imageUrl:
        'https://storage.cloud.google.com/ee-app-creator.appspot.com/four-maps.png',
    device: DeviceType.DESKTOP,
    template: `{
        "config": {
            "parentID": "four-maps",
            "parentName": "Four Maps",
            "id": "four-maps-desktop",
            "name": "Four Maps Desktop",
            "device": "desktop"
        },
        "widgets": {
            "panel-template-0": {
                "id": "panel-template-0",
                "editable": false,
                "hasDropzone": false,
                "children": ["panel-template-1", "panel-template-2"],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "100%",
                    "width": "100%",
                    "margin": "0px",
                    "position": "relative",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-1": {
                "id": "panel-template-1",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "60px",
                    "width": "100%",
                    "margin": "0px",
                    "padding": "8px",
                    "position": "relative",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-2": {
                "id": "panel-template-2",
                "editable": false,
                "hasDropzone": false,
                "children": ["panel-template-3", "panel-template-4"],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "calc(100% - 60px)",
                    "width": "100%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-3": {
                "id": "panel-template-3",
                "editable": false,
                "hasDropzone": false,
                "children": ["map-template-0", "map-template-1"],
                "uniqueAttributes": {
                    "layout": "row"
                },
                "style": {
                    "height": "50%",
                    "width": "100%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            },
            "map-template-0": {
                "id": "map-template-0",
                "children": ["panel-template-5"],
                "uniqueAttributes": {
                    "zoom": "10",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "standard",
                    "customMapStyles": ""
                }, "style": {
                    "height": "100%",
                    "width": "50%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            },
            "map-template-1": {
                "id": "map-template-1",
                "children": ["panel-template-6"],
                "uniqueAttributes": {
                    "zoom": "10",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "retro",
                    "customMapStyles": ""
                }, "style": {
                    "height": "100%",
                    "width": "50%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-4": {
                "id": "panel-template-4",
                "editable": false,
                "hasDropzone": false,
                "children": ["map-template-2", "map-template-3"],
                "uniqueAttributes": {
                    "layout": "row"
                },
                "style": {
                    "height": "50%",
                    "width": "100%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            },
            "map-template-2": {
                "id": "map-template-2",
                "children": ["panel-template-7"],
                "uniqueAttributes": {
                    "zoom": "10",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "aubergine",
                    "customMapStyles": ""
                }, "style": {
                    "height": "100%",
                    "width": "50%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            },
            "map-template-3": {
                "id": "map-template-3",
                "children": ["panel-template-8"],
                "uniqueAttributes": {
                    "zoom": "10",
                    "latitude": "37.419857",
                    "longitude": "-122.078827",
                    "zoomControl": "false",
                    "fullscreenControl": "false",
                    "scaleControl": "false",
                    "streetViewControl": "false",
                    "mapTypeControl": "false",
                    "mapStyles": "dark",
                    "customMapStyles": ""
                }, "style": {
                    "height": "100%",
                    "width": "50%",
                    "margin": "0px",
                    "boxSizing": "border-box"
                }
            },
            "panel-template-5": {
                "id": "panel-template-5",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "150px",
                    "width": "300px",
                    "margin": "0px",
                    "position": "absolute",
                    "top": "16px",
                    "left": "16px",
                    "boxSizing": "border-box",
                    "zIndex": "1"
                }
            },
            "panel-template-6": {
                "id": "panel-template-6",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "150px",
                    "width": "300px",
                    "margin": "0px",
                    "position": "absolute",
                    "top": "16px",
                    "right": "16px",
                    "boxSizing": "border-box",
                    "zIndex": "1"
                }
            },
            "panel-template-7": {
                "id": "panel-template-7",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "150px",
                    "width": "300px",
                    "margin": "0px",
                    "position": "absolute",
                    "bottom": "16px",
                    "left": "16px",
                    "boxSizing": "border-box",
                    "zIndex": "1"
                }
            },
            "panel-template-8": {
                "id": "panel-template-8",
                "editable": true,
                "hasDropzone": true,
                "children": [],
                "uniqueAttributes": {
                    "layout": "column"
                },
                "style": {
                    "height": "150px",
                    "width": "300px",
                    "margin": "0px",
                    "position": "absolute",
                    "bottom": "16px",
                    "right": "16px",
                    "boxSizing": "border-box",
                    "zIndex": "1"
                }
            }
        }
    }`,
  },
];
