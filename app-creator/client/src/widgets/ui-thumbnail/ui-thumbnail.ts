import '@polymer/paper-button';
import { css, customElement, html, LitElement, property } from 'lit-element';
import {
  DEFAULT_SHARED_ATTRIBUTES,
  AttributeMetaData,
  DefaultAttributesType,
  getDefaultAttributes,
  SharedAttributes,
} from '../../redux/types/attributes';
import { styleMap } from 'lit-html/directives/style-map';

@customElement('ui-thumbnail')
export class Thumbnail extends LitElement {
  static styles = css``;

  static attributes: AttributeMetaData = {};

  static DEFAULT_THUMBNAIL_ATTRIBUTES: DefaultAttributesType = getDefaultAttributes(
    Thumbnail.attributes
  );

  static defaultStyles: { [key: string]: string } = {
    backgroundColor: '#636e72',
    backgroundOpacity: '100',
    height: '100px',
    width: '100px',
  };

  static disabledStyles: Set<SharedAttributes> = new Set([
    'color',
    'padding',
    'fontSize',
    'fontWeight',
    'fontFamily',
    'textAlign',
    'whiteSpace',
    'shown',
  ]);

  /**
   * Additional custom styles.
   */
  @property({ type: Object }) styles = {
    ...DEFAULT_SHARED_ATTRIBUTES,
    ...Thumbnail.defaultStyles,
  };

  render() {
    const { styles } = this;

    return html`<div id="container" style="${styleMap(styles)}"></div>`;
  }

  getStyle(): object {
    return this.styles;
  }

  setStyle(style: { [key: string]: string }) {
    this.styles = style;
    this.requestUpdate();
  }
}
