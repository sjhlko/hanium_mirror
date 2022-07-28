import { models } from '../models/index.js';

export class LineService {
  constructor() {
    this.lineAttributes = ['line_id', 'line_name'];
  }

  async getLineByLineId(lineId) {
    return await models.Line.findByLineId(lineId, this.lineAttributes);
  }
}
