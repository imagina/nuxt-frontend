import type {Slot} from "#irentcar/types/reservation";

export const defaultFormValues = {
  pickupOfficeId: null,
  pickupDate: null,
  pickupTime: null,
  dropOfficeId: null,
  dropDate: null,
  dropTime: null,
}

export function generateTimeSlots (
  start: string,
  end: string,
  intervalMinutes: number
): Slot[]
{
  const [startHourStr, startMinuteStr] = start.split(':')
  const [endHourStr, endMinuteStr] = end.split(':')

  const startHour = Number(startHourStr)
  const startMinute = Number(startMinuteStr)
  const endHour = Number(endHourStr)
  const endMinute = Number(endMinuteStr)

  if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute))
  {
    throw new Error('Formato de hora inválido. Usa formato HH:mm.')
  }

  const startDate = new Date()
  startDate.setHours(startHour, startMinute, 0, 0)

  const endDate = new Date()
  endDate.setHours(endHour, endMinute, 0, 0)

  const slots: Slot[] = []

  const current = new Date(startDate)
  while (current <= endDate)
  {
    const hours = current.getHours().toString().padStart(2, '0')
    const minutes = current.getMinutes().toString().padStart(2, '0')
    slots.push({hour: `${hours}:${minutes}`, available: true})
    current.setMinutes(current.getMinutes() + intervalMinutes)
  }

  return slots
}
