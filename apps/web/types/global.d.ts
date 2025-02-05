import {Tool} from "../canvas/Canavas";

export {};

declare global {
  interface Window {
    selectedTool?: Tool;
    selectedBackgroundColor?: string;
    selectedStrokeColor?: string;
  }
}