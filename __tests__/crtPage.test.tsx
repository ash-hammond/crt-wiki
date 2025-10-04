import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import CRTPage from '@/app/crt/[id]/page'
import prisma from '@/client'

describe('CRTPage', () => {
    it('renders CRT page with id=1 and displays all CRT information with mock data', async () => {
        const tubeMake = 'Sony'
        const model = 'KV-32FV310'
        await prisma.cRT.create({
            data: {
                id: 1,
                tubeMake,
                model,
                series: 'test series',
                summary: 'A classic CRT',
            }
        })
        const { getByText } = await render(<CRTPage params={new Promise((resolve) => resolve({ id: '1' }))} />)
        expect(getByText(`${tubeMake} ${model}`)).toBeInTheDocument()
    })
})