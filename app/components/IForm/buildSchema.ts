import { z } from "zod"
import type { IFormFieldConfig } from "./IForm.d"

export function applyRule(schema: z.ZodTypeAny, field: IFormFieldConfig, rule: string) {
  switch (rule) {
    case "required":
      return schema.min(1, { message: `${field.name} is required` })
    case "email":
      return schema.email({ message: `${field.name} must be a valid email` })
    default:
      return schema
  }
}

export function buildSchema(fields: IFormFieldConfig[]) {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const field of fields) {
    let schema: z.ZodTypeAny = z.string()

    if (field.rules) {
      for (const rule of field.rules) {
        schema = applyRule(schema, field, rule)
      }
    }

    shape[field.name] = schema
  }

  return z.object(shape)
}
