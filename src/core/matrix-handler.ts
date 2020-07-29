import { getLetterNumber } from "@/models/letters.model";
import { Matrix } from "@/models/matrix.model";

export class MatrixHandler {
  private _matrix: Matrix[] = [];
  private _levels = 1;

  public get levels() {
    return this._levels;
  }

  public get matrix() {
    return this._matrix;
  }

  public constructor(matrix: Matrix[]);
  public constructor(levels: number);
  public constructor(matrixOrLevel: Matrix[] | number) {
    if (Array.isArray(matrixOrLevel)) {
      this._matrix = matrixOrLevel;
    } else if (typeof matrixOrLevel === "number") {
      this._levels = matrixOrLevel;
    } else {
      throw new Error("You need to initialize it with a valid array or level");
    }
  }

  public setCoordinate(...values: (string | number)[]) {
    if (values.length !== this._levels) {
      throw new Error("invalid coordinates size");
    }

    let lastRef: Matrix = [];
    for (let i = 0; i < this._levels; i++) {
      if (i === values.length - 1) {
        lastRef[0] = values[i].toString();
        continue;
      }
      const code = getLetterNumber(values[i]);

      if (i === 0) {
        lastRef = this._matrix[code] || [];
        this._matrix[code] = lastRef;
        continue;
      }

      lastRef[code] = lastRef[code] || [];
      lastRef = lastRef[code] as Matrix;
    }
  }

  public getCoordinateValue(...values: (string | number)[]): string {
    if (values.length !== this._levels) {
      throw new Error("invalid coordinates size");
    }

    let lastRef: Matrix = [];
    for (let i = 0; i < values.length; i++) {
      const code = getLetterNumber(values[i]);
      if (i === 0) {
        lastRef = this._matrix[code];
      } else if (i === values.length - 1) {
        lastRef = lastRef[0][code] as Matrix;
      } else {
        lastRef = lastRef[code] as Matrix;
      }

      if (typeof lastRef === "undefined") {
        return "";
      }
    }
    if (typeof lastRef === "string") {
      return lastRef;
    }

    return "";
  }
}
