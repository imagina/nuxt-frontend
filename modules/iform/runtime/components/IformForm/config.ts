import type {FieldApiMapping} from './IformForm'

// ------------------------------------
// 1. Map de typeId of Fields
// ------------------------------------

export const fieldApiTypeToLocal: Record<number, FieldApiMapping> = {
  1: {// TEXT
    type: 'input',
    fieldProps: {
      type: ''
    }
  },
  2: {// TEXTAREA
    type: 'textarea',
    fieldProps: {
      rows: 4
    }
  },
  3: {// NUMBER
    type: 'input',
    fieldProps: {
      type: 'number'
    }
  },
  4: {// EMAIL
    type: 'input',
    rules: ['email'],
    fieldProps: {
      type: 'email',
      autocomplete: 'email'
    }
  },
  5: {// SELECT
    type: 'select',
    fieldProps: {}
  },
  6: {// SELECT_MULTIPLE
    type: 'select',
    fieldProps: {}
  },
  7: {// CHECKBOX
    type: 'checkbox',
    fieldProps: {}
  },
  8: {// RADIO
    type: 'checkbox',
    fieldProps: {}
  },
  10: {// PHONE
    type: 'input',
    fieldProps: {
      type: 'tel'
    }
  },
  11: {// DATE
    type: 'input',
    fieldProps: {
      type: 'datetime-local'
    }
  },
  12: {// FILE
    type: 'input',
    fieldProps: {
      type: 'file'
    }
  },
  13: {// TREE_SELECT
    type: 'select',
    fieldProps: {}
  },
  14: {// HIDDEN
    type: 'input',
    fieldProps: {
      type: 'hidden'
    }
  },
  15: {// FIRST_NAME
    type: 'input',
    fieldProps: {}
  },
  16: {// LAST_NAME
    type: 'input',
    fieldProps: {}
  },
};
