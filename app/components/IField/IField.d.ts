import { FIELDS } from './config';
import type * as CTypes from '#ui/types';

export type IFieldsKeys = keyof typeof FIELDS;

export interface IFieldProps {
  type: IFieldsKeys
  modelValue: any
  formFieldProps?: CTypes.FormFieldProps
  fieldProps?: CTypes.InputProps | CTypes.TextareaProps | CTypes.SelectProps | CTypes.CheckboxProps
}
