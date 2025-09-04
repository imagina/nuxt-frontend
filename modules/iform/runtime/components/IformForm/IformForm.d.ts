import type {IFieldsKeys} from '~/components/IField/IField'
import type {IFormProps} from '~/components/IForm/IForm'

export interface IformFormProps extends Pick<IFormProps, 'ui'>
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
