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
      formFieldProps: {
        label: f.label,
        class: `col-span-${f.width}`,
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
