import type {Field} from '#iform/types/forms'
import type {IFormFieldConfig} from '~/components/IForm/IForm'
import {fieldApiTypeToLocal} from './config'

export function mapApiFields (fields: Field[]): IFormFieldConfig[]
{
  return fields.map((f) =>
  {
    const typeId = Number(f.typeId);
    const fieldPresets = fieldApiTypeToLocal[typeId];
    if (!fieldPresets) return f;
    const ifield: IFormFieldConfig = {
      name: f.systemName || f.label.toLowerCase().replace(/\s+/g, '_'),
      type: fieldPresets?.type ?? 'input',
      default: fieldPresets.default,
      rules: [
        ...(f.required ? ['required'] : []),
        ...(fieldPresets?.rules ?? [])
      ],
      width: `col-span-${f.width}`,
      formFieldProps: {
        label: [7].includes(typeId) ? '' : f.label,
        ui: {},
        required: !!f.required
      },
      fieldProps: {
        ...(fieldPresets?.fieldProps ?? {}),
        placeholder: f.placeholder ?? undefined,
        label: [7].includes(typeId) ? f.label : '',
        ...([5].includes(typeId) ? {items: f.options.fieldOptions ?? []} : {})
      }
    }

    return ifield;
  }) as IFormFieldConfig[];
}
