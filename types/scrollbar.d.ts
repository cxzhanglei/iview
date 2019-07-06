// Type definitions for iview 3.4.3
// Definitions by: ZL
import Vue, { VNode } from 'vue';

export declare class ScrollBar extends Vue {
  /**
   * 滚动区域的高度/宽度，单位像素
   * @default 0
   */
  height?: number;
  width?: number;
  classes?: string;
  speed?: {
      x?: number;
      y?: number;
  }
}
