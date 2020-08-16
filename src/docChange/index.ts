import { Doc } from '../doc'

/**
 * The type of a `DocumentChange` may be 'added', 'removed', or 'modified'.
 */
export type DocChangeType = 'added' | 'removed' | 'modified';

export interface DocChange<Model> {
  /** The type of change ('added', 'modified', or 'removed'). */
  readonly type: DocChangeType;

  /** The document affected by this change. */
  readonly doc: Doc<Model>;

  /**
   * The index of the changed document in the result set immediately prior to
   * this `DocumentChange` (i.e. supposing that all prior `DocumentChange` objects
   * have been applied). Is -1 for 'added' events.
   */
  readonly oldIndex: number;

  /**
   * The index of the changed document in the result set immediately after
   * this `DocumentChange` (i.e. supposing that all prior `DocumentChange`
   * objects and the current `DocumentChange` object have been applied).
   * Is -1 for 'removed' events.
   */
  readonly newIndex: number;
}

