import type {Field} from '#iform/types/forms'
import type {IFormFieldConfig} from '~/components/IForm/IForm'
import {fieldApiTypeToLocal} from './config'

export function mapApiFields (fields: Field[]): IFormFieldConfig[]
{
  return fields.map((f) =>
  {
    const fieldPresets = fieldApiTypeToLocal[Number(f.typeId)];
    const ifield: IFormFieldConfig = {
      name: f.systemName || f.label.toLowerCase().replace(/\s+/g, '_'),
      type: fieldPresets?.type ?? 'input',
      default: fieldPresets?.default ?? '',
      rules: [
        ...(f.required ? ['required'] : []),
        ...(fieldPresets?.rules ?? [])
      ],
      width: `col-span-${f.width}`,
      formFieldProps: {
        label: f.label,
        ui: {},
      },
      fieldProps: {
        ...(fieldPresets?.fieldProps ?? {}),
        placeholder: f.placeholder ?? undefined
      }
    }

    return ifield;
  }) as IFormFieldConfig[];
}
