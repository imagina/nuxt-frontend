import type {IFieldConfig} from '../IField/IField'

export interface IFormFieldConfig extends IFieldConfig
{
  rules?: string[]
}

export interface IFormUi {
  root?: string
  header?: string
  title?: string
  description?: string
  form?: string
  actions?: string
}

export interface IFormProps
{
  title?: string
  description?: string
  fields: IFormFieldConfig[]
  submitLabel?: string
  buttonProps?: Record<string, any>
  ui?: IFormUi
}
