import type {IFieldConfig} from '../IField/IField'

export interface IFormProps {
  title: string
  description?: string
  fields: IFieldConfig[]
  schema?: any
  submitLabel?: string
}
