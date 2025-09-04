import type {IFieldsKeys} from '~/components/IField/IField'
import type {IFormProps} from '~/components/IForm/IForm'

export interface IformFormProps extends Omit<IFormProps, 'fields' | 'submitLabel'>
{
  systemName: string
}

// Define the structure of each mapping entry
interface FieldApiMapping
{
  type: IFieldsKeys
  rules?: string[]
  fieldProps?: Record<string, unknown>
}
