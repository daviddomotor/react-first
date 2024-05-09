/* Importing the entire package because of four icons is bit of an overkill, also bloats the bundle size,
so I've created this object that we can use. In this way the import cost is 7.6k (gzipped: 2k),
if you import the whole package it's 3.4M (gzipped: 349.4k) */
import { PencilFill, SortDown, SortUp, Trash } from "react-bootstrap-icons";

export const icons = { PencilFill, SortDown, SortUp, Trash };
