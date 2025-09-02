import { z } from "zod"
import type { IFormFieldConfig } from "./IForm.d"

export function applyRule(schema: z.ZodTypeAny, field: IFormFieldConfig, rule: string) {
  if (field.type === "checkbox") {
    if (rule === "required") {
      return (schema as z.ZodBoolean).refine(v => v === true, {
        message: `${field.name} is required`
      })
    }
    return schema
  }
  switch (rule) {
    case "required":
      return (schema as z.ZodString).min(1, { message: `${field.name} is required` })
    case "email":
      return (schema as z.ZodString).email({ message: `${field.name} must be a valid email` })
    default:
      return schema
  }
}

export function buildSchema(fields: IFormFieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const field of fields) {
    let schema: z.ZodTypeAny = field.type === "checkbox" ? z.boolean() : z.string()

    if (field.rules) {
      for (const rule of field.rules) {
        schema = applyRule(schema, field, rule)
      }
    }

    shape[field.name] = schema
  }

  return z.object(shape)
}
