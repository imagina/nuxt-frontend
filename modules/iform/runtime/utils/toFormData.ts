// utils/toFormData.ts

function getType (
  data: unknown
): 'null' | 'file' | 'primitive' | 'array' | 'object'
{
  if (data === null || data === undefined) return 'null'

  const hasFile = typeof File !== 'undefined'
  const hasBlob = typeof Blob !== 'undefined'
  if ((hasFile && data instanceof File) || (hasBlob && data instanceof Blob))
  {
    return 'file'
  }

  if (Array.isArray(data)) return 'array'

  if (typeof data === 'object') return 'object'

  return 'primitive'
}

export function toFormData (
  data: unknown,
  form: FormData = new FormData(),
  parentKey?: string
): FormData
{
  const type = getType(data)

  switch (type)
  {
    case 'null':
      if (parentKey) form.append(parentKey, '')
      return form
    case 'file':
      if (!parentKey) throw new Error('File/Blob requiere parentKey')
      form.append(parentKey, data as Blob)
      return form
    case 'primitive':
      if (!parentKey) throw new Error('Valor primitivo requiere parentKey')
      form.append(parentKey, String(data))
      return form
    case 'array':
      const arr = data as unknown[]
      arr.forEach((v) =>
      {
        const key = parentKey ? `${parentKey}[]` : '[]'
        toFormData(v, form, key)
      })
      return form
  }

  // Objets
  Object.entries(data as Record<string, unknown>).forEach(([k, v]) =>
  {
    const key = parentKey ? `${parentKey}[${k}]` : k
    toFormData(v, form, key)
  })

  return form
}
