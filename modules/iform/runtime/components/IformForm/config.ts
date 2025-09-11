import type {FieldApiMapping} from './IformForm'

// ------------------------------------
// 1. Map de typeId of Fields
// ------------------------------------

export const fieldApiTypeToLocal: Record<number, FieldApiMapping> = {
  1: {// TEXT
    type: 'input',
    default: '',
    fieldProps: {
      type: ''
    }
  },
  2: {// TEXTAREA
    type: 'textarea',
    default: '',
    fieldProps: {
      rows: 4
    }
  },
  3: {// NUMBER
    type: 'input',
    default: '',
    fieldProps: {
      //type: 'number'
    }
  },
  4: {// EMAIL
    type: 'input',
    default: '',
    rules: ['email'],
    fieldProps: {
      type: 'email'
    }
  },
  5: {// SELECT
    type: 'select',
    default: null,
    fieldProps: {
      items: []
    }
  },
  6: {// SELECT_MULTIPLE
    type: 'select',
    default: [],
    fieldProps: {}
  },
  7: {// CHECKBOX
    type: 'checkbox',
    default: false,
    fieldProps: {}
  },
  8: {// RADIO
    type: 'checkbox',
    default: false,
    fieldProps: {}
  },
  10: {// PHONE
    type: 'input',
    default: '',
    fieldProps: {
      type: 'tel'
    }
  },
  11: {// DATE
    type: 'input',
    default: '',
    fieldProps: {
      type: 'date'
    }
  },
  12: {// FILE
    type: 'file',
    default: null,
    fieldProps: {
      accept: "image/*,.pdf",
      label: 'Selecciona un archivo',
      description: 'PDF, JPG, PNG (max 2MB)'
    }
  },
  13: {// TREE_SELECT
    type: 'select',
    default: '',
    fieldProps: {}
  },
  14: {// HIDDEN
    type: 'input',
    default: '',
    fieldProps: {
      type: 'hidden'
    }
  },
  15: {// FIRST_NAME
    type: 'input',
    default: '',
    fieldProps: {}
  },
  16: {// LAST_NAME
    type: 'input',
    default: '',
    fieldProps: {}
  },
};
