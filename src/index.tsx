import {createElement, Component, createRef, HTMLAttributes} from 'rax';
import {isWeex} from 'universal-env';
import { enable, WeexBridge, Image as GImage } from 'gcanvas.js';
import findDOMNode from 'rax-find-dom-node';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'gcanvas': any;
    }
  }
}

export type CanvasProps = HTMLAttributes<HTMLCanvasElement>;

class Canvas extends Component<CanvasProps, any> {
  private canvas: any = createRef();
  static createImage = () => {
    return isWeex ? new GImage() : new Image();
  };
 
  public getContext = (type = '2d') => {
    const canvas = findDOMNode(this.canvas.current);
    return isWeex ? enable(canvas, { bridge: WeexBridge, debug: false, disableAutoSwap: false, disableComboCommands: false }).getContext(type) : canvas.getContext(type)
  };

  public render() {
    const {style = {}} = this.props;
    return isWeex ? <gcanvas {...this.props} ref={this.canvas} /> : <canvas {...this.props} width={style.width} height={style.height} ref={this.canvas} />;
  }
}

export default Canvas;
