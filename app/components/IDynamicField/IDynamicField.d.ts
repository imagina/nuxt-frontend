import { DYNAMIC_FIELDS } from './config';
import type * as CTypes from '#ui/types';

export type DynamicFieldsKeys = keyof typeof DYNAMIC_FIELDS;

export interface DynamicFieldProps {
  type: DynamicFieldsKeys
  modelValue: any
  formFieldProps?: CTypes.FormFieldProps
  fieldProps?: CTypes.InputProps | CTypes.TextareaProps | CTypes.SelectProps | CTypes.CheckboxProps
}
