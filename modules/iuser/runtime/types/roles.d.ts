import type {Form} from "#iform/types/forms";

export interface Role
{
  id: number
  createdAt: string
  form?: Form[] | []
  formId: number | null
  systemName: string
  title: string
}
