import {
  Node,
  Attributes,
  SourceLocation,
  Language
} from 'cbml/lib/ast'

export type CBMLNodeType = 'CBMLElement' | 'BlockElement' | 'CommentElement' | 'TextNode' | 'VoidElement';

export interface EmptyCBMLNode {
  type?: CBMLNodeType;
  tag?: string;
  attributes?: Attributes;
  body?: CBMLNode[];
  content?: string;
  range?: [number, number];
  loc?: SourceLocation | null;
  language?: Language;
}

export interface CBMLNode extends Node {
  type: CBMLNodeType;
  tag?: string;
  attributes?: Attributes;
  body?: CBMLNode[];
  content?: string;
  range?: [number, number];
  loc?: SourceLocation | null;
  language?: Language;
}

export type PluginFunc = (CBMLRootEle: CBMLNode, code: string) => Promise<CBMLNode>

export interface Source {
  input: string;
  output?: string;
}

export interface ProcessorConfig {
  sources: Source[];
  plugins: PluginFunc[];
}

export interface BuildReturn {
  input: string;
  output?: string;
  outputCode: string;
}