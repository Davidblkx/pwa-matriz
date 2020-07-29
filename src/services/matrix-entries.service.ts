import { Optional } from "@/core/optional";
import {
  isMatrixEntry,
  isMatrixEntryArray,
  MatrixEntry
} from "@/models/matrix-entry.model";

import { StorageService } from "./storage.service";

const MATRIX_ENTRIES_KEY = "#PWAMATRIZ|ENTRIES";
let SINGLETON: MatrixEntriesService | undefined;

/**
 * Service to load and save matrix entries
 *
 * @export
 * @class MatrixEntriesService
 */
export class MatrixEntriesService {
  private _store = StorageService.create();
  private _list: MatrixEntry[] = [];

  private constructor() {
    this.loadEntries();
  }

  public getAll(): MatrixEntry[] {
    return [...this._list];
  }

  /**
   * get matrix by name
   * @param name name to search
   */
  public get(name: string): Optional<MatrixEntry> {
    const matrix = this._list.find(e => e.name === name);
    return Optional.some(matrix, isMatrixEntry);
  }

  /**
   * check if matrix name exists
   * @param name name of matrix
   */
  public has(name: string) {
    return !!this._list.find(e => e.name === name);
  }

  /**
   * adds a new matrix, name must be unique
   * @param entry matrix to add
   * @returns {boolean} true, if added
   */
  public add(entry: MatrixEntry): boolean {
    if (this.has(entry.name)) {
      return false;
    }
    this._list.push(entry);
    this.saveEntries();
    return true;
  }

  /**
   * name of matrix to remove
   * @param name name of matrix
   */
  public remove(name: string) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const index = this._list.findIndex(e => e.name === name);
      if (index === -1) {
        break;
      }
      this._list.splice(index, 1);
    }
    this.saveEntries();
  }

  private saveEntries() {
    this._store.set(MATRIX_ENTRIES_KEY, this._list);
  }

  private loadEntries() {
    const res = this._store.get(MATRIX_ENTRIES_KEY, isMatrixEntryArray);
    this._list = res.hasValue() ? res.get() : [];
  }

  public static instance() {
    if (typeof SINGLETON === "undefined") {
      SINGLETON = new MatrixEntriesService();
    }

    return SINGLETON;
  }
}
