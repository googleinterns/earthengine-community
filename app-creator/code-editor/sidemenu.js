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
 */

/**
 * Creates a responsive and collapsible mobile panel.
 */
function createSidemenu(style) {
  var sidemenu = {};

  /**
   * Initializes panel and returns a reference to the sidePanel (outer level widget) and contentPanel (panel were widgets are added).
   */
  sidemenu.init = function () {
    var sidePanel = ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {
        width: '30px',
        height: '100%',
        maxWidth: '500px'
      },
    });

    var contentPanel = sidemenu.createContentPanel(style);

    var menuButton = sidemenu.createMenuButton(sidePanel, contentPanel);

    var verticalMenuButtonWrapper = sidemenu.createVerticalMenuButtonWrapper(
      menuButton
    );

    var horizontalMenuButtonWrapper = sidemenu.createHorizontalMenuButtonWrapper(
      verticalMenuButtonWrapper
    );

    sidePanel.widgets().add(contentPanel);

    sidePanel.widgets().add(horizontalMenuButtonWrapper);

    return {
      sidePanel: sidePanel,
      contentPanel: contentPanel,
    };
  };

  /**
   * Creates contentPanel which hosts user defined widgets (i.e. label, textbox, select, etc...).
   */
  sidemenu.createContentPanel = function (style) {
    // Overwriting mandatory properties.
    style.width = 0;
    style.height = '100%';
    style.padding = '0px';

    return ui.Panel({
      style: style,
    });
  };

  /**
   * Uses an underlying checkbox to create a menu button that expands and collapses.
   */
  sidemenu.createMenuButton = function (sidePanel, contentPanel) {
    return ui.Checkbox({
      label: '|    ▶',
      onChange: function () {
        var sidePanelWidth = sidePanel.style().get('width');
        sidePanel
          .style()
          .set('width', sidePanelWidth === '30px' ? '80%' : '30px');

        var contentPanelWidth = contentPanel.style().get('width');
        contentPanel
          .style()
          .set('width', contentPanelWidth ? 0 : 'calc(100% - 30px)');
        contentPanel.style().set('padding', contentPanelWidth ? '0px' : '16px');
      },
      style: {
        height:'50px',
        border: '0.5px solid black',
        padding: '0px 6px',
        margin: '0px 0px 0px -28px',
        fontSize: '18px',
        color: '#000000'
      },
    });
  };

  /**
   * Creates vertical and horizontal spacers for centering items. Used for centering menu button vertically and horizontally.
   */
  sidemenu.makeSpacer = function (direction) {
    return ui.Label({
      value: ' ',
      style: {
        margin: 0,
        padding: 0,
        stretch: direction,
      },
    });
  };

  /*
   * Creates a vertical wrapper for the button that centers it vertically.
   */
  sidemenu.createVerticalMenuButtonWrapper = function (menuButton) {
    return ui.Panel({
      widgets: [
        sidemenu.makeSpacer('vertical'),
        menuButton,
        sidemenu.makeSpacer('vertical'),
      ],
      style: {
        height: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: '#f5f6f9'
      },
      layout: ui.Panel.Layout.flow('vertical'),
    });
  };

  /*
   * Creates a horizontal wrapper for the button that centers it horizontally.
   */
  sidemenu.createHorizontalMenuButtonWrapper = function (
    verticalMenuButtonWrapper
  ) {
    return ui.Panel({
      widgets: [
        sidemenu.makeSpacer('horizontal'),
        verticalMenuButtonWrapper,
        sidemenu.makeSpacer('horizontal'),
      ],
      style: {
        width: '30px',
        height: '100%',
        margin: 0,
        padding: 0,
        border: '0.6px solid #636e72',
      },
      layout: ui.Panel.Layout.flow('horizontal'),
    });
  };

  return sidemenu.init();
}

exports.createSidemenu = createSidemenu;
