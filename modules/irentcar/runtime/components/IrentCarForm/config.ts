import type {IFieldConfig} from '~/components/IField/IField'

export const formFields: Record<string, IFieldConfig> = {
  office: {
    name: 'pickupOfficeId',
    type: 'select',
    formFieldProps: {
      label: 'Oficina de Recogida',
    },
    fieldProps: {
      items: []
    }
  }
}
