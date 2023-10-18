import { Injectable } from '@nestjs/common';

import {
  ICanvasConfig,
  ICanvasSizes,
} from '../interfaces/canvas-config.interface';

@Injectable()
export class CanvasConfig {
  getCanvasConfig(): ICanvasConfig {
    return {
      font: '50px sans-serif',
      textAlign: 'center',
      textBaseline: 'middle',
      fillStyle: '#fff',
    };
  }

  getCanvasSizes(): ICanvasSizes {
    return {
      width: 500,
      height: 500,
      x: 0,
      y: 0,
    };
  }
}
