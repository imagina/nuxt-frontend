# IformForm Component
A wrapper around [IForm] that automatically fetches form definitions from the `iformFormsRepository`, renders fields, and handles submissions with reCAPTCHA v3 validation.  
Submissions are sent to the `iformLeadsRepository`.

---

## Props
- `systemName` (`string`): Identifier of the form to fetch from the API.
- `ui` : inherit form `Iform` component

---

## Examples
```vue
<IformForm system-name="contact_form" />
```
