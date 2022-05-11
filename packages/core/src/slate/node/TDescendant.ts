import { TEditor, Value } from '../editor/TEditor';
import { isElement } from '../element/isElement';
import { EElement, ElementOf, TElement } from '../element/TElement';
import { isText } from '../text/isText';
import { EText, TextOf, TText } from '../text/TText';
import { TNode } from './TNode';

/**
 * The `Descendant` union type represents nodes that are descendants in the
 * tree. It is returned as a convenience in certain cases to narrow a value
 * further than the more generic `Node` union.
 */
export type TDescendant = TElement | TText;

/**
 * Descendant of an editor.
 */
// export type EDescendant<V extends Value> = DescendantOf<TEditor<V>>;

/**
 * Descendant of a value.
 */
export type EDescendant<V extends Value> = EElement<V> | EText<V>;

/**
 * A utility type to get all the descendant node types from a root node type.
 */
export type DescendantOf<N extends TNode> = N extends TEditor<Value>
  ? ElementOf<N> | TextOf<N>
  : N extends TElement
  ? ElementOf<N['children'][number]> | TextOf<N>
  : never;

/**
 * A utility type to get the child node types from a root node type.
 */
export type ChildOf<
  N extends TNode,
  I extends number = number
> = N extends TEditor<Value>
  ? N['children'][I]
  : N extends TElement
  ? N['children'][I]
  : never;

export const isDescendant: (value: any) => value is TDescendant = ((
  node: any
) => isElement(node) || isText(node)) as any;