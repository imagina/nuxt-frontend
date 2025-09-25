<script lang="ts" setup>
import type { ResetPasswordForm, ResetPasswordFormErrors, ResetPasswordMessage } from '../../types/reset-password.t'

// Nuxt app instance
const { $apiFetch } = useNuxtApp()

// Form data
const form = ref<ResetPasswordForm>({
  email: '',
  password: '',
  confirmPassword: '',
  token: ''
})

// Form validation errors
const errors = ref<ResetPasswordFormErrors>({})

// Loading state
const loading = ref(false)

// Success/Error message
const message = ref<ResetPasswordMessage>({ text: '', type: 'success' })

// Get token from URL query params
const route = useRoute()
const router = useRouter()

// Initialize form data from query params
onMounted(async () => {
  const token = (route.query.token as string) || ''
  const email = (route.query.email as string) || ''

  form.value.token = token
  form.value.email = email

  console.log('Reset password form initialized:', {
    token: token ? 'Token received' : 'No token',
    tokenLength: token.length,
    email: email
  })

  // Remove token from URL for security
  if (token) {
    await router.replace({
      path: route.path,
      query: {
        ...route.query,
        token: undefined
      }
    })
  }
})

// Form validation
const validateForm = (): boolean => {
  errors.value = {}

  // Validate token exists
  if (!form.value.token) {
    message.value = {
      text: 'Token de reset inválido o expirado. Solicita un nuevo enlace de recuperación.',
      type: 'error'
    }
    return false
  }

  if (!form.value.email) {
    errors.value.email = 'El correo electrónico es requerido'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'El correo electrónico no es válido'
  }

  if (!form.value.password) {
    errors.value.password = 'La contraseña es requerida'
  } else if (form.value.password.length < 8) {
    errors.value.password = 'La contraseña debe tener al menos 8 caracteres'
  }

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Confirma tu contraseña'
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
  }

  return Object.keys(errors.value).length === 0
}

// Handle form submission
const handleResetPassword = async () => {
  if (!validateForm()) return

  loading.value = true
  message.value = { text: '', type: 'success' }

  try {
    // Prepare FormData as shown in Postman
    const formData = new FormData()
    formData.append('attributes[email]', form.value.email)
    formData.append('attributes[password]', form.value.password)
    formData.append('attributes[password_confirmation]', form.value.confirmPassword)
    formData.append('attributes[token]', form.value.token)

    // Call the reset-complete API
    const response = await $apiFetch('/iuser/v1/auth/reset-complete', {
      method: 'POST',
      body: formData
    }) as any

    message.value = {
      text: 'Contraseña restablecida exitosamente. Redirigiendo al login...',
      type: 'success'
    }

    // Redirect to login after success
    setTimeout(async () => {
      await router.push('/auth/login')
    }, 2000)

  } catch (error: any) {
    console.error('Reset password complete error:', error)

    let errorMessage = 'Error al restablecer la contraseña. Inténtalo de nuevo.'

    // Try to get specific error message from server
    if (error?.data?.message) {
      errorMessage = error.data.message
    } else if (error?.message) {
      errorMessage = error.message
    }

    message.value = {
      text: errorMessage,
      type: 'error'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <ClientOnly>
    <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-primary mb-2">Restablecer Contraseña</h1>
        <p class="text-gray-600 text-sm">Ingresa tu correo y nueva contraseña</p>
      </div>

      <!-- Form -->
      <form class="space-y-6" @submit.prevent="handleResetPassword">
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Correo Electrónico
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="errors.email ? 'border-red-500' : 'border-gray-300'"
            placeholder="tu@correo.com"
            required
          >
          <span v-if="errors.email" class="text-red-500 text-xs mt-1 block">
            {{ errors.email }}
          </span>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Nueva Contraseña
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="errors.password ? 'border-red-500' : 'border-gray-300'"
            placeholder="Mínimo 8 caracteres"
            required
          >
          <span v-if="errors.password" class="text-red-500 text-xs mt-1 block">
            {{ errors.password }}
          </span>
        </div>

        <!-- Confirm Password Field -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="errors.confirmPassword ? 'border-red-500' : 'border-gray-300'"
            placeholder="Repite la contraseña"
            required
          >
          <span v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1 block">
            {{ errors.confirmPassword }}
          </span>
        </div>

        <!-- Token Field (Hidden) -->
        <input v-model="form.token" type="hidden">

        <!-- Submit Button -->
        <UButton
          type="submit"
          block
          :loading="loading"
          :disabled="loading"
          color="primary"
          size="md"
        >
          {{ loading ? 'Restableciendo...' : 'Restablecer Contraseña' }}
        </UButton>

        <!-- Success/Error Messages -->
        <div
          v-if="message.text"
          class="p-3 rounded-md text-sm"
          :class="{
            'bg-green-100 text-green-700 border border-green-300': message.type === 'success',
            'bg-red-100 text-red-700 border border-red-300': message.type === 'error'
          }"
        >
          {{ message.text }}
        </div>
      </form>

      <!-- Back to Login Link -->
      <div class="text-center mt-6">
        <NuxtLink
          to="/auth/login"
          class="text-gray-600 hover:text-gray-900 text-sm transition-colors"
        >
          ← Volver al inicio de sesión
        </NuxtLink>
      </div>
    </div>
    </div>
  </ClientOnly>
</template>



