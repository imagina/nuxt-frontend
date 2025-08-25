import type {IFieldConfig} from '../IField/IField'

export interface IFormFieldConfig extends IFieldConfig
{
  rules?: string[]
}

export interface IFormProps
{
  title: string
  description?: string
  fields: IFormFieldConfig[]
  submitLabel?: string
}
