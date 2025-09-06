import { z } from "zod"
import type { IFormFieldConfig } from "./IForm.d"

// En SSR, File puede no existir; evitamos ReferenceError:
const isFileInstance = (v: unknown): v is File =>
  typeof File !== 'undefined' && v instanceof File

const fileSchema = z.custom<File>(isFileInstance, {
  message: "Selecciona un archivo válido"
})

type RuleKind = 'string' | 'boolean' | 'file' // extiéndelo si agregas más

const rules: Record<
  RuleKind,
  (schema: z.ZodTypeAny, field: IFormFieldConfig, rule: string) => z.ZodTypeAny
> = {
  string: (schema, field, rule) => {
    if (rule === "required") {
      return (schema as z.ZodString).min(1, { message: `${field.name} is required` })
    }
    if (rule === "email") {
      return (schema as z.ZodString).email({ message: `${field.name} must be a valid email` })
    }
    return schema
  },

  boolean: (schema, field, rule) => {
    if (rule === "required") {
      return (schema as z.ZodBoolean).refine(v => v, { message: `${field.name} is required` })
    }
    return schema
  },

  file: (schema, field, rule) => {
    if (rule === "required") {
      // hacer obligatorio: sin optional/nullable
      return fileSchema
    }
    return schema
  }
}

function defineFieldSchema(field: IFormFieldConfig): { rule: RuleKind; type: z.ZodTypeAny } {
  switch (field.type) {
    case "checkbox":
      return { rule: "boolean", type: z.boolean() }
    case "file":
      return { rule: "file", type: fileSchema.optional().nullable() }
    default:
      return { rule: "string", type: z.string() }
  }
}

export function buildSchema(fields: IFormFieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const field of fields) {
    const base = defineFieldSchema(field)
    let zSchema: z.ZodTypeAny = base.type

    for (const rule of (field.rules || [])) {
      zSchema = rules[base.rule](zSchema, field, rule)
    }

    shape[field.name] = zSchema
  }

  return z.object(shape)
}
