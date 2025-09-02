import '@testing-library/jest-dom'
import { deleteCRT, submitCRT } from '@/app/submit/actions'

describe('Submit Form', () => {
  it('handles valid submission', async () => {
    const formData = new FormData()
    formData.append("name", "Test")
    formData.append("model", "Test Model")
    formData.append("make", "Test Make")
    await submitCRT(formData)
  })
})