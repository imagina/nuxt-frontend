export interface Form
{
  id: number;
  systemName: string;
  active: number;
  formType: string | null;
  parentId: number | null;
  userId: number | null;
  createdAt: string; // ISO date
  createdBy: number;
  updatedAt: string; // ISO date
  updatedBy: number;
  deletedAt: string | null;
  deletedBy: number | null;
  destinationEmail: string | null;
  options: Record<string, unknown>;
  fields: Field[];
  title: string;
  description: string;
}

export interface FormOptions
{
  urlTermsAndConditions: string | null;
  replyTo: string | null;
  replyToName: string | null;
}

export interface Field
{
  id: number;
  formId: number;
  blockId: number;
  parentId: number | null;
  order: number;
  label: string;
  placeholder: string | null;
  description: string | null;
  required: number; // 0 or 1
  rules: string | null;
  selectable: string | null;
  systemName: string | null;
  systemType: string | null;
  width: number;
  visibility: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  deletedAt: string | null;
  deletedBy: number | null;

  typeId: string;
  type: FieldType;
  options: FieldOptions;
  prefix: FieldAffix;
  suffix: FieldAffix;
  es: FieldLocale;
}

export interface FieldType
{
  id: number;
  title: string;
  value: string; // "text" | "number" | "email" | "textarea" | "select" | "file" | "checkbox" | etc.
}

export interface FieldOptions
{
  icon: string | null;
}

export interface FieldAffix
{
  type: string | null;
  text: string | null;
}

export interface FieldLocale
{
  label: string;
  placeholder: string | null;
  description: string | null;
}
