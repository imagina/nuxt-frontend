<script lang="ts" setup>
import {iuserRoleRepository, iuserUserRepository} from '#iuser/utils/repository'
import {LOGIN_FORM_FIELDS, REGISTER_FORM_FIELDS} from './config'
import type {AUTH_TYPE, AuthLoginForm, AuthRegisterForm, IuserAuthEmits, IuserAuthProps} from './IuserAuth'
import type {ButtonProps} from "#ui/components/Button.vue";
import type {IForm} from "#components";
import {mapApiFields} from "#iform/components/IformForm/BuildFields";

const authStore = useIuserAuthStore()

const props = defineProps<IuserAuthProps>()
const emit = defineEmits<IuserAuthEmits>()
const authType = ref<AUTH_TYPE>(structuredClone(props.defaultType ?? 'login'))
const loginForm = ref<AuthLoginForm>({email: '', password: ''})
const registerForm = ref<AuthRegisterForm>({email: '', password: ''})
const loading = ref<boolean>(false)

const loginFormRef = ref<InstanceType<typeof IForm> | null>(null)
const registerFormRef = ref<InstanceType<typeof IForm> | null>(null)

//Get Rol [user]
const userRole = await iuserRoleRepository.show('user', {
  include: 'form.fields',
  filter: {field: 'system_name'}
})

const registerFormFields = computed(() =>
{
  const formRole = userRole.data.form?.find(i => i.systemName === 'form_user_register')
  const roleFields = mapApiFields(formRole?.fields ?? [])
  return [...REGISTER_FORM_FIELDS, ...roleFields]
})

const formActions = computed<ButtonProps[]>(() => ([
  {
    label: authType.value === 'login' ? 'Registrarme' : 'Iniciar Sesión',
    color: 'neutral',
    onClick: () =>
    {
      authType.value = authType.value === 'login' ? 'register' : 'login'
    }
  },
  {
    label: authType.value === 'login' ? 'Iniciar Sesión' : 'Registrarme',
    type: 'submit',
    color: 'primary',
    loading: loading.value
  }
]))

async function onLogin ()
{
  loading.value = true
  authStore.login(loginForm.value.email, loginForm.value.password).then(async () =>
  {
    emit('logged')
  }).catch(error =>
  {
    loginFormRef.value?.error(error.data.messages || 'Credenciales incorrectas.')
  }).finally(() =>
  {
    loading.value = false
  })
}

function onRegister ()
{
  loading.value = true
  const registerData = {...registerForm.value, roles: [userRole.data.id]}
  iuserUserRepository.register(registerData).then(async () =>
  {
    emit('registered')
    await authStore.login(registerForm.value.email, registerForm.value.password)
    emit('logged')
  }).catch(error =>
  {
    registerFormRef.value?.error(error.data.messages ?? 'Error al registrar el usuario.')
  }).finally(() =>
  {
    loading.value = false
  })
}
</script>

<template>
  <IForm
    v-if="authType === 'login'"
    ref="loginFormRef"
    v-model="loginForm"
    title="Iniciar Sesión"
    description=""
    :fields="LOGIN_FORM_FIELDS"
    submit-label="Iniciar Sesión"
    :actions="formActions"
    :ui="{actions: 'flex justify-between', title: 'auth-title text-primary text-center font-bold mb-2 text-lg uppercase my-2'}"
    @submit="onLogin"
  />
  <IForm
    v-if="authType === 'register'"
    ref="registerFormRef"
    v-model="registerForm"
    :fields="registerFormFields"
    :actions="formActions"
    :ui="{actions: 'flex justify-between',title: 'auth-title text-primary text-center font-bold mb-2 text-lg uppercase my-2'}"
    title="Register"
    @submit="onRegister"
  />
</template>
