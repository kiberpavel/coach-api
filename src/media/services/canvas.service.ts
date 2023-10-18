import { Injectable } from '@nestjs/common';
import { createCanvas } from 'canvas';

import { CanvasConfig } from '../config/canvas.config';
import { generateInitials } from '../../common/helpers/name.helper';
import { generateColor } from '../../common/helpers/color.helper';

@Injectable()
export class CanvasService {
  constructor(private readonly mediaConfig: CanvasConfig) {}

  async createAvatar(fullName: string): Promise<Buffer> {
    const { width, height, x, y } = await this.mediaConfig.getCanvasSizes();

    const canvas = createCanvas(width, height);

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = generateColor();

    ctx.fillRect(x, y, width, height);

    const canvasConfig = await this.mediaConfig.getCanvasConfig();

    for (const style in canvasConfig) {
      ctx[style] = canvasConfig[style];
    }

    const nameInitials = generateInitials(fullName);

    ctx.fillText(nameInitials, width / 2, height / 2);

    return canvas.toBuffer('image/png');
  }
}
