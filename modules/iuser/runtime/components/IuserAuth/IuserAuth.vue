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
const loginForm = ref<AuthLoginForm>({email: 'admin@imagina.co', password: '0C68jfLSAJwfWrt0'})
const registerForm = ref<AuthRegisterForm>({email: 'admin@imagina.com', password: '0C68jfLSAJwfWrt0'})
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
    label: authType.value === 'login' ? 'Register' : 'Login',
    color: 'neutral',
    onClick: () =>
    {
      authType.value = authType.value === 'login' ? 'register' : 'login'
    }
  },
  {
    label: authType.value === 'login' ? 'Login' : 'Register',
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
  iuserUserRepository.register(registerData).then(async (response) =>
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
    v-model="loginForm"
    ref="loginFormRef"
    title="Login"
    description=""
    :fields="LOGIN_FORM_FIELDS"
    submit-label="Login"
    :actions="formActions"
    :ui="{actions: 'flex justify-between'}"
    @submit="onLogin"
  />
  <IForm
    v-if="authType === 'register'"
    v-model="registerForm"
    ref="registerFormRef"
    :fields="registerFormFields"
    :actions="formActions"
    :ui="{actions: 'flex justify-between'}"
    title="Register"
    @submit="onRegister"
  />
</template>
