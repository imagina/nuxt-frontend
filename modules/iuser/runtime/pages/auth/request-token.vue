<script lang="ts" setup>
// Nuxt app instance
const { $apiFetch } = useNuxtApp()

// Form data
const form = ref({
  email: ''
})

// Form validation errors
const errors = ref({
  email: ''
})

// Loading state
const loading = ref(false)

// Success/Error message
const message = ref({ text: '', type: '' })

// Form validation
const validateForm = (): boolean => {
  errors.value = { email: '' }

  if (!form.value.email) {
    errors.value.email = 'El correo electrónico es requerido'
    return false
  }

  if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'El correo electrónico no es válido'
    return false
  }

  return true
}

// Handle form submission
const onRequestToken = async () => {
  if (!validateForm()) return

  loading.value = true
  message.value = { text: '', type: '' }

  try {
    // Call the API to request password reset token
    const formData = new FormData()
    formData.append('attributes[email]', form.value.email)
    formData.append('attributes[completeResetUrl]', `${window.location.origin}/auth/reset-password`)

    const response = await $apiFetch('/iuser/v1/auth/reset', {
      method: 'POST',
      body: formData
    }) as any

    // Show success message
    message.value = {
      text: 'Te hemos enviado un enlace de recuperación a tu correo electrónico. Revisa tu bandeja de entrada.',
      type: 'success'
    }

    // Clear form
    form.value.email = ''

  } catch (error: any) {

    let errorMessage = 'Error al enviar el enlace de recuperación. Inténtalo de nuevo.'

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
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h1>
          <p class="text-gray-600 text-sm">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        <!-- Form -->
        <form class="space-y-6" @submit.prevent="onRequestToken">
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
              placeholder="Ingresa tu correo electrónico"
              required
            >
            <span v-if="errors.email" class="text-red-500 text-xs mt-1 block">
              {{ errors.email }}
            </span>
          </div>

          <!-- Submit Button -->
          <UButton
            type="submit"
            block
            :loading="loading"
            :disabled="loading"
            color="primary"
            size="md"
          >
            {{ loading ? 'Enviando...' : 'Enviar Enlace de Recuperación' }}
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
          <NuxtLink to="/auth/login" class="text-gray-600 hover:text-gray-900 text-sm transition-colors">
            ← Volver al inicio de sesión
          </NuxtLink>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

