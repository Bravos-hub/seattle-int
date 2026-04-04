import { useState, type FormEvent } from 'react'

import type { FormIntegration } from '../types'

type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox'

interface FieldOption {
  label: string
  value: string
}

export interface FormField {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: FieldOption[]
}

interface ExternalFormProps {
  title: string
  description: string
  integration: FormIntegration
  submitLabel: string
  fields: FormField[]
  hiddenValues?: Record<string, string>
}

export function ExternalForm({
  title,
  description,
  integration,
  submitLabel,
  fields,
  hiddenValues,
}: ExternalFormProps) {
  const headingId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-heading`
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  )
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('_subject', integration.subject)
    formData.append('_template', 'table')
    formData.append('_captcha', 'false')

    if (hiddenValues) {
      Object.entries(hiddenValues).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }

    try {
      const response = await fetch(integration.endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      form.reset()
      setStatus('success')
      setMessage(integration.successMessage)
    } catch {
      setStatus('error')
      setMessage(
        'We could not complete the form submission right now. Please use the direct contact details on this page while the endpoint is being checked.',
      )
    }
  }

  return (
    <section className="form-card surface-card" aria-labelledby={headingId}>
      <div className="section-heading">
        <p className="eyebrow">Live connection</p>
        <h2 id={headingId}>{title}</h2>
        <p>{description}</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        {fields.map((field) => {
          if (field.type === 'textarea') {
            return (
              <label className="field field-full" key={field.name}>
                <span>{field.label}</span>
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={5}
                />
              </label>
            )
          }

          if (field.type === 'select') {
            return (
              <label className="field" key={field.name}>
                <span>{field.label}</span>
                <select name={field.name} required={field.required} defaultValue="">
                  <option disabled value="">
                    Select an option
                  </option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            )
          }

          if (field.type === 'checkbox') {
            return (
              <label className="field field-checkbox field-full" key={field.name}>
                <input name={field.name} type="checkbox" value="Yes" />
                <span>{field.label}</span>
              </label>
            )
          }

          return (
            <label className="field" key={field.name}>
              <span>{field.label}</span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
              />
            </label>
          )
        })}

        <div className="form-actions field-full">
          <button className="button button-primary" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : submitLabel}
          </button>
          <p className={`form-status ${status}`}>
            {status === 'idle'
              ? 'Hosted form endpoints can be updated later in the structured content file.'
              : message}
          </p>
        </div>
      </form>
    </section>
  )
}
